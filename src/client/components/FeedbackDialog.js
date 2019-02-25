import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styles = () => ({
  dialogContainer: {
    height: '100%',
    width: '100%',
  },
  dialogPaper: {
    height: '100%',
    width: '100%',
    maxWidth: 750,
    maxHeight: 651,
    padding: '0px !important'
  },
  dialogContent: {
    padding: '0px !important'
  },
  appBarButton: {
    color: 'white !important',
  },
  iframe: {
    height: 'calc(100% - 3px)',
    //height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    overFlowY: 'auto'
  }
});

class LeafletMapDialog extends React.Component {
  state = {
    open: false,
    zoomMessage: ''
  };

  iframe = () => {
    return {
      __html: this.props.iframe
    };
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, strings } = this.props;

    return (
      <div>
        <Button
          className={classes.appBarButton}
          classes={{ label: classes.buttonLabel }}
          onClick={this.handleClickOpen}
        >
          {strings.feedback}
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
          <DialogContent className={classes.dialogContent} >
            <div
              className={classes.iframe}
              dangerouslySetInnerHTML={ this.iframe() }
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

LeafletMapDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
  iframe: PropTypes.string.isRequired
};

export default withStyles(styles)(LeafletMapDialog);
