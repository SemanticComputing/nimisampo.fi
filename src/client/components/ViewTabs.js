import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';


const styles = () => ({
  root: {
    flexGrow: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

class ViewTabs extends React.Component {
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
      case '/app/map':
        value = 1;
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
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab icon={<CalendarViewDayIcon />} label="table" component={Link} to="/app" />
          <Tab icon={<AddLocationIcon />} label="map" component={Link} to="/app/map" />
        </Tabs>
      </Paper>
    );
  }
}

ViewTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  routeProps: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewTabs);
