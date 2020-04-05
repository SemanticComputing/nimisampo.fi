import { runSelectQuery, getWFSLayer } from './Requests'
import { flatten } from 'lodash'
import datasetConfig from './SparqlQueries'
import {
  mapNameSampoResults
} from './sparql/Mappers'

const getResults = async (queryTerm, latMin, longMin, latMax, longMax, datasetId) => {
  const { endpoint, resultQuery } = datasetConfig[datasetId]
  let query = ''
  if (datasetId !== 'tgn') {
    if (queryTerm !== '') {
      query = resultQuery.replace('<QUERY>', `?id text:query (skos:prefLabel '${queryTerm.toLowerCase()}' 100000) .`)
    } else if (latMin !== 0) {
      query = resultQuery.replace('<QUERY>', `?id spatial:withinBox (${latMin} ${longMin} ${latMax} ${longMax} 1000000) .`)
    }
  } else {
    query = resultQuery.replace(/<QUERYTERM>/g, queryTerm.toLowerCase())
  }
  return runSelectQuery(query, endpoint, mapNameSampoResults)
}

export const getFederatedResults = async (queryTerm, latMin, longMin, latMax, longMax, datasets) => {
  const results = await Promise.all(datasets.map((datasetId) =>
    getResults(queryTerm, latMin, longMin, latMax, longMax, datasetId)))
  return flatten(results)
}

export const getWFSLayers = async layerIDs => {
  const data = await Promise.all(layerIDs.map((layerID) => getWFSLayer(layerID)))
  return data
}

// export const getSimpleSuggestions = async (queryTerm, datasetId) => {
//     const { endpoint, simpleSuggestionQuery } = datasetConfig[datasetId];
//     const query = simpleSuggestionQuery.replace(/<QUERYTERM>/g, queryTerm.toLowerCase());
//
//     return this.doSearch(query, sparqlApi, null)
//       .then((results) => results.map(res => (res.label.value)));
//   }

// export const getFederatedSuggestions(queryTerm, datasets) {
//     return Promise.all(datasets.map((datasetId) =>
//       this.getSimpleSuggestions(queryTerm, datasetId))).then(mergeSimpleSuggestions);
//   }
