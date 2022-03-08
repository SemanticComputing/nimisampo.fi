import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import intl from 'react-intl-universal'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
// import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import InfoIcon from '@mui/icons-material/Info'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(2)
  },
  formControl: {
    width: '100%'
  },
  formControlLabelRoot: {
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(1)
    }
  },
  formControlLabelLabel: {
    width: '100%'
  },
  checkboxLabel: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.875rem'
  },
  link: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    color: theme.palette.primary.main,
    '&:visited': {
      color: theme.palette.primary.main
    }
  }
})

/**
 * A component for selecting the source datasets for ClientFS.
 */
class DatasetSelector extends React.Component {
  handleToggleDataset = value => () => {
    this.props.clientFSToggleDataset(value)
  };

  generateLabel = id => {
    const { perspectiveID } = this.props
    return (
      <div className={this.props.classes.checkboxLabel}>
        <span>{intl.get(`perspectives.${perspectiveID}.datasets.${id}.label`)}</span>
        <a
          className={this.props.classes.link}
          href={intl.get(`perspectives.${perspectiveID}.datasets.${id}.aboutLink`)}
          target='_blank'
          rel='noopener noreferrer'
        >
          <InfoIcon />
        </a>
      </div>
    )
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormGroup className={classes.formGroup}>
            {Object.keys(this.props.datasets).map(id => (
              <FormControlLabel
                classes={{
                  root: classes.formControlLabelRoot,
                  label: classes.formControlLabelLabel
                }}
                key={id}
                control={
                  <Checkbox
                    checked={this.props.datasets[id].selected}
                    onChange={this.handleToggleDataset(id)}
                    tabIndex={-1}
                    disableRipple
                  />
                }
                label={this.generateLabel(id)}
              />

            ))}
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

DatasetSelector.propTypes = {
  /**
   * Material-UI styles.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Available datasets as an array of objects.
   */
  datasets: PropTypes.object.isRequired,
  /**
   * A Redux action for updating dataset selections.
   */
  clientFSToggleDataset: PropTypes.func.isRequired,
  /**
   * The ID of the current perspective, used for translations.
   */
  perspectiveID: PropTypes.string.isRequired
}

export const DatasetSelectorComponent = DatasetSelector

export default withStyles(styles)(DatasetSelector)
