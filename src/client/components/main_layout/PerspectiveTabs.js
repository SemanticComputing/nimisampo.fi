import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
// import AddLocationIcon from '@material-ui/icons/AddLocation';
import PlaceIcon from '@material-ui/icons/Place';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import PieChartIcon from '@material-ui/icons/PieChart';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';


const styles = () => ({
  root: {
    flexGrow: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

class PerspectiveTabs extends React.Component {
  constructor(props) {
    super(props);
    let value = this.pathnameToValue(this.props.routeProps.location.pathname);
    this.state = { value };
  }

  componentDidUpdate = prevProps => {
    const newPath = this.props.routeProps.location.pathname;
    const oldPath = prevProps.routeProps.location.pathname;
    if (newPath != oldPath) {
      this.setState({ value: this.pathnameToValue(newPath) });
    }
  }

  pathnameToValue = pathname => {
    let value;
    switch (pathname) {
      case '/app/map_clusters':
        value = 1;
        break;
      case '/app/map_markers':
        value = 2;
        break;
      case '/app/heatmap':
        value = 3;
        break;
      case '/app/statistics':
        value = 4;
        break;
      case '/app/download':
        value = 5;
        break;
      default:
        value = 0;
    }
    return value;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, strings } = this.props;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<CalendarViewDayIcon />} label={strings.table} component={Link} to="/app" />
          <Tab icon={<TripOriginIcon />} label={strings.clusteredMap} component={Link} to="/app/map_clusters" />
          <Tab icon={<PlaceIcon />} label={strings.markerMap} component={Link} to="/app/map_markers" />
          <Tab icon={<SettingsBrightnessIcon />} label={strings.heatmap} component={Link} to="/app/heatmap" />
          <Tab icon={<PieChartIcon />} label={strings.statistics} component={Link} to="/app/statistics" />
          <Tab icon={<CloudDownloadIcon />} label={strings.download} component={Link} to="/app/download" />
        </Tabs>
      </Paper>
    );
  }
}

PerspectiveTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  routeProps: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired
};

export default withStyles(styles)(PerspectiveTabs);
