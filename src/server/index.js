import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { has, castArray} from 'lodash';
import { getFederatedResults, getWFSLayers } from './Search';
const DEFAULT_PORT = 3001;
const app = express();
app.set('port', process.env.PORT || DEFAULT_PORT);
app.use(bodyParser.json());

// allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// The root directory from which to serve static assets (React app)
const publicPath = path.join(__dirname, './../public/');
app.use(express.static(publicPath));

app.get('/search', async (req, res, next) => {
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
  try {
    const data = await getFederatedResults(queryTerm, latMin, longMin, latMax, longMax, queryDatasets);
    res.json(data);
  } catch(error) {
    next(error);
  }
});

app.get('/wfs', async (req, res, next) => {
  try {
    const data = await getWFSLayers(req.query.layerID);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

// app.get('/suggest', (req, res) => {
//   const queryDatasets = castArray(req.query.dataset);
//   const queryTerm = req.query.q;
//   // console.log(queryDatasets);
//
//   return sparqlSearchEngine.getFederatedSuggestions(queryTerm, queryDatasets).then((data) => {
//     // console.log(data);
//     res.json(data);
//   })
//     .catch((err) => {
//       console.log(err);
//       return res.sendStatus(500);
//     });
// });


/*  Routes are matched to a url in order of their definition
    Redirect all the the rest for react-router to handle */
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './../public/', 'index.html'));
});

app.listen(app.get('port'), () =>
  console.log(`
  Express server listening on port ${app.get('port')}
  Static files (e.g. the React app) will be served from ${publicPath}
  `)
);
