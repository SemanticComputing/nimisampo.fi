import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import aaltoLogo from '../img/logos/aalto-logo-white-no-background-small.png';
import uhLogo from '../img/logos/university-of-helsinki-logo-white-no-background-small.png';
import heldigLogo from '../img/logos/heldig-logo-small.png';
import kotusLogo from '../img/logos/kotus-logo-white-no-backgrounds-small.png';
import secoLogo from '../img/logos/seco-logo-white-no-background-small.png';


const styles = theme => ({
  root: {
    position: 'absolute',
    //borderTop: '4px solid' + theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    width: '100%',
    height: 64,
    background: theme.palette.primary.main,
    borderRadius: 0,
  },
  aaltoLogo: {
    //paddingLeft: 24,
    height: 37
  },
  uhLogo: {
    paddingLeft: 44,
    height: 52
  },
  secoLogo: {
    paddingLeft: 44,
    height: 52
  },
  heldigLogo: {
    paddingLeft: 44,
    height: 37
  },
  kotusLogo: {
    paddingLeft: 44,
    height: 50
  },
});

const Footer = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <img className={classes.aaltoLogo} src={aaltoLogo} alt='Aalto University logo'/>
      <img className={classes.uhLogo} src={uhLogo} alt='University of Helsinki logo'/>
      <img className={classes.heldigLogo} src={heldigLogo} alt='HELDIG logo'/>
      <img className={classes.secoLogo} src={secoLogo} alt='SeCo logo'/> 
      <img className={classes.kotusLogo} src={kotusLogo} alt='Kotus logo'/>
    </Paper>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
