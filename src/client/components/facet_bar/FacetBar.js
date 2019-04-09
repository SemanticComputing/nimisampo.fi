import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HierarchicalFacet from './HierarchicalFacet';
import Paper from '@material-ui/core/Paper';
import FacetHeader from './FacetHeader';
import SearchField from './SearchField';
import LeafletMapDialog from './LeafletMapDialog';
import Typography from '@material-ui/core/Typography';
import DatasetSelector from './DatasetSelector';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  facetContainer: {
    marginBottom: theme.spacing.unit,
  },
  facetContainerLast: {
    marginBottom: 4,
  },
  facetSearchFieldContainer: {
    // height: 345,
    padding: theme.spacing.unit,
  },
  facetValuesContainerTen: {
    height: 300,
    padding: theme.spacing.unit,
  },
  facetValuesContainerThree: {
    height: 108,
    padding: theme.spacing.unit,
  },
  facetHeaderButtons: {
    marginLeft: 'auto'
  },
  resultTextContainer: {
    marginTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    height: 32
  }

});

let FacetBar = props => {
  const { classes, strings } = props;
  const { results } = props.search;
  const hasResults = results !== null;
  const resultCount = hasResults ? results.length : '';
  let resultString = '';
  if (hasResults) {
    resultString = resultCount == 1 ? strings.result : strings.results;
  }
  const showFacets = hasResults && resultCount > 5;
  return (
    <div className={classes.root}>
      <Paper className={classes.facetContainer}>
        <FacetHeader
          label={strings.selectDataSources}
          hierarchical={true}
        />
        <div className={classes.facetSearchFieldContainer}>
          <DatasetSelector
            search={props.search}
            toggleDataset={props.toggleDataset}
            strings={strings}
            language={props.language}
          />
        </div>
      </Paper>
      <Paper className={classes.facetContainer}>
        <div className={classes.facetSearchFieldContainer}>
          <SearchField
            search={props.search}
            fetchResults={props.fetchResults}
            clearResults={props.clearResults}
            updateQuery={props.updateQuery}
            datasets={props.search.datasets}
            strings={strings}
          />
          {/*<LeafletMapDialog
            map={props.map}
            fetchResults={props.fetchResults}
            clearResults={props.clearResults}
            updateQuery={props.updateQuery}
            updateMapBounds={props.updateMapBounds}
            getGeoJSON={props.getGeoJSON}
            strings={strings}
         /> */}
        </div>
      </Paper>
      <Paper className={classes.facetContainer}>
        <div className={classes.facetSearchFieldContainer}>
          <LeafletMapDialog
            map={props.map}
            fetchResults={props.fetchResults}
            clearResults={props.clearResults}
            updateQuery={props.updateQuery}
            updateMapBounds={props.updateMapBounds}
            getGeoJSON={props.getGeoJSON}
            showError={props.showError}
            strings={strings}
            fetching={props.search.spatialResultsFetching}
          />
        </div>
      </Paper>
      { hasResults &&
        <Paper className={classes.facetContainer}>
          <div className={classes.facetSearchFieldContainer}>
            <div className={classes.resultTextContainer}>
              <Typography variant="h6">{resultCount} {resultString}{/*{strings.filterResults}*/}</Typography>
            </div>
          </div>
        </Paper>
      }
      { showFacets &&
        <React.Fragment>
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label={strings.name}
              hierarchical={true}
            />
            <div className={classes.facetValuesContainerTen}>
              <HierarchicalFacet
                data={Object.values(props.resultValues.prefLabel)}
                property='prefLabel'
                searchField={true}
                updateFilter={props.updateResultsFilter}
                strings={strings}
              />
            </div>
          </Paper>

          <Paper className={classes.facetContainer}>
            <FacetHeader
              label={strings.type}
              hierarchical={true}
            />
            <div className={classes.facetValuesContainerTen}>
              <HierarchicalFacet
                data={Object.values(props.resultValues.broaderTypeLabel)}
                property='broaderTypeLabel'
                searchField={true}
                updateFilter={props.updateResultsFilter}
                strings={strings}
              />
            </div>
          </Paper>
          <Paper className={classes.facetContainerLast}>
            <FacetHeader
              label={strings.area}
              hierarchical={true}
            />
            <div className={classes.facetValuesContainerTen}>
              <HierarchicalFacet
                data={Object.values(props.resultValues.broaderAreaLabel)}
                property='broaderAreaLabel'
                searchField={true}
                updateFilter={props.updateResultsFilter}
                strings={strings}
              />
            </div>
          </Paper>
          { /*
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label='Type (NA)'
              hierarchical={true}
            />
          </Paper>
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label='Area'
              hierarchical={true}
            />
          </Paper>
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label='Year'
              hierarchical={true}
            />
          </Paper>
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label='Modifier'
              hierarchical={true}
            />
          </Paper>
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label='Base'
              hierarchical={true}
            />
          </Paper> */}
        </React.Fragment>
      }
    </div>
  );
};

FacetBar.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  resultValues: PropTypes.object.isRequired,
  fetchResults: PropTypes.func.isRequired,
  updateResultsFilter: PropTypes.func.isRequired,
  toggleDataset: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  strings: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  map: PropTypes.object.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  updateMapBounds: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired
};

export default withStyles(styles)(FacetBar);
