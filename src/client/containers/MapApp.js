import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import Paper from '@material-ui/core/Paper';
import Immutable from 'immutable';
import VirtualizedTable from '../components/VirtualizedTable';
import LeafletMap from '../components/map/LeafletMap';
import GMap from '../components/map/GMap';
import Grid from '@material-ui/core/Grid';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import FacetBar from '../components/FacetBar';
import ViewTabs from '../components/ViewTabs';

import {
  getVisibleResults,
  getVisibleValues
} from '../selectors';

import {
  updateQuery,
  toggleDataset,
  fetchSuggestions,
  clearSuggestions,
  fetchResults,
  clearResults,
  getGeoJSON,
  updateResultFormat,
  updateMapMode,
  updateResultsFilter,
  sortResults,
  bounceMarker,
  openMarkerPopup,
  removeTempMarker
} from '../actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  flex: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    minWidth: 300,
    //minHeight: 700
  },
  mainContainer: {
    marginTop: 64,
    height: 'calc(100% - 122px)',
    [theme.breakpoints.down(600)]: {
      marginTop: 56,
      height: 'calc(100% - 122px)',
    },
    backgroundColor: '#bdbdbd',
    padding: theme.spacing.unit,
  },
  facetBarContainer: {
    height: '100%',
    overflow: 'auto',
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },
  resultsContainer: {
    height: '100%',
    //overflow: 'auto',
    paddingTop: '0px !important',
    //paddingBottom: '0px !important'
  },
  resultsContainerPaper: {
    height: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }
});

let MapApp = (props) => {
  const { classes, options, browser, search, map, results, resultValues } = props;
  //error,

  // let mapElement = '';
  // if (options.mapMode === 'heatmap') {
  //   mapElement = (
  //     <GMap
  //       results={props.results}
  //       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKWw5FjhwLsfp_l2gjVAifPkT3cxGXhA4&v=3.exp&libraries=geometry,drawing,places,visualization"
  //       loadingElement={<div style={{ height: `100%` }} />}
  //       containerElement={<div style={{ height: `100%` }} />}
  //       mapElement={<div style={{ height: `100%` }} />}
  //     />
  //   );
  // } else {
  //   mapElement = (
  //     <LeafletMap
  //       results={props.results}
  //       mapMode={options.mapMode}
  //       geoJSON={map.geoJSON}
  //       geoJSONKey={map.geoJSONKey}
  //       getGeoJSON={props.getGeoJSON}
  //       bouncingMarker={map.bouncingMarker}
  //       popupMarker={map.popupMarker}
  //       bouncingMarkerKey={map.bouncingMarkerKey}
  //       openPopupMarkerKey={map.openPopupMarkerKey}
  //     />
  //   );
  // }

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <TopBar
          results={results}
          oneColumnView={false}
          mapMode={options.mapMode}
          resultFormat={options.resultFormat}
          updateMapMode={props.updateMapMode}
          updateResultFormat={props.updateResultFormat}
          datasets={search.datasets}
          toggleDataset={props.toggleDataset}
        />
        <Grid container spacing={8} className={classes.mainContainer}>
          <Grid item sm={12} md={3} className={classes.facetBarContainer}>
            <FacetBar
              search={search}
              fetchResults={props.fetchResults}
              updateQuery={props.updateQuery}
              clearResults={props.clearResults}
            />
          </Grid>
          <Grid item sm={12} md={9} className={classes.resultsContainer}>
            <Paper className={classes.resultsContainerPaper}>
              {/* <ViewTabs routeProps={props.routeProps} /> */}
              <VirtualizedTable
                list={Immutable.List(results)}
                resultValues={resultValues}
                search={search}
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
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
    browser: state.browser,
    search: state.search,
    map: state.map,
    results: getVisibleResults(state.search),
    resultValues: getVisibleValues(state.search),
  };
};

const mapDispatchToProps = ({
  updateQuery,
  toggleDataset,
  fetchSuggestions,
  clearSuggestions,
  fetchResults,
  clearResults,
  sortResults,
  getGeoJSON,
  updateResultFormat,
  updateMapMode,
  updateResultsFilter,
  bounceMarker,
  openMarkerPopup,
  removeTempMarker
});

MapApp.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  //error: PropTypes.object.isRequired,
  browser: PropTypes.object.isRequired,

  options: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  results: PropTypes.array,
  resultValues: PropTypes.object,

  updateQuery: PropTypes.func.isRequired,
  toggleDataset: PropTypes.func.isRequired,
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
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withWidth(),
  withStyles(styles, {withTheme: true}),
)(MapApp);
