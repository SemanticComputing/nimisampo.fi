import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import aaltoLogo from '../img/logos/aalto-logo-white-no-background-small.png';
import uhLogo from '../img/logos/university-of-helsinki-logo-white-no-background-small.png';
import heldigLogo from '../img/logos/heldig-logo-small.png';
import kotusLogo from '../img/logos/kotus-logo-white-no-backgrounds-small.png';
import secoLogo from '../img/logos/seco-logo-white-no-background-small.png';

const aaltoLogoHeight = 37;
const uhLogoHeight = 44;
const secoLogoHeight = 48;
const heldigLogoHeight = 44;
const kotusLogoHeight = 44;

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
    boxShadow: '0 -12px 12px -12px #333'
  },
  aaltoLogo: {
    //paddingLeft: 24,
    height: aaltoLogoHeight,
    [theme.breakpoints.down('md')]: {
      height: aaltoLogoHeight - 15
    },
  },
  uhLogo: {
    paddingLeft: uhLogoHeight,
    height: 52,
    [theme.breakpoints.down('md')]: {
      height: uhLogoHeight - 15
    },
  },
  secoLogo: {
    paddingLeft: 44,
    height: secoLogoHeight,
    [theme.breakpoints.down('md')]: {
      height: secoLogoHeight - 15
    },
  },
  heldigLogo: {
    paddingLeft: 44,
    height: heldigLogoHeight,
    [theme.breakpoints.down('md')]: {
      height: heldigLogoHeight - 15
    },
  },
  kotusLogo: {
    paddingLeft: 44,
    height: kotusLogoHeight,
    [theme.breakpoints.down('md')]: {
      height: kotusLogoHeight - 15
    },
  },
  link: {
    textDecoration: 'none'
  },
});

const Footer = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>

      <a
        className={classes.link}
        href="https://www.aalto.fi/"
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className={classes.aaltoLogo} src={aaltoLogo} alt='Aalto University logo'/>
      </a>

      <a
        className={classes.link}
        href="https://www.helsinki.fi/"
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className={classes.uhLogo} src={uhLogo} alt='University of Helsinki logo'/>
      </a>

      <a
        className={classes.link}
        href="http://www.heldig.fi/"
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className={classes.heldigLogo} src={heldigLogo} alt='HELDIG logo'/>
      </a>

      <a
        className={classes.link}
        href="https://seco.cs.aalto.fi/"
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className={classes.secoLogo} src={secoLogo} alt='SeCo logo'/>
      </a>

      <a
        className={classes.link}
        href="https://www.kotus.fi/"
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className={classes.kotusLogo} src={kotusLogo} alt='Kotus logo'/>
      </a>

    </Paper>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
