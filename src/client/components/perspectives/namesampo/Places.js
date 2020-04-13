import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import intl from 'react-intl-universal'
import { Route, Redirect } from 'react-router-dom'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import LeafletMap from '../../facet_results/LeafletMap'
import ResultInfo from '../../facet_results/ResultInfo'
import GMap from '../../facet_results/GMap'
import VirtualizedTable from '../../facet_results/VirtualizedTable'
import Pie from '../../facet_results/Pie.js'
import CSVButton from '../../facet_results/CSVButton'

const Places = props => {
  const { rootUrl, perspective } = props
  // console.log(props.clientFSResults)
  return (
    <>
      <PerspectiveTabs
        routeProps={props.routeProps}
        tabs={perspective.tabs}
        screenSize={props.screenSize}
      />
      <Route
        exact path={`${rootUrl}/app`}
        render={() => <Redirect to={`${rootUrl}/app/table`} />}
      />
      <Route
        path={`${rootUrl}/app/table`}
        render={() =>
          <VirtualizedTable
            list={Immutable.List(props.clientFSResults)}
            clientFS={props.clientFS}
            clientFSSortResults={props.clientFSSortResults}
            perspectiveID='placesClientFS'
          />}
      />
      <Route
        path={`${rootUrl}/app/map_clusters`}
        render={() =>
          <LeafletMap
            center={[65.184809, 27.314050]}
            zoom={5}
            results={props.clientFSResults}
            layers={props.leafletMap}
            pageType='clientFSResults'
            mapMode='cluster'
            facetUpdateID={props.clientFS.facetUpdateID}
            showMapModeControl={false}
            fetchGeoJSONLayers={props.fetchGeoJSONLayersBackend}
            fetchByURI={props.fetchByURI}
            fetching={false}
            showInstanceCountInClusters={false}
            updateFacetOption={props.updateFacetOption}
            showExternalLayers
            facetedSearchMode='clientFS'
          />}
      />
      <Route
        path={`${rootUrl}/app/map_markers`}
        render={() => {
          if (props.clientFSResults.length > 3000) {
            return <ResultInfo message={intl.get('leafletMap.tooManyResults')} />
          } else {
            return (
              <LeafletMap
                center={[65.184809, 27.314050]}
                zoom={5}
                results={props.clientFSResults}
                layers={props.leafletMap}
                pageType='clientFSResults'
                mapMode='marker'
                facetUpdateID={props.clientFS.facetUpdateID}
                showMapModeControl={false}
                fetchGeoJSONLayers={props.fetchGeoJSONLayersBackend}
                fetchByURI={props.fetchByURI}
                fetching={false}
                showInstanceCountInClusters={false}
                updateFacetOption={props.updateFacetOption}
                showExternalLayers
                facetedSearchMode='clientFS'
              />
            )
          }
        }}
      />
      <Route
        path={`${rootUrl}/app/heatmap`}
        render={() =>
          <GMap results={props.clientFSResults} />}
      />
      <Route
        path={`${rootUrl}/app/statistics`}
        render={() =>
          <Pie
            data={props.clientFSResults}
            groupBy={props.clientFS.groupBy}
            groupByLabel={props.clientFS.groupByLabel}
            query={props.clientFS.query}
          />}
      />
      <Route
        path={`${rootUrl}/app/download`}
        render={() =>
          <CSVButton results={props.clientFSResults} />}
      />
    </>
  )
}

Places.propTypes = {
  routeProps: PropTypes.object.isRequired,
  perspective: PropTypes.object.isRequired,
  screenSize: PropTypes.string.isRequired,
  clientFS: PropTypes.object.isRequired,
  clientFSResults: PropTypes.array,
  clientFSSortResults: PropTypes.func.isRequired,
  leafletMap: PropTypes.object.isRequired,
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default Places
