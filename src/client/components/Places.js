import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Route, Redirect } from 'react-router-dom';
import ViewTabs from './ViewTabs';
import LeafletMap from './LeafletMap';
import GMap from '../components/GMap';
import VirtualizedTable from './VirtualizedTable';
import Pie from './Pie.js';
import CSVButton from './CSVButton';
import ResultInfo from './ResultInfo';

let Places = props => {
  //console.log(props.results)
  return (
    <React.Fragment>
      <ViewTabs routeProps={props.routeProps} strings={props.strings} />
      <Route
        exact path='/app'
        render={() => <Redirect to='/app/table' />}
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
            bounceMarker={props.bounceMarker}
            openMarkerPopup={props.openMarkerPopup}
            removeTempMarker={props.removeTempMarker}
            strings={props.strings}
          />
        }
      />
      <Route
        path={'/app/map_clusters'}
        render={() =>
          <LeafletMap
            results={props.results}
            mapMode="cluster"
            geoJSON={props.map.geoJSON}
            geoJSONKey={props.map.geoJSONKey}
            getGeoJSON={props.getGeoJSON}
            bouncingMarker={props.map.bouncingMarker}
            popupMarker={props.map.popupMarker}
            bouncingMarkerKey={props.map.bouncingMarkerKey}
            openPopupMarkerKey={props.map.openPopupMarkerKey}
            strings={props.strings}
          />
        }
      />
      <Route
        path={'/app/map_markers'}
        render={() => {
          if (props.results.length > 5000) {
            return <ResultInfo message={props.strings.tooManyResults} />;
          } else {
            return(
              <LeafletMap
                results={props.results}
                mapMode="noCluster"
                geoJSON={props.map.geoJSON}
                geoJSONKey={props.map.geoJSONKey}
                getGeoJSON={props.getGeoJSON}
                bouncingMarker={props.map.bouncingMarker}
                popupMarker={props.map.popupMarker}
                bouncingMarkerKey={props.map.bouncingMarkerKey}
                openPopupMarkerKey={props.map.openPopupMarkerKey}
                strings={props.strings}
              />
            );
          }
        }}
      />
      <Route
        path={'/app/heatmap'}
        render={() =>
          <GMap
            results={props.results}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKWw5FjhwLsfp_l2gjVAifPkT3cxGXhA4&v=3.exp&libraries=geometry,drawing,places,visualization"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `calc(100% - 72px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            strings={props.strings}
          />
        }
      />
      <Route
        path={'/app/statistics'}
        render={() =>
          <Pie
            data={props.results}
            groupBy={props.search.groupBy}
            groupByLabel={props.search.groupByLabel}
            query={props.search.query}
            strings={props.strings}
          />
        }
      />
      <Route
        path={'/app/download'}
        render={() =>
          <CSVButton results={props.results} strings={props.strings} />
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
  routeProps: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired
};

export default Places;
