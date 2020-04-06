import {
  CLIENT_FS_UPDATE_QUERY,
  CLIENT_FS_TOGGLE_DATASET,
  CLIENT_FS_FETCH_RESULTS,
  CLIENT_FS_UPDATE_RESULTS,
  CLIENT_FS_CLEAR_RESULTS,
  CLIENT_FS_UPDATE_FACET,
  CLIENT_FS_SORT_RESULTS
} from '../actions'

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
    }
  },
  results: null,
  facets: {
    datasetSelector: {
      facetID: 'datasetSelector',
      filterType: 'datasetSelector',
    },
    prefLabel: {
      facetID: 'prefLabel',
      filterType: 'clientFSLiteral',
      selectionsSet: new Set(),
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      type: 'hierarchical'
    }
    // modifier: new Set(),
    // basicElement: new Set(),
    // typeLabel: new Set(),
    // broaderTypeLabel: new Set(),
    // broaderAreaLabel: new Set(),
    // collector: new Set(),
    // collectionYear: new Set(),
    // source: new Set()
    //
  },
  lastlyUpdatedFacet: null,
  facetUpdateID: 0,
  sortBy: 'broaderAreaLabel',
  sortDirection: 'asc',
  groupBy: 'broaderTypeLabel',
  groupByLabel: 'Paikanlaji',
  textResultsFetching: false,
  spatialResultsFetching: false
}

const clientSideFacetedSearch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_FS_UPDATE_QUERY:
      return { ...state, query: action.query || '' }
    case CLIENT_FS_TOGGLE_DATASET:
      return {
        ...state,
        suggestions: [],
        results: null,
        datasets: {
          ...state.datasets,
          [action.dataset]: {
            ...state.datasets[action.dataset],
            selected: !state.datasets[action.dataset].selected
          }
        }
      }
    case CLIENT_FS_FETCH_RESULTS:
      return {
        ...state,
        [`${action.jenaIndex}ResultsFetching`]: true
      }
    case CLIENT_FS_CLEAR_RESULTS:
      return {
        ...state,
        results: null,
        fetchingResults: false,
        query: INITIAL_STATE.query,
        facets: INITIAL_STATE.facets
      }
    case CLIENT_FS_UPDATE_RESULTS:
      return {
        ...state,
        results: action.results,
        facetUpdateID: ++state.facetUpdateID,
        [`${action.jenaIndex}ResultsFetching`]: false
      }
    case CLIENT_FS_UPDATE_FACET:
      return clientFSUpdateFacet(state, action)
    case CLIENT_FS_SORT_RESULTS:
      return {
        ...state,
        sortBy: action.options.sortBy,
        sortDirection: action.options.sortDirection
      }
    default:
      return state
  }
}

const clientFSUpdateFacet = (state, action) => {
  const { facetID, value, latestValues } = action
  const newSelectionsSet = state.facets[facetID].selectionsSet
  if (newSelectionsSet.has(value)) {
    newSelectionsSet.delete(value)
  } else {
    newSelectionsSet.add(value)
  }
  const updatedFacets = {
    ...state.facets,
    [facetID]: {
      facetID,
      selectionsSet: newSelectionsSet
    }
  }
  return {
    ...state,
    facetUpdateID: ++state.facetUpdateID,
    facets: updatedFacets,
    lastlyUpdatedFacet: {
      facetID: facetID,
      values: latestValues
    }
  }
}

export default clientSideFacetedSearch
