import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import HierarchicalFacet from './HierarchicalFacet';
import Paper from '@material-ui/core/Paper';
import FacetHeader from './FacetHeader';
import SearchField from './SearchField';


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
    height: 345,
    padding: theme.spacing.unit,
  },
  facetValuesContainerThree: {
    height: 108,
    padding: theme.spacing.unit,
  },
  facetHeaderButtons: {
    marginLeft: 'auto'
  }
});

let FacetBar = props => {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <React.Fragment>

        <Paper className={classes.facetContainer}>
          <FacetHeader
            label='Place name'
            hierarchical={true}
          />
          <div className={classes.facetSearchFieldContainer}>
            <SearchField
              search={props.search}
              fetchResults={props.fetchResults}
              updateQuery={props.updateQuery}
              clearResults={props.clearResults}
            />
          </div>
        </Paper>
      </React.Fragment>
    </div>
  );
};

FacetBar.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  fetchResults: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired
};

export default withStyles(styles)(FacetBar);
