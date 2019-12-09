import {
  UPDATE_QUERY,
  TOGGLE_DATASET,
  FETCH_RESULTS,
  UPDATE_RESULTS,
  CLEAR_RESULTS,
  UPDATE_FACET,
  SORT_RESULTS
} from '../actions';

export const INITIAL_STATE = {
  query: '',
  datasets: {
    kotus: {
      titleEn: 'Names Archive of the Institute for the Languages of Finland',
      titleFi: 'Kotimaisten kielten keskuksen Nimiarkisto (NA)',
      shortTitle: 'DNA',
      timePeriod: '1900s',
      link: 'https://nimiarkisto.fi/wiki/Nimiarkisto:Tietoja',
      selected: true
    },
    pnr: {
      titleEn: 'Finnish Geographic Names Registry',
      titleFi: 'Maanmittauslaitoksen paikannimirekisteri (PNR)',
      shortTitle: 'PNR',
      timePeriod: 'contemporary',
      link: 'https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/asiantuntevalle-kayttajalle/tuotekuvaukset/nimisto',
      selected: true
    },
    warsa_karelian_places: {
      titleEn: 'Karelian map names',
      titleFi: 'Maanmittauslaitoksen Karjalan karttanimet (KK)',
      shortTitle: 'KK',
      timePeriod: '1922-1944',
      link: 'https://www.suomi.fi/palvelut/verkkoasiointi/vanhat-karjalan-kartat-maanmittauslaitos/f51d72a2-510c-4c34-bb3e-b752f5d38250',
      selected: false
    },
    tgn: {
      titleEn: 'The Getty Thesaurus of Geographic Names (TGN)',
      titleFi: 'The Getty Thesaurus of Geographic Names (TGN)',
      shortTitle: 'TGN',
      timePeriod: '?',
      link: 'http://www.getty.edu/research/tools/vocabularies/tgn/about.html',
      selected: false
    },
  },
  results: null,
  latestFilter: {
    facetId: '',
  },
  latestFilterValues: [],
  facets: {
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
  textResultsFetching: false,
  spatialResultsFetching: false,
};

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return { ...state, query: action.query || '' };
    case TOGGLE_DATASET:
      return {
        ...state,
        suggestions: [],
        results: null,
        datasets: {
          ...state.datasets,
          [action.dataset]: {
            ...state.datasets[action.dataset],
            selected: state.datasets[action.dataset].selected ? false : true
          }
        }
      };
    case FETCH_RESULTS:
      return {
        ...state,
        [`${action.jenaIndex}ResultsFetching`]: true
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        results: null,
        fetchingResults: false,
        query: '',
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
      };
    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.results,
        [`${action.jenaIndex}ResultsFetching`]: false
      };
    case UPDATE_FACET:
      return updateFacet(state, action);
    case SORT_RESULTS:
      return {
        ...state,
        sortBy: action.options.sortBy,
        sortDirection: action.options.sortDirection,
      };
    default:
      return state;
  }
};

const updateFacet = (state, action) => {
  const { facetId, value, latestValues } = action;
  let nSet = state.facets[facetId];
  if (nSet.has(value)) {
    nSet.delete(value);
  } else {
    nSet.add(value);
  }
  const newFilter = {
    ...state.resultsFilter,
    [ facetId ]: nSet
  };
  return {
    ...state,
    resultsFilter: newFilter,
    latestFilter: {
      facetId: facetId,
    },
    latestFilterValues: latestValues
  };
};

export default search;
