import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import clientSideFacetedSearch from './namesampo/clientSideFacetedSearch'

const reducer = combineReducers({
  leafletMap,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  toastr: toastrReducer
})

export default reducer
