# NameSampo Web App

Project homepage: https://seco.cs.aalto.fi/projects/nimisampo/

master branch visible at http://nimisampo.fi/

dev branch visible at http://dev.nimisampo.fi/

test branch visible at http://test.nimisampo.fi/

## Requirements

Node.js https://nodejs.org/en/ (tested with 10.15.3 LTS)

Nodemon https://nodemon.io/

## Local development

Install the dependencies defined in package.json:
`npm install`

Run client and server concurrently:
`npm run dev`

## Deploy with Docker

### Build
 `docker build -t nimisampo-c .`

### Run
 `docker run -d -p 3005:3001 --name nimisampo nimisampo-c`

### Upgrade
```
docker build -t nimisampo-c .
docker stop nimisampo
docker rm nimisampo
docker run -d -p 3005:3001 --restart unless-stopped --name nimisampo nimisampo-c
```
