import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HierarchicalFacet from './HierarchicalFacet';
import Paper from '@material-ui/core/Paper';
import FacetHeader from './FacetHeader';
import SearchField from './SearchField';
import Typography from '@material-ui/core/Typography';


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
    marginBottom: 2,
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
    paddingLeft: theme.spacing.unit,
    height: 32
  }

});

let FacetBar = props => {

  const { classes } = props;
  const hasResults = props.search.results.length > 0 ? true : false;

  return (
    <div className={classes.root}>

      <Paper className={classes.facetContainer}>
        <div className={classes.facetSearchFieldContainer}>
          <SearchField
            search={props.search}
            fetchResults={props.fetchResults}
            updateQuery={props.updateQuery}
            clearResults={props.clearResults}
          />
          <div className={classes.resultTextContainer}>
            <Typography variant="h6">{hasResults ? `${props.search.results.length} results` : ''}</Typography>
          </div>
        </div>
      </Paper>

      { hasResults &&
        <React.Fragment>
          <Paper className={classes.facetContainer}>
            <FacetHeader
              label='Name'
              hierarchical={true}
            />
            <div className={classes.facetValuesContainerTen}>
              <HierarchicalFacet
                data={Object.values(props.resultValues.prefLabel)}
                property='prefLabel'
                searchField={true}
                updateFilter={props.updateResultsFilter}
              />
            </div>
          </Paper>

          <Paper className={classes.facetContainerLast}>
            <FacetHeader
              label='Type (PNR)'
              hierarchical={true}
            />
            <div className={classes.facetValuesContainerTen}>
              <HierarchicalFacet
                data={Object.values(props.resultValues.broaderTypeLabel)}
                property='broaderTypeLabel'
                searchField={true}
                updateFilter={props.updateResultsFilter}
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
  updateQuery: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired
};

export default withStyles(styles)(FacetBar);
