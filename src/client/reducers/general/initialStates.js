export const resultsInitialState = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  page: -1,
  fetching: false,
  fetchingResultCount: false,
  fetchingInstanceAnalysisData: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
  instanceTableData: null,
  instanceTableExternalData: null,
  instanceAnalysisData: null,
  instanceAnalysisDataUpdateID: 0,
  instanceSparqlQuery: null
}

export const facetsInitialState = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null
}

export const fullTextSearchInitialState = {
  query: '',
  results: [],
  sortBy: null,
  sortDirection: null
}

export const federatedSearchInitialState = {
  query: '',
  results: null,
  lastlyUpdatedFacet: null,
  facetUpdateID: 0,
  textResultsFetching: false,
  spatialResultsFetching: false
}
