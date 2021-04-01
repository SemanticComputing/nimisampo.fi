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
            perspectiveID={perspective.id}
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
            clearGeoJSONLayers={props.clearGeoJSONLayers}
            fetchByURI={props.fetchByURI}
            fetching={false}
            showInstanceCountInClusters={false}
            updateFacetOption={props.updateFacetOption}
            facetedSearchMode='clientFS'
            perspectiveID={perspective.id}
            showExternalLayers
            layerConfigs={[
              {
                id: 'karelianMaps',
                type: 'WMTS',
                url: 'https:///mapwarper.onki.fi/mosaics/tile/4/{z}/{x}/{y}.png',
                opacityControl: true,
                attribution: 'Semantic Computing Research Group'
              },
              {
                id: 'senateAtlas',
                type: 'WMTS',
                url: 'https:///mapwarper.onki.fi/mosaics/tile/5/{z}/{x}/{y}.png',
                opacityControl: true,
                attribution: 'Semantic Computing Research Group'
              }
            ]}
            showError={props.showError}
          />}
      />
      <Route
        path={`${rootUrl}/app/map_markers`}
        render={() => {
          if (props.clientFSResults.length > 1500) {
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
                clearGeoJSONLayers={props.clearGeoJSONLayers}
                fetchByURI={props.fetchByURI}
                fetching={false}
                showInstanceCountInClusters={false}
                updateFacetOption={props.updateFacetOption}
                facetedSearchMode='clientFS'
                perspectiveID={perspective.id}
                showExternalLayers
                layerConfigs={[
                  {
                    id: 'karelianMaps',
                    type: 'WMTS',
                    url: 'https:///mapwarper.onki.fi/mosaics/tile/4/{z}/{x}/{y}.png',
                    opacityControl: true,
                    attribution: 'Semantic Computing Research Group'
                  },
                  {
                    id: 'senateAtlas',
                    type: 'WMTS',
                    url: 'https:///mapwarper.onki.fi/mosaics/tile/5/{z}/{x}/{y}.png',
                    opacityControl: true,
                    attribution: 'Semantic Computing Research Group'
                  }
                ]}
                showError={props.showError}
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
  clearGeoJSONLayers: PropTypes.func.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default Places
