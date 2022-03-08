import React, { Component } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import CircularProgress from '@mui/material/CircularProgress'
import withStyles from '@mui/styles/withStyles'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yearToISOString, ISOStringToYear } from './FacetHelpers'

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3)
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    height: 40
  },
  textField: {
    width: 100
  },
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

/**
* A component for a slider range facet.
*/
class SliderFacet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      min: null,
      max: null,
      start: null,
      end: null
    }
  }

  componentDidMount = () => {
    this.props.fetchFacet({
      facetClass: this.props.facetClass,
      facetID: this.props.facetID
    })
  }

  componentDidUpdate = prevProps => {
    if (this.props.facet.min == null || this.props.facet.max == null) {
      return
    }
    if (prevProps.facet.min !== this.props.facet.min ||
      prevProps.facetFilter !== this.props.facetFilter ||
      (prevProps.facet.isFetching && !this.props.facet.isFetching)) {
      let newMin
      let newMax
      let newStart
      let newEnd
      const { min, max } = this.props.facet
      if (this.props.dataType === 'ISOString') {
        newMin = ISOStringToYear(min)
        newMax = ISOStringToYear(max)
        if (this.props.facetFilter == null) {
          newStart = newMin
          newEnd = newMax
        } else {
          const { start, end } = this.props.facetFilter
          newStart = ISOStringToYear(start)
          newEnd = ISOStringToYear(end)
        }
      } else if (this.props.dataType === 'integer') {
        newMin = parseInt(min)
        newMax = parseInt(max)
        if (this.props.facetFilter == null) {
          newStart = newMin
          newEnd = newMax
        } else {
          const { start, end } = this.props.facetFilter
          newStart = parseInt(start)
          newEnd = parseInt(end)
        }
      }
      this.setState({
        min: newMin,
        max: newMax,
        start: newStart,
        end: newEnd
      })
    }
  }

  handleSliderOnChange = (event, newValues) => {
    this.setState({
      start: newValues[0],
      end: newValues[1]
    })
  }

  handleMinInputOnChange = event => {
    const newStart = event.target.value === '' ? '' : Number(event.target.value)
    this.setState({ start: newStart })
  }

  handleMaxInputOnChange = event => {
    const newEnd = event.target.value === '' ? '' : Number(event.target.value)
    this.setState({ end: newEnd })
  }

  handleApplyOnClick = () => this.updateFacetSelection()

  handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      this.updateFacetSelection()
    }
  }

  updateFacetSelection = () => {
    const { start, end, min, max } = this.state
    if (this.isValidSelection({ start, end, min, max })) {
      let facetValues = []
      if (this.props.dataType === 'ISOString') {
        facetValues[0] = yearToISOString({ year: start, start: true })
        facetValues[1] = yearToISOString({ year: end, start: false })
      } else {
        facetValues = [start, end]
      }
      this.props.updateFacetOption({
        facetClass: this.props.facetClass,
        facetID: this.props.facetID,
        option: this.props.facet.filterType,
        value: facetValues
      })
    } else {
      this.props.showError({
        title: this.props.facetLabel,
        text: intl.get('facets.sliderFacet.invalidStartOrEnd', { min, max })
      })
    }
  }

  isValidSelection = ({ start, end, min, max }) => {
    if (!Number.isInteger(start) || !Number.isInteger(end)) { return false }
    if (start > end) { return false }
    if (start < min || end < min) { return false }
    if (start > max || end > max) { return false }
    return true
  }

  render () {
    const { min, max, start, end } = this.state
    const { classes, someFacetIsFetching, minLabel, maxLabel } = this.props
    const { isFetching } = this.props.facet
    if (isFetching || start == null || end == null || min == null || max == null) {
      return (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <div className={classes.root}>
        <div className={classes.sliderContainer}>
          <Slider
            min={min}
            max={max}
            value={[start, end]}
            onChange={this.handleSliderOnChange}
            valueLabelDisplay='on'
            aria-labelledby='range-slider'
            disabled={someFacetIsFetching || isFetching}
          />
        </div>
        <div className={classes.inputContainer}>
          <TextField
            id='standard-number'
            label={minLabel}
            disabled={someFacetIsFetching}
            value={start}
            onChange={this.handleMinInputOnChange}
            onKeyPress={this.handleOnKeyPress}
            variant='outlined'
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 1,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
            margin='normal'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={this.handleApplyOnClick}
            disabled={someFacetIsFetching || isFetching}
          >
            {intl.get('facetBar.applyFacetSelection')}
          </Button>
          <TextField
            id='standard-number'
            label={maxLabel}
            disabled={someFacetIsFetching}
            value={end}
            onChange={this.handleMaxInputOnChange}
            onKeyPress={this.handleOnKeyPress}
            variant='outlined'
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 1,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
            margin='normal'
          />
        </div>
      </div>
    )
  }
}

SliderFacet.propTypes = {
  classes: PropTypes.object.isRequired,
  facetID: PropTypes.string.isRequired,
  facet: PropTypes.object.isRequired,
  facetFilter: PropTypes.object,
  facetLabel: PropTypes.string,
  facetClass: PropTypes.string,
  fetchFacet: PropTypes.func,
  someFacetIsFetching: PropTypes.bool.isRequired,
  updateFacetOption: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  dataType: PropTypes.oneOf(['ISOString', 'integer']).isRequired
}

export const SliderFacetComponent = SliderFacet

export default withStyles(styles)(SliderFacet)
