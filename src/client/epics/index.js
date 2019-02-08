import { map as lodashMap } from 'lodash';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, debounceTime, withLatestFrom } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  updateResults,
  updateGeoJSON,
  FETCH_RESULTS,
  //FETCH_RESULTS_FAILED,
  GET_GEOJSON,
  //GET_GEOJSON_FAILED
} from '../actions';

const apiUrl = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:3001/'
  : `http://${location.hostname}/`;

const pickSelectedDatasets = (datasets) => {
  let selected = [];
  Object.keys(datasets).map(key => {
    if (datasets[key].selected) {
      selected.push(key);
    }
  });
  return selected;
};

const getResultsEpic = (action$, state$) => action$.pipe(
  ofType(FETCH_RESULTS),
  withLatestFrom(state$),
  debounceTime(500),
  switchMap(([action, state]) => {
    const searchUrl = apiUrl + 'search';
    const { datasets } = state.search;
    const dsParams = lodashMap(pickSelectedDatasets(datasets), ds => `dataset=${ds}`).join('&');
    let requestUrl = '';
    if (action.jenaIndex === 'text') {
      const { query } = state.search;
      requestUrl = `${searchUrl}?q=${query}&${dsParams}`;
    } else if (action.jenaIndex === 'spatial') {
      const { latMin, longMin, latMax, longMax } = state.map;
      requestUrl = `${searchUrl}?latMin=${latMin}&longMin=${longMin}&latMax=${latMax}&longMax=${longMax}&${dsParams}`;
      return [];
    }
    return ajax.getJSON(requestUrl).pipe(
      map(response => updateResults({ results: response }))
      // .catch(error => Observable.of({
      //   type: FETCH_RESULTS_FAILED,
      //   error: error,
      // }));
    );
  })
);

const getGeoJSONEpic = action$ => action$.pipe(
  ofType(GET_GEOJSON),
  switchMap(action => {
    const wfsUrl = apiUrl + 'wfs';
    let s = '';
    action.layerIDs.map(layerID => {
      s += `&layerID=${layerID}`;
    });
    const requestUrl = `${wfsUrl}?${s}`;
    return ajax.getJSON(requestUrl).pipe(
      map(response =>  updateGeoJSON({ geoJSON: response }))
      // .catch(error => Observable.of({
      //   type: FETCH_RESULTS_FAILED,
      //   error: error,
      // }));
    );
  })
);

const rootEpic = combineEpics(
  getResultsEpic,
  getGeoJSONEpic
);

export default rootEpic;
