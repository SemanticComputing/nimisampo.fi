import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    // height: 'calc(100% - 3px)',
    // //height: '100%',
    // width: '100%',
    // backgroundColor: '#fff',
    // overFlowY: 'auto'
  },
  spinner: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 500
  },
});

class FeedbackDialog extends React.Component {
  state = {
    open: false,
    zoomMessage: '',
    loading: true
  };

  hideSpinner = () => {
    this.setState({
      loading: false
    });
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
            {this.state.loading ? (
              <div className={classes.spinner}>
                <CircularProgress thickness={5} />
              </div>
            ) : null }
            <iframe
              frameBorder="0"
              width="100%"
              height="100%"
              src="https://link.webropolsurveys.com/S/3BA01B62823131EF"
              onLoad={this.hideSpinner}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

FeedbackDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackDialog);
