import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import { Route, Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TopBar from '../components/main_layout/TopBar';
import Main from '../components/main_layout/Main';
import Footer from '../components/main_layout/Footer';
import FacetBar from '../components/facet_bar/FacetBar';
import Places from '../components/perspectives/Places';
import Message from '../components/main_layout/Message';
import bgImage from '../img/bg2.jpg';

import {
  filterResults
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
  updateFacet,
  sortResults,
  bounceMarker,
  openMarkerPopup,
  removeTempMarker,
  updateMapBounds,
  showError,
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
    flexWrap: 'nowrap',
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
    minWidth: 320,
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
  },
  frontContainerPaper: {
    height: '100%',
    //width: '100%',
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: theme.spacing.unit * 5,
    //paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
});

let SemanticPortal = props => {
  const { classes, search, results, resultValues, error } = props;
  const strings = props.options.strings[props.options.language];

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <Message error={error} />
        <TopBar
          clearResults={props.clearResults}
          strings={strings}
          language={props.options.language}
        />
        <Route
          exact path='/'
          render={() => <Redirect to='/app' />}
        />
        <Route
          path="/app"
          render={routeProps =>
            <Grid container spacing={8} className={classes.mainContainer}>
              <Grid item sm={4} md={3} className={classes.facetBarContainer}>
                <FacetBar
                  search={search}
                  resultValues={resultValues}
                  fetchResults={props.fetchResults}
                  updateFacet={props.updateFacet}
                  updateQuery={props.updateQuery}
                  clearResults={props.clearResults}
                  toggleDataset={props.toggleDataset}
                  strings={strings}
                  language={props.options.language}
                  map={props.map}
                  getGeoJSON={props.getGeoJSON}
                  updateMapBounds={props.updateMapBounds}
                  showError={props.showError}
                />
              </Grid>
              <Grid item sm={8} md={9} className={classes.resultsContainer}>
                {props.results.length == 0 && !props.search.fetchingResults &&
                  <Paper className={classes.frontContainerPaper}>
                    <Main strings={strings} />
                  </Paper>
                }
                {props.results.length > 0 &&
                <Paper className={classes.resultsContainerPaper}>
                  <Places
                    results={results}
                    resultValues={resultValues}
                    search={search}
                    map={props.map}
                    options={props.options}
                    sortResults={props.sortResults}
                    updateFacet={props.updateFacet}
                    updateQuery={props.updateQuery}
                    fetchResults={props.fetchResults}
                    clearResults={props.clearResults}
                    fetchSuggestions={props.fetchSuggestions}
                    clearSuggestions={props.clearSuggestions}
                    bounceMarker={props.bounceMarker}
                    openMarkerPopup={props.openMarkerPopup}
                    removeTempMarker={props.removeTempMarker}
                    getGeoJSON={props.getGeoJSON}
                    updateResultFormat={props.updateResultFormat}
                    updateMapMode={props.updateMapMode}
                    routeProps={routeProps}
                    strings={strings}
                  />
                </Paper>
                }
              </Grid>
            </Grid>
          }
        />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { results, resultValues } = filterResults(state.search);
  return {
    options: state.options,
    browser: state.browser,
    search: state.search,
    map: state.map,
    error: state.error,
    results: results,
    resultValues: resultValues,
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
  updateFacet,
  bounceMarker,
  openMarkerPopup,
  removeTempMarker,
  updateMapBounds,
  showError
});

SemanticPortal.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  //error: PropTypes.object.isRequired,
  browser: PropTypes.object.isRequired,

  options: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
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
  updateFacet: PropTypes.func.isRequired,
  updateMapBounds: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withWidth(),
  withStyles(styles, {withTheme: true}),
)(SemanticPortal);
