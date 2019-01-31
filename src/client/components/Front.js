import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 7,
    paddingLeft: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 10,
  }
});

let Front = props => {
  const { classes, strings } = props;
  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
        {strings.nameSampo}
      </Typography>
      <Typography variant="h6" align="left" color="textSecondary" paragraph>
        {strings.nameSampoDesc1}
      </Typography>
      <Typography variant="h6" align="left" color="textSecondary" paragraph>
        {strings.nameSampoDesc2}
      </Typography>
    </div>
  );
};

Front.propTypes = {
  classes: PropTypes.object,
  strings: PropTypes.object.isRequired
};

export default withStyles(styles)(Front);
