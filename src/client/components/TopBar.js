import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import namesampoLogoEn from '../img/logos/namesampo.png';
import namesampoLogoFi from '../img/logos/nimisampo-logo.png';

const styles = theme => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuContent: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 350,
    outline: 0,
    padding: theme.spacing.unit * 3
  },
  formControl: {
    marginBottom: theme.spacing.unit * 3,
  },
  formGroup: {
    margin: `${theme.spacing.unit}px 0`,
  },
  csvButton: {
    margin: theme.spacing.unit * 3,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  menuList: {
    width: 350
  },
  namesampoLogo: {
    marginTop: 4,
    height: 30
  },
  navTabs: {
    marginLeft: 'auto'
  },
});

class TopBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute">
        <Toolbar className={classes.toolBar}>
          <Button
            className={classes.appBarButton}
            component={Link}
            to='/'
            onClick={() => this.props.clearResults()}
          >
            <img className={classes.namesampoLogo} src={this.props.language == 'fi' ? namesampoLogoFi : namesampoLogoEn} alt='NameSampo logo'/>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  clearResults: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default withStyles(styles)(TopBar);
