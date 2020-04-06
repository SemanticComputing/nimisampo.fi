import { runSelectQuery } from './SparqlApi'
// import { flatten } from 'lodash'
import datasetConfig from './namesampo/SparqlQueries'
import {
  mapNameSampoResults
} from './Mappers'

const getResults = async (queryTerm, latMin, longMin, latMax, longMax, datasetId, resultFormat) => {
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
  return runSelectQuery({
    query,
    endpoint,
    resultMapper: mapNameSampoResults,
    resultFormat
  })
}

export const getFederatedResults = async ({
  queryTerm,
  latMin,
  longMin,
  latMax,
  longMax,
  datasets,
  resultFormat
}) => {
  const federatedResults = await Promise.all(datasets.map((datasetId) =>
    getResults(queryTerm, latMin, longMin, latMax, longMax, datasetId, resultFormat)))

  // merge search results from multiple endpoints into a single array
  let results = []
  federatedResults.forEach(resultSet => {
    results = [...results, ...resultSet.data]
  })

  return results
}

// export const getWFSLayers = async layerIDs => {
//   const data = await Promise.all(layerIDs.map((layerID) => getWFSLayer(layerID)))
//   return data
// }

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
