import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import FeedbackDialog from './FeedbackDialog';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import namesampoLogoEn from '../img/logos/namesampo.png';
import namesampoLogoFi from '../img/logos/nimisampo-logo.png';

const styles = theme => ({
  grow: {
    flexGrow: 1,
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  namesampoLogo: {
    marginTop: 4,
    height: 30
  },
  link: {
    textDecoration: 'none'
  },
  appBarButton: {
    color: 'white !important',
  },
});

const iframeWebropol = '<iframe frameborder="0" width="100%" height="100%" src="https://link.webropolsurveys.com/S/3BA01B62823131EF"></iframe>';

class TopBar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  render() {

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

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
              <FeedbackDialog
                strings={this.props.strings}
                iframe={iframeWebropol}
              />
              {/* <Button className={classes.appBarButton}>Ohje</Button> */}
            </div>
            { /* <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div> */ }
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
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
