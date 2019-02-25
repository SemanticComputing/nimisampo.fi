import {
  UPDATE_LANGUAGE,
  UPDATE_RESULT_FORMAT,
  UPDATE_MAP_MODE,
} from '../actions';

const DEFAULT_LANGUAGE = 'fi';
const DEFAULT_RESULT_FORMAT = 'table';
const DEFAULT_MAP_MODE = 'cluster';

export const INITIAL_STATE = {
  language: DEFAULT_LANGUAGE,
  resultFormat: DEFAULT_RESULT_FORMAT,
  mapMode: DEFAULT_MAP_MODE,
  strings: {
    en: {
      nameSampo: 'NameSampo',
      nameSampoDesc: `A web application for searching, analyzing, and
      visualizing geospatial data.`,
      selectDataSources: 'Select data sources',
      results: 'results',
      result: 'result',
      filterResults: ', narrow results by:',
      searchPlaceNames: 'Search place names',
      searchByArea: 'Search by area',
      name: 'Name',
      type: 'Type',
      area: 'Area',
      modifier: 'Modifier',
      base: 'Base',
      year: 'Year',
      table: 'table',
      clusteredMap: 'clustered map',
      markerMap: 'marker map',
      heatmap: 'heatmap',
      statistics: 'statistics',
      download: 'download',
      source: 'Source',
      resultsAsCSV: 'results as csv table',
      search: 'Search...',
      tooManyResults: 'Over 5000 results, please use clustered map or heatmap.',
      feedback: 'Feedback'
    },
    fi: {
      nameSampo: 'Nimisampo: nimistöntutkijan työpöytä',
      nameSampoDesc1: `Nimisampo on kaikille avoin verkkopalvelu
      suomalaisesta paikannimistöstä kiinnostuneiden tutkijoiden ja
      suuren yleisön käytettäväksi. Nimistöä voi tarkastella kartoilla,
      datana ja tilastollisesti. Nykyisten karttapohjien ohella voi käyttää
      myös historiallisia luovutetun Karjalan karttoja ja 1900-luvun vaihteen
      venäläisiä Senaatin kartastoja eli Venäjän armeijan 1800–1900-luvulla
      laatimia Etelä-Suomen karttoja.`,
      nameSampoDesc2: `Aloita haku valitsemalla vasemmalta lähdeaineisto ja
      syöttämällä paikannimi.`,
      nameSampoDesc3: `Paikannimien haussa voi käyttää jokerimerkkiä (*), esimerkiksi
      haulla "orava*" löytyvät kaikki orava-alkuiset ja haulla "*haara" kaikki
      haara-loppuiset nimet.`,
      nameSampoDesc4: `Hakutermejä voi myös yhdistellä käyttämällä "or"-sanaa, esimerkiksi
      "ukko* or ukon*" löytää kaikki ukko- tai ukon-alkuiset nimet.`,
      selectDataSources: 'Valitse lähdeaineistot',
      results: 'hakutulosta',
      result: 'hakutulos',
      filterResults: ', suodata:',
      searchPlaceNames: 'Hae paikannimellä',
      searchByArea: 'Hae kaikki paikat alueelta',
      searchByAreaTitle: 'Siirrä karttanäkymä tutkittavalle alueelle, aseta zoomaustasoksi vähintään 11 ja käytä alareunan hakupainiketta.',
      name: 'Nimi',
      type: 'Paikanlaji',
      area: 'Alue',
      modifier: 'Määriteosa',
      base: 'Perusosa',
      year: 'Keruuvuosi',
      table: 'taulukko',
      clusteredMap: 'klusteroitu kartta',
      markerMap: 'kartta',
      heatmap: 'lämpökartta',
      statistics: 'tilastot',
      download: 'lataus',
      source: 'Lähde',
      resultsAsCSV: 'lataa hakutulokset csv-taulukkona',
      search: 'Hae...',
      tooManyResults: 'Hakutuloksia on yli 5000, jolloin täytyy käyttää joko klusteroitua karttaa tai lämpökartta.',
      feedback: 'Palaute'
    }
  }
};

const options = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return { ...state, language: action.language || DEFAULT_LANGUAGE };
    case UPDATE_RESULT_FORMAT:
      return { ...state, resultFormat: action.resultFormat || DEFAULT_RESULT_FORMAT };
    case UPDATE_MAP_MODE:
      return { ...state, mapMode: action.mapMode || DEFAULT_MAP_MODE };
    default:
      return state;
  }
};

export default options;
