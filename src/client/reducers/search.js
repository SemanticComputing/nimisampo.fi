import {
  UPDATE_QUERY,
  TOGGLE_DATASET,
  FETCH_SUGGESTIONS,
  FETCH_RESULTS,
  UPDATE_SUGGESTIONS,
  CLEAR_SUGGESTIONS,
  UPDATE_RESULTS,
  CLEAR_RESULTS,
  UPDATE_RESULTS_FILTER,
  SORT_RESULTS
} from '../actions';

// import sampleResults from './sampleResults';

export const INITIAL_STATE = {
  query: '',
  datasets: {
    'kotus': {
      'titleEn': 'Names Archive of the Institute for the Languages of Finland',
      'titleFi': 'Kotimaisten kielten keskuksen Nimiarkisto (NA)',
      'shortTitle': 'DNA',
      'timePeriod': '1900s',
      'selected': true
    },
    'pnr': {
      'titleEn': 'Finnish Geographic Names Registry',
      'titleFi': 'Maanmittauslaitoksen paikannimirekisteri (PNR)',
      'shortTitle': 'PNR',
      'timePeriod': 'contemporary',
      'selected': true
    },
    'warsa_karelian_places': {
      'titleEn': 'Karelian map names',
      'titleFi': 'Karjalan karttanimet (KK)',
      'shortTitle': 'KK',
      'timePeriod': '1922-1944',
      'selected': false
    },
    'tgn': {
      'titleEn': 'The Getty Thesaurus of Geographic Names (TGN)',
      'titleFi': 'The Getty Thesaurus of Geographic Names (TGN)',
      'shortTitle': 'TGN',
      'timePeriod': '?',
      'selected': false
    },
    // 'warsa_municipalities': {
    //   'title': 'Finnish WW2 municipalities',
    //   'shortTitle': 'FWM',
    //   'timePeriod': '1939-1944',
    //   'selected': false
    // },
  },
  suggestions: [],
  suggestionsQuery: '',
  fetchingSuggestions: false,
  results: [],
  //results: sampleResults,
  latestFilter: '',
  latestFilterValues: [],
  resultsFilter: {
    prefLabel: new Set(),
    modifier: new Set(),
    basicElement: new Set(),
    typeLabel: new Set(),
    broaderTypeLabel: new Set(),
    broaderAreaLabel: new Set(),
    collector: new Set(),
    collectionYear: new Set(),
    source: new Set(),
  },
  sortBy: 'broaderAreaLabel',
  sortDirection: 'asc',
  groupBy: 'broaderTypeLabel',
  groupByLabel: 'Paikanlaji',
  resultsQuery: '',
  fetchingResults: false,
};

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return { ...state, query: action.query || '' };
    case TOGGLE_DATASET:
      return {
        ...state,
        suggestions: [],
        results: [],
        datasets: {
          ...state.datasets,
          [action.dataset]: {
            ...state.datasets[action.dataset],
            selected: state.datasets[action.dataset].selected ? false : true
          }
        }
      };
    case FETCH_SUGGESTIONS:
      return { ...state, fetchingSuggestions: true };
    case FETCH_RESULTS:
      return { ...state, fetchingResults: true };
    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
        suggestionsQuery: '',
        fetchingSuggestions: false
      };
    case UPDATE_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
        suggestionsQuery: state.query,
        fetchingSuggestions: false
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        results: [],
        resultsQuery: '',
        fetchingResults: false
      };
    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.results,
        resultsQuery: state.query,
        fetchingResults: false
      };
    case UPDATE_RESULTS_FILTER:
      return updateResultsFilter(state, action);
    case SORT_RESULTS:
      //console.log(action)
      return {
        ...state,
        sortBy: action.options.sortBy,
        sortDirection: action.options.sortDirection,
      };
    default:
      return state;
  }
};

const updateResultsFilter = (state, action) => {
  const { property, value, latestValues } = action.filterObj;
  //console.log(property)
  //console.log(value)
  let nSet = state.resultsFilter[property];
  //console.log(nSet)
  if (nSet.has(value)) {
    nSet.delete(value);
  } else {
    nSet.add(value);
  }
  const newFilter = {
    ...state.resultsFilter,
    [property]: nSet
  };
  return {
    ...state,
    resultsFilter: newFilter,
    latestFilter: property,
    latestFilterValues: latestValues
  };
};

// const updateObject = (oldObject, newValues) => {
//   // Encapsulate the idea of passing a new object as the first parameter
//   // to Object.assign to ensure we correctly copy data instead of mutating
//   //console.log(Object.assign({}, oldObject, newValues));
//   return Object.assign({}, oldObject, newValues);
// };

export default search;
