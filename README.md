# NameSampo Web App

## Local development

```
npm install
npm run dev
```

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
