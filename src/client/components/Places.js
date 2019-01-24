import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Route, Redirect } from 'react-router-dom';
import ViewTabs from './ViewTabs';
import LeafletMap from './map/LeafletMap';
// import GMap from '../components/map/GMap';
import VirtualizedTable from './VirtualizedTable';

let Places = props => {
  return (
    <React.Fragment>
      <ViewTabs routeProps={props.routeProps} />
      <Route
        exact path='/app'
        render={() => <Redirect to='/app/table' />}
      />
      <Route
        path={'/app/map'}
        render={() =>
          <LeafletMap
            results={props.results}
            mapMode={props.options.mapMode}
            geoJSON={props.map.geoJSON}
            geoJSONKey={props.map.geoJSONKey}
            getGeoJSON={props.getGeoJSON}
            bouncingMarker={props.map.bouncingMarker}
            popupMarker={props.map.popupMarker}
            bouncingMarkerKey={props.map.bouncingMarkerKey}
            openPopupMarkerKey={props.map.openPopupMarkerKey}

          />
        }
      />
      <Route
        path={'/app/table'}
        render={() =>
          <VirtualizedTable
            list={Immutable.List(props.results)}
            resultValues={props.resultValues}
            search={props.search}
            sortResults={props.sortResults}
            updateResultsFilter={props.updateResultsFilter}
            updateQuery={props.updateQuery}
            fetchResults={props.fetchResults}
            clearResults={props.clearResults}
            fetchSuggestions={props.fetchSuggestions}
            clearSuggestions={props.clearSuggestions}
            bounceMarker={props.bounceMarker}
            openMarkerPopup={props.openMarkerPopup}
            removeTempMarker={props.removeTempMarker}
          />
        }
      />
    </React.Fragment>
  );
};

Places.propTypes = {
  options: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  results: PropTypes.array,
  resultValues: PropTypes.object,

  updateQuery: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  sortResults: PropTypes.func.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  bounceMarker: PropTypes.func.isRequired,
  openMarkerPopup: PropTypes.func.isRequired,
  removeTempMarker: PropTypes.func.isRequired,
  updateResultFormat: PropTypes.func.isRequired,
  updateMapMode: PropTypes.func.isRequired,
  updateResultsFilter: PropTypes.func.isRequired,

  routeProps: PropTypes.object.isRequired
};

export default Places;
