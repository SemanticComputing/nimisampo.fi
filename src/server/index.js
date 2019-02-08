import express from 'express';
import bodyParser from 'body-parser';
import request from 'superagent';
import path from 'path';
import { has, castArray} from 'lodash';
import sparqlSearchEngine from './SparqlSearchEngine';
const DEFAULT_PORT = 3001;
const app = express();
//const isDevelopment  = app.get('env') !== 'production';

app.set('port', process.env.PORT || DEFAULT_PORT);
app.use(bodyParser.json());

// allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// React app, static files
app.use(express.static(__dirname + './../public/'));

app.get('/suggest', (req, res) => {
  const queryDatasets = castArray(req.query.dataset);
  const queryTerm = req.query.q;
  // console.log(queryDatasets);

  return sparqlSearchEngine.getFederatedSuggestions(queryTerm, queryDatasets).then((data) => {
    // console.log(data);
    res.json(data);
  })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.get('/search', (req, res) => {
  // https://softwareengineering.stackexchange.com/questions/233164/how-do-searches-fit-into-a-restful-interface
  // example request: http://localhost:3000/search?dataset=warsa_karelian_places&dataset=pnr&q=viip
  const queryDatasets = castArray(req.query.dataset);
  let queryTerm = '';
  let latMin = 0;
  let longMin = 0;
  let latMax = 0;
  let longMax = 0;

  if (has(req.query, 'q')) {
    queryTerm = req.query.q;
  }
  if (has(req.query, 'latMin')) {
    latMin = req.query.latMin;
    longMin = req.query.longMin;
    latMax = req.query.latMax;
    longMax = req.query.longMax;
  }

  return sparqlSearchEngine.getFederatedResults(queryTerm, latMin, longMin, latMax, longMax, queryDatasets).then((data) => {
    // console.log(data);
    res.json(data);
  })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.get('/wfs', (req, res) => {

  return getWFSLayers(req.query.layerID).then((data) => {
    //console.log(data);
    res.json(data);
  })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

/*  Routes are matched to a url in order of their definition
    Redirect all the the rest for react-router to handle */
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './../public/', 'index.html'));
});

const getWFSLayers = (layerIDs) => {
  return Promise.all(layerIDs.map((layerID) => getWFSLayer(layerID)));
};

const getWFSLayer = (layerID) => {
  return new Promise((resolve, reject) => {
    // https://avaa.tdata.fi/web/kotus/rajapinta
    const url = 'http://avaa.tdata.fi/geoserver/kotus/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + layerID + '&srsName=EPSG:4326&outputformat=json';
    request
      .get(url)
      .then(function(data) {
        return resolve({ layerID: layerID, geoJSON: data.body });
      })
      .catch(function(err) {
        return reject(err.message, err.response);
      });
  });
};

app.listen(app.get('port'), () => console.log('NameSampo backend listening on port ' + app.get('port')));
