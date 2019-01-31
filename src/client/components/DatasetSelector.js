import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit * 2
  },

  textField: {
    flexBasis: 200,
  },
});

class DatasetSelector extends React.Component {

  handleToggleDataset = value => () => {
    this.props.toggleDataset(value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup className={classes.formGroup}>
            {Object.keys(this.props.search.datasets).map(id => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={this.props.search.datasets[id].selected}
                    onChange={this.handleToggleDataset(id)}
                    tabIndex={-1}
                    disableRipple
                  />
                }
                label={this.props.language == 'fi' ? this.props.search.datasets[id].titleFi : this.props.search.datasets[id].titleEn }
              />

            ))}
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

DatasetSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  toggleDataset: PropTypes.func.isRequired,
  strings: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default withStyles(styles)(DatasetSelector);
