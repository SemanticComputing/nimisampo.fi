import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 9,
    paddingRight: theme.spacing.unit * 9,
    //backgroundColor: 'white'
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing.unit * 3
  }
});

let Front = props => {
  const { classes, strings } = props;
  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          {strings.nameSampo}
        </Typography>
        <Typography variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc1}
        </Typography>
        <Typography variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc2}
        </Typography>
        <Typography variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc3}
        </Typography>
        <Typography variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc4}
        </Typography>
      </div>
    </div>
  );
};

Front.propTypes = {
  classes: PropTypes.object,
  strings: PropTypes.object.isRequired
};

export default withStyles(styles)(Front);
