import { createSelector } from 'reselect';
import { orderBy, has } from 'lodash';

// https://redux.js.org/recipes/computing-derived-data

const getResultsFilter = state => state.resultsFilter;
const getLatestFilter = state => state.latestFilter;
const getLatestFilterValues = state => state.latestFilterValues;
const getResults = state => state.results;
const getSortBy = state => state.sortBy;
const getSortDirection = state => state.sortDirection;

export const filterResults = createSelector(
  [getResults, getResultsFilter, getLatestFilter, getLatestFilterValues, getSortBy, getSortDirection],
  (results, resultsFilter, latestFilter, latestFilterValues, sortBy, sortDirection) => {

    // Apply result filters
    Object.entries(resultsFilter).forEach(([key, value]) => {
      if (value.size === 0) {
        return;
      } else {
        results = results.filter(result => {
          if (value.has(result[key])) {
            return true;
          }
        });
      }
    });

    results = orderBy(results, sortBy, sortDirection);

    //console.log(latestFilterValues)

    // Calculate result values, first handle the filter that was updated
    let visibleValues = {};
    for (const property in resultsFilter) {
      visibleValues[property] = {};
    }
    if (latestFilter !== '') {
      latestFilterValues = latestFilterValues.map(value => ({
        ...value,
        selected: resultsFilter[latestFilter].has(value.id)
      }));
      visibleValues[latestFilter] = latestFilterValues;
    }

    // Then handle all the remainder filters
    for (const result of results) {
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

    for (const property in visibleValues) {
      visibleValues[property] = orderBy(visibleValues[property], 'prefLabel');
    }

    return {
      results: results,
      resultValues: visibleValues
    };
  }
);
