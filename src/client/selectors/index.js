import { createSelector } from 'reselect';
import { orderBy, has } from 'lodash';

// https://redux.js.org/recipes/computing-derived-data

const getResultsFilter = state => state.resultsFilter;
const getLatestFilter = state => state.latestFilter;
const getLatestFilterValues = state => state.latestFilterValues;
const getResults = state => state.results;
const getSortBy = state => state.sortBy;
const getSortDirection = state => state.sortDirection;

export const getVisibleResults = createSelector(
  [ getResults, getResultsFilter, getSortBy, getSortDirection ],
  (results, resultsFilter, sortBy, sortDirection) => {
    if (activeFilters(resultsFilter)) {
      results = results.filter(filterVisibleResult(resultsFilter));
    }
    return orderBy(results, sortBy, sortDirection);
  }
);

export const getVisibleValues = createSelector(
  [ getVisibleResults, getResults, getResultsFilter, getLatestFilter, getLatestFilterValues ],
  (visibleResults, results, resultsFilter, latestFilter, latestFilterValues) => {
    let visibleValues = {};
    for (const property in resultsFilter) {
      visibleValues[property] = {};
    }

    // First handle the filter that was updated
    if (latestFilter !== '') {
      latestFilterValues = latestFilterValues.map(value => ({
        ...value,
        selected: resultsFilter[latestFilter].has(value.id)
      }));
      visibleValues[latestFilter] = latestFilterValues;
    }

    // Then handle all the remainder filters
    for (const result of visibleResults) {
      for (const property in resultsFilter) {
        if (property !== latestFilter) {
          if (!has(visibleValues[property], result[property])) {
            visibleValues[property][result[property]] = {
              id: result[property],
              prefLabel: result[property],
              selected: resultsFilter[property].has(result[property]),
              instanceCount: 1
            };
          } else {
            visibleValues[property][result[property]].instanceCount += 1;
          }
        }
      }
    }

    return visibleValues;
  }
);

const filterVisibleResult = resultsFilter => resultObj => {
  for (const property in resultsFilter) {
    const filterValues = resultsFilter[property];
    if (filterValues.has(resultObj[property])) {
      return true;
    }
  }
  return false;
};

const activeFilters = resultsFilter => {
  for (const property in resultsFilter) {
    if (resultsFilter[property].size != 0) {
      return true;
    }
  }
  return false;
};
