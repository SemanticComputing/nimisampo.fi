import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api'
import { has } from 'lodash'
// Google Maps JS API is loaded in index.html

const GMap = props => {
  const google = window.google
  const data = props.results.reduce((data, obj) => {
    if (has(obj, 'lat') && has(obj, 'long')) {
      data.push(new google.maps.LatLng(+obj.lat, +obj.long))
    }
    return data
  }, [])
  return (
    <GoogleMap
      mapContainerStyle={{
        height: `calc(100% - ${props.layoutConfig.tabHeight}px)`,
        width: '100%'
      }}
      zoom={4}
      center={{ lat: 65.184809, lng: 27.31405 }}
    >
      <HeatmapLayer data={data} />
    </GoogleMap>
  )
}

GMap.propTypes = {
  results: PropTypes.array,
  layoutConfig: PropTypes.object.isRequired
}

export default GMap
