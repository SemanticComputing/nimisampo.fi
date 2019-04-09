import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 9,
    paddingRight: theme.spacing.unit * 9,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit,
    },
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing.unit,
    },
  },
  frontPageHeading: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem'
    },
  },
  frontPageText: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1.0rem'
    },
  },

});

let Front = props => {
  const { classes, strings } = props;
  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography className={classes.frontPageHeading} component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          {strings.nameSampo}
        </Typography>
        <Typography className={classes.frontPageText} variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc1}
        </Typography>
        <Typography className={classes.frontPageText} variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc2}
        </Typography>
        <Typography className={classes.frontPageText} variant="h5" align="left" color="textPrimary" paragraph>
          {strings.nameSampoDesc3}
        </Typography>
        <Typography className={classes.frontPageText} variant="h5" align="left" color="textPrimary" paragraph>
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
