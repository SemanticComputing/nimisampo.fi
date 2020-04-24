import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import TripOriginIcon from '@material-ui/icons/TripOrigin'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'
import PieChartIcon from '@material-ui/icons/PieChart'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

export const perspectiveConfig = [
  {
    id: 'clientFSPlaces',
    defaultActiveFacets: new Set(['datasetSelector', 'prefLabel']),
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'map_clusters',
        value: 1,
        icon: <TripOriginIcon />
      },
      {
        id: 'map_markers',
        value: 2,
        icon: <LocationOnIcon />
      },
      {
        id: 'heatmap',
        value: 3,
        icon: <SettingsBrightnessIcon />
      },
      {
        id: 'statistics',
        value: 4,
        icon: <PieChartIcon />
      },
      {
        id: 'download',
        value: 5,
        icon: <CloudDownloadIcon />
      }
    ]
  }
]
