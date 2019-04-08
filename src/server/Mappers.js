import {
  flatten,
  forOwn,
  isEqual,
  get,
  reduce,
  find,
  compact
}
  from 'lodash';

export const groupBy = (sparqlBindings, group, simplify) => Object.values(reduce(sparqlBindings, (results, sparqlResult) => {
  const id = get(sparqlResult[group], 'value');
  if (id === undefined) {
    return [];
  }
  if (!results[id]) {
    results[id] = {};
  }
  let result = results[id];
  forOwn(sparqlResult, (value, key) => {
    if (key === group) {
      result[group] = value.value;
    } else {
      if (simplify) {
        if (key === 'basicElement' || key === 'markerColor') {
          result[key] = value.value;
        } else {
          result[key] = capitalizeFirstLetter(value.value);
        }
      } else {
        const oldVal = result[key];
        // add new value if it doesn't already exist
        if (!find(oldVal, (val) => isEqual(val, value))) {
          (result[key] || (result[key] = [])).push(value);
        }
      }
    }
  });
  return results;
}, {}));

export const mergeSuggestions = (suggestions) => {
  return groupBy(compact(flatten(suggestions)), 'label', false);
};


export const mergeSimpleSuggestions = (suggestions) => {

  // Suggestions from different datasets may have duplicates
  let uniqueSuggestions = [...new Set(flatten(suggestions))];

  // Sort suggestions alphabetically, because Lunece score does
  // not work with wildcard queries.
  return uniqueSuggestions.sort();
};


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const mapResults = (results) => groupBy(results, 's', true);
