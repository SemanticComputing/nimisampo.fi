import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
// import AddLocationIcon from '@material-ui/icons/AddLocation'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import RedoIcon from '@material-ui/icons/Redo'
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import manuscriptsImage from '../../img/manuscripts-452x262.jpg'
// import worksImage from '../../img/works-452x262_2.jpg'
// import eventsImage from '../../img/events-452x262.jpg'

export const perspectiveConfig = [
  {
    id: 'placesClientFS',
    defaultActiveFacets: new Set(['datasetSelector']),
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ]
  }
]
