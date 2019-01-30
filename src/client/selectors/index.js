import { createSelector } from 'reselect';
import { orderBy, has } from 'lodash';

// https://redux.js.org/recipes/computing-derived-data

const getResultsFilter = state => state.resultsFilter;
const getLatestFilter = state => state.latestFilter;
const getResults = state => state.results;
const getSortBy = state => state.sortBy;
const getSortDirection = (state) => state.sortDirection;

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
  [ getVisibleResults, getResults, getResultsFilter, getLatestFilter ],
  (visibleResults, results, resultsFilter, latestFilter) => {
    let visibleValues = {};
    for (const property in resultsFilter) {
      visibleValues[property] = {};
    }
    console.log(latestFilter)
    console.log(resultsFilter[latestFilter])
    if (latestFilter !== '') {
      // for latest filter update, filter all results, not visible results
      for (const result of results) {
        if (!has(visibleValues[latestFilter], result[latestFilter])) {
          visibleValues[latestFilter][result[latestFilter]] = {
            id: result[latestFilter],
            prefLabel: result[latestFilter],
            selected: resultsFilter[latestFilter].has(result[latestFilter]),
            instanceCount: 1
          };
        } else {
          visibleValues[latestFilter][result[latestFilter]].instanceCount += 1;
        }
      }
    }

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
