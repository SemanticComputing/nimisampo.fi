import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavTabs from '../components/NavTabs';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
//
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import { CSVLink } from 'react-csv';
// import Button from '@material-ui/core/Button';
// import FormGroup from '@material-ui/core/FormGroup';
// import Checkbox from '@material-ui/core/Checkbox';
import namesampoLogoEn from '../img/logos/namesampo.png';
//import namesampoLogoFi from '../img/logos/nimisampo-logo.png';

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
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleChange = event => {
    this.props.updateMapMode(event.target.value);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleToggleDataset = value => () => {
    this.props.toggleDataset(value);
  };

  // <IconButton
  //   className={classes.menuButton}
  //   color="inherit"
  //   aria-label="Menu"
  //   onClick={this.handleClick}
  // >
  //   <MenuIcon />
  // </IconButton>
  //
  // <Menu
  //   id="simple-menu"
  //   anchorEl={anchorEl}
  //   open={Boolean(anchorEl)}
  //   onClose={this.handleClose}
  // >
  //   <div className={classes.menuContent}>
  //     <FormControl component="fieldset" className={classes.formControl}>
  //       <FormLabel component="legend">Source datasets</FormLabel>
  //       <FormGroup className={classes.formGroup}>
  //         {Object.keys(this.props.datasets).map(id => (
  //           <FormControlLabel
  //             key={id}
  //             control={
  //               <Checkbox
  //                 checked={this.props.datasets[id].selected}
  //                 onChange={this.handleToggleDataset(id)}
  //                 tabIndex={-1}
  //                 disableRipple
  //               />
  //             }
  //             label={this.props.datasets[id].title}
  //           />
  //
  //         ))}
  //       </FormGroup>
  //     </FormControl>
  //
  //     <FormControl component="fieldset" className={classes.formControl}>
  //       <FormLabel component="legend">Map mode</FormLabel>
  //       <RadioGroup
  //         className={classes.formGroup}
  //         aria-label="Map mode"
  //         name="map"
  //         value={this.props.mapMode}
  //         onChange={this.handleChange}
  //       >
  //         <FormControlLabel value="cluster" control={<Radio />} label="Clustered markers" />
  //         <FormControlLabel value="noCluster" control={<Radio />} label="Markers" />
  //         <FormControlLabel value="heatmap" control={<Radio />} label="Heatmap" />
  //       </RadioGroup>
  //     </FormControl>
  //
  //
  //     <CSVLink data={this.props.results}>
  //       <Button variant="contained" color="primary" className={classes.button}>
  //         Results as CSV
  //         <CloudDownloadIcon className={classes.rightIcon} />
  //       </Button>
  //     </CSVLink>
  //   </div>
  //
  // </Menu>

  render() {
    //const { anchorEl } = this.state;
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
            <img className={classes.namesampoLogo} src={namesampoLogoEn} alt='NameSampo logo'/>
          </Button>

          {this.props.oneColumnView &&
            <div className={classes.navTabs}>
              <NavTabs
                resultFormat={this.props.resultFormat}
                updateResultFormat={this.props.updateResultFormat}
              />
            </div>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  oneColumnView: PropTypes.bool.isRequired,
  mapMode: PropTypes.string.isRequired,
  resultFormat: PropTypes.string.isRequired,
  updateResultFormat: PropTypes.func.isRequired,
  updateMapMode: PropTypes.func.isRequired,
  datasets: PropTypes.object.isRequired,
  toggleDataset: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
