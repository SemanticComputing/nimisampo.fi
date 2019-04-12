import {
  forOwn,
  get,
  reduce,
}
  from 'lodash';

export const groupBy = (sparqlBindings, group) => Object.values(reduce(sparqlBindings, (results, sparqlResult) => {
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
      result[key] = value.value;
      //const oldVal = result[key];
      // add new value if it doesn't already exist
      //if (!find(oldVal, (val) => isEqual(val, value))) {
      //  (result[key] || (result[key] = [])).push(value);
      //}
    }
  });
  return results;
}, {}));

export const mapResults = (results) => groupBy(results, 'id');
