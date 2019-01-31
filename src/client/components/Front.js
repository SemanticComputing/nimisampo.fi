import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
  }
});

let Front = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          NameSampo
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        A web application for searching, analyzing, and visualizing geospatial data.
      </Typography>
    </div>
  );
};

Front.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Front);
