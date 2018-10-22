
import _ from 'lodash';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  //updateSuggestions,
  updateResults,
  updateGeoJSON,
  //FETCH_SUGGESTIONS,
  //FETCH_SUGGESTIONS_FAILED,
  FETCH_RESULTS,
  //FETCH_RESULTS_FAILED,
  GET_GEOJSON,
  //GET_GEOJSON_FAILED
} from '../actions';

const apiUrl = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:3001/'
  : 'http://dev.nimisampo.fi/';

const pickSelectedDatasets = (datasets) => {
  let selected = [];
  Object.keys(datasets).map(key => {
    if (datasets[key].selected) {
      selected.push(key);
    }
  });
  return selected;
};

// const getSuggestionsEpic = (action$, store) => {
//   const searchUrl = apiUrl + 'suggest';
//   return action$.ofType(FETCH_SUGGESTIONS)
//     .debounceTime(1000)
//     .switchMap(() => {
//       const { query, datasets } = store.getState().search;
//       if (query.length < 3) {
//         return [];
//       }
//       const dsParams = _.map(pickSelectedDatasets(datasets), ds => `dataset=${ds}`).join('&');
//       const requestUrl = `${searchUrl}?q=${query}&${dsParams}`;
//       return ajax.getJSON(requestUrl)
//         .map(response => updateSuggestions({ suggestions: response }))
//         .catch(error => Observable.of({
//           type: FETCH_SUGGESTIONS_FAILED,
//           error: error,
//         }));
//     });
// };

const getResultsEpic = (action$, state$) => action$.pipe(
  ofType(FETCH_RESULTS),
  debounceTime(500),
  switchMap(() => {
    const searchUrl = apiUrl + 'search';
    const { query, datasets } = state$.getState().search;
    if (query.length < 3) {
      return [];
    }
    const dsParams = _.map(pickSelectedDatasets(datasets), ds => `dataset=${ds}`).join('&');
    const requestUrl = `${searchUrl}?q=${query}&${dsParams}`;
    return ajax.getJSON(requestUrl).pipe(
      map(response => updateResults({ results: response }))
      // .catch(error => Observable.of({
      //   type: FETCH_RESULTS_FAILED,
      //   error: error,
      // }));
    );
  })
);

const getGeoJSONEpic = (action$) => action$.pipe(
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


//
// const getGeoJSONEpic = (action$) => {
//   const wfsUrl = apiUrl + 'wfs';
//   return action$.ofType(GET_GEOJSON)
//     .switchMap(action => {
//       let s = '';
//       action.layerIDs.map(layerID => {
//         s += `&layerID=${layerID}`;
//       });
//       const requestUrl = `${wfsUrl}?${s}`;
//       return ajax.getJSON(requestUrl)
//         // .map(response => {
//         //   console.log(response)
//         // })
//         .map(response => updateGeoJSON({ geoJSON: response }))
//         .catch(error => Observable.of({
//           type: GET_GEOJSON_FAILED,
//           error: error,
//         }));
//     });
// };


const rootEpic = combineEpics(
  //getSuggestionsEpic,
  getResultsEpic,
  getGeoJSONEpic
);

export default rootEpic;
