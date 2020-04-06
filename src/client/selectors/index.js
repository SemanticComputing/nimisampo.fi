import { createSelector } from 'reselect'
import { orderBy, has } from 'lodash'

// https://redux.js.org/recipes/computing-derived-data

const getFacets = state => state.facets
const getLatestFilter = state => state.latestFilter
const getLatestFilterValues = state => state.latestFilterValues
const getResults = state => state.results
const getSortBy = state => state.sortBy
const getSortDirection = state => state.sortDirection

export const filterResults = createSelector(
  [getResults, getFacets, getLatestFilter, getLatestFilterValues, getSortBy, getSortDirection],
  (results, facets, latestFilter, latestFilterValues, sortBy, sortDirection) => {
    // Apply result filters
    Object.entries(facets).forEach(([key, value]) => {
      if (value.size === 0) {

      } else {
        results = results.filter(result => {
          if (value.has(result[key])) {
            return true
          }
        })
      }
    })

    results = orderBy(results, sortBy, sortDirection)

    // Calculate result values
    // If a filter was added, first handle that filter
    const visibleValues = {}
    let skipProperty = ''
    for (const facetId in facets) {
      visibleValues[facetId] = {}
    }
    if (latestFilter) {
      skipProperty = latestFilter.id
      latestFilterValues = latestFilterValues.map(value => ({
        ...value,
        selected: facets[latestFilter.facetId].has(value.id)
      }))
      visibleValues[latestFilter.facetId] = latestFilterValues
    }
    // Then handle all the remainder filters
    for (const result of results) {
      for (const facetId in facets) {
        if (facetId !== skipProperty && has(result, facetId)) {
          if (!has(visibleValues[facetId], result[facetId])) {
            visibleValues[facetId][result[facetId]] = {
              id: result[facetId],
              prefLabel: result[facetId],
              selected: facets[facetId].has(result[facetId]),
              instanceCount: 1
            }
          } else {
            visibleValues[facetId][result[facetId]].instanceCount += 1
          }
        }
      }
    }
    for (const facetId in visibleValues) {
      visibleValues[facetId] = orderBy(visibleValues[facetId], 'prefLabel')
    }
    // console.log(results)
    // console.log(visibleValues)
    return {
      clientFSResults: results,
      clientFSFacetValues: visibleValues
    }
  }
)
