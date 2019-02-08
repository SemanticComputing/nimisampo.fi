import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CropFreeIcon from '@material-ui/icons/CropFree';
import LeafletMap from './LeafletMap';

const styles = theme => ({
  dialogContainer: {
    height: '100%',
    width: '100%'
  },
  dialogPaper: {
    height: '100%',
    width: '100%'
  },
  mapSearch: {
    margin: theme.spacing.unit,
  },
  buttonLabel: {
    fontWeigth: 'normal',
    textTransform: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
});

class LeafletMapDialog extends React.Component {
  state = {
    open: false,
    zoomMessage: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSearchByArea = () => {
    if (this.props.map.zoomLevel > 9) {
      this.props.fetchResults('spatial');
      this.setState({ open: false });
    }
  }

  render() {
    const { classes, strings } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.mapSearch}
          classes={{ label: classes.buttonLabel }}
          onClick={this.handleClickOpen}
        >
          {strings.searchByArea}
          <CropFreeIcon className={classes.rightIcon} />
        </Button>

        <Dialog
          classes={{
            container: classes.dialogContainer,
            paper: classes.dialogPaper
          }}
          maxWidth={false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{strings.searchByArea}</DialogTitle>
          <LeafletMap
            mapMode="noCluster"
            strings={strings}
            geoJSON={this.props.map.geoJSON}
            geoJSONKey={this.props.map.geoJSONKey}
            getGeoJSON={this.props.getGeoJSON}
            reduceHeight={128}
            mapElementId={'dialogMap'}
            updateMapBounds={this.props.updateMapBounds}
          />
          <DialogActions>
            <Button onClick={this.handleSearchByArea} variant="contained" color="primary" autoFocus>
              Rajaa
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

LeafletMapDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  updateMapBounds: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
};

export default withStyles(styles)(LeafletMapDialog);
