# jelou

## Setup del proyecto (Ejecutarse la primera vez que se descarga el proyecto)
```
npm install
```

### Compila e inicia applicación web
```
npm run serve
```

## Si hay problemas, instalar las siguientes dependencias y volver a hacer a iniciar applicación web
```
npm install --save @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome axios bootstrap-vue
```
```
npm run serve
```

## Inicia la base de datos
```
json-server db.json -m ./node_modules/json-server-auth -r routes.json
```

