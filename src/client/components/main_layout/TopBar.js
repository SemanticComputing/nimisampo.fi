import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FeedbackDialog from './FeedbackDialog';
import namesampoLogoEn from '../../img/logos/namesampo.png';
import namesampoLogoFi from '../../img/logos/nimisampo-logo.png';

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  namesampoLogo: {
    marginTop: 4,
    height: 30
  },
  sectionDesktop: {
    display: 'flex'
  },
  link: {
    textDecoration: 'none'
  },
  appBarButton: {
    color: 'white !important',
  },
});

class TopBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute">
          <Toolbar className={classes.toolBarLeft}>
            <Button
              className={classes.appBarButton}
              component={Link}
              to='/'
              onClick={() => this.props.clearResults()}
            >
              <img className={classes.namesampoLogo} src={this.props.language == 'fi' ? namesampoLogoFi : namesampoLogoEn} alt='NameSampo logo'/>
            </Button>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <a
                className={classes.link}
                href="https://seco.cs.aalto.fi/projects/nimisampo/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button className={classes.appBarButton}>Tietoja</Button>
              </a>
              <FeedbackDialog strings={this.props.strings} />
              {/* <Button className={classes.appBarButton}>Ohje</Button> */}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  clearResults: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
