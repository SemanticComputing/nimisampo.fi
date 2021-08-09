export default {
  languageLabel: 'English',
  html: {
    title: 'NameSampo: A Workbench for Toponomastic Research',
    description: 'NameSampo is a semantic portal for searching and studying place names. The data can be viewed as a table, on maps, and as statistical distributions.'
  },
  appTitle: {
    short: 'NameSampo',
    long: 'NameSampo: A Workbench for Toponomastic Research'
  },
  appDescription1: `
    NameSampo is a semantic portal for searching and studying place names. The search results
    can be viewed as a table, on maps, and as statistical distributions. 
    Historical and current background maps are provided.
  `,
  appDescription2: `
    Start by choosing source dataset(s) and input a place name on the search field.
    Alternatively you can search by area. 
  `,
  appDescription3: `
    
  `,
  appDescription4: `
  
  `,
  backendErrorText: 'One of the backend services is not available at the moment. Please try again later.',
  topBar: {
    feedback: 'feedback',
    info: {
      info: 'Info',
      infoURL: 'https://seco.cs.aalto.fi/projects/nimisampo/en/'
    },
    searchBarPlaceHolder: 'Search all content',
    searchBarPlaceHolderShort: 'Search',
    instructions: 'instructions'
  },
  facetBar: {
    results: 'Results',
    filters: 'Filters',
    narrowDownBy: 'Narrow down by'
  },
  tabs: {
    table: 'table',
    map_clusters: 'clustered map',
    map_markers: 'map',
    heatmap: 'heatmap',
    statistics: 'statistics',
    download: 'download'
  },
  table: {
    rowsPerPage: 'Rows per page',
    of: 'of'
  },
  exportToYasgui: 'open the result table query in yasgui sparql editor',
  openInLinkedDataBrowser: 'open in linked data browser',
  resultsAsCSV: 'download the search results as a CSV table',
  facets: {
    dateFacet: {
      invalidDate: 'Epäkelpo päivämäärä.',
      toBeforeFrom: 'Alkupäivämäärän täytyy olla ennen loppupäivämäärää.',
      minDate: 'Aikaisin sallittu päivämäärä on {minDate}',
      maxDate: 'Myöhäisin sallittu päivämäärä on {maxDate}',
      cancel: 'Peruuta',
      fromLabel: 'Alku',
      toLabel: 'Loppu'
    },
    textFacet: {
      inputLabel: 'Etsi nimellä'
    }
  },
  leafletMap: {
    basemaps: {
      mapbox: {
        'light-v10': 'Mapbox Light (OpenStreetMap)'
      },
      googleRoadmap: 'Google Maps',
      topographicalMapNLS: 'Topographical map (National Land Survey of Finland)',
      backgroundMapNLS: 'Background map (National Land Survey of Finland)',
      airMapNLS: 'Aerial map (National Land Survey of Finland)'
    },
    externalLayers: {
      // arkeologiset_kohteet_alue: 'Register of Archaeological Sites, areas',
      // arkeologiset_kohteet_piste: 'Register of Archaeological Sites, points',
      karelianMaps: 'Karelian maps, 1:100 000 topographic (SeCo)',
      senateAtlas: 'Senate atlas, 1:21 000 topographic (SeCo)',
      'kotus:pitajat': 'Finnish parishes in 1938 (Institute for the Languages of Finland)',
      'kotus:rajat-sms-alueet': 'Dialectical regions in Finland (Institute for the Languages of Finland)',
      'kotus:rajat-sms-alueosat': 'Dialectical subregions in Finland (Institute for the Languages of Finland)',
      'kotus:rajat-lansi-ita': 'Border between western and eastern dialects in Finland (Institute for the Languages of Finland)'
    },
    mapModeButtons: {
      markers: 'Markers',
      heatmap: 'Heatmap'
    },
    wrongZoomLevel: 'The map zoom level has to at least 11',
    tooManyResults: 'More than 500 results, please use clustered map or heatmap'
  },
  instancePageGeneral: {
    introduction: `
      <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
        This landing page provides a human-readable summary of the data points that link
        to this {entity}. The data included in this summary reflect only those data points
        used in the MMM Portal. Click the Open in Linked Data Browser on button on the
        Export tab to view the complete set of classes and properties linked to this record.
      </p>
      <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
        To cite this record, use its url. You can use also use the url to return directly
        to the record at any time.
      </p>
    `,
    repetition: `
      <h6 class="MuiTypography-root MuiTypography-h6">
        Repetition of data
      </h6>
      <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
        The same or similar data may appear within a single data field multiple times.
        This repetition occurs due to the merging of multiple records from different datasets
        to create the MMM record.
      </p>
    `
  },
  perspectives: {
    clientFSPlaces: {
      datasets: {
        kotus: {
          label: 'Names Archive of the Institute for the Languages of Finland (NA)',
          aboutLink: 'https://nimiarkisto.fi/wiki/Nimiarkisto:Tietoja'
        },
        pnr: {
          label: 'Finnish Geographic Names Registry (PNR)',
          aboutLink: 'https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/asiantuntevalle-kayttajalle/tuotekuvaukset/nimisto'
        },
        warsa_karelian_places: {
          label: 'Karelian map names (KK)',
          aboutLink: 'https://www.suomi.fi/palvelut/verkkoasiointi/vanhat-karjalan-kartat-maanmittauslaitos/f51d72a2-510c-4c34-bb3e-b752f5d38250'
        },
        tgn: {
          label: 'The Getty Thesaurus of Geographic Names (TGN)',
          aboutLink: 'http://www.getty.edu/research/tools/vocabularies/tgn/about.html'
        }
      },
      facetResultsType: '',
      inputPlaceHolder: 'Search place names',
      searchByArea: 'Search by area',
      searchByAreaTitle: `
        Limit the area by zooming and moving the map view, and use the buttoms on bottom for confirmation.
        The zoom level must be at least 11.
      `,
      searchByAreaCancel: 'Cancel',
      searchByAreaSearch: 'Search',
      properties: {
        datasetSelector: {
          label: 'Choose dataset(s)',
          description: 'Description'
        },
        prefLabel: {
          label: 'Name',
          description: 'Description'
        },
        broaderTypeLabel: {
          label: 'Type',
          description: 'Description'
        },
        broaderAreaLabel: {
          label: 'Area',
          description: 'Description'
        },
        modifier: {
          label: 'Modifier',
          description: 'Description'
        },
        basicElement: {
          label: 'Base',
          description: 'Description'
        },
        collectionYear: {
          label: 'Year',
          description: 'Description'
        },
        source: {
          label: 'Source',
          description: 'Description'
        }
      }
    }
  }
}
