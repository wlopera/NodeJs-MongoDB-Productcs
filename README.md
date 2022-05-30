# NodeJs-MongoDB-Productcs
Crear productos usando NoderJS y MongoDB
 
-----------------------------------------------------------------------------
Crear proyecto y base de datos en Mondo Atlas
-----------------------------------------------------------------------------
1. Crear Organizacion (wlopera)
2. Crear proyecto (Curso JS-NodeJS)
3. Crear Cluster: JsNode (puede contener varias Bases de datos)
4. Crear User: user/pass: admin/_pASSWORD_
5. Crear acceso al cluster: (ALLOW ACCESS FROM ANYWHERE)
-----------------------------------------------------------------------------

-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
Crear Proyecto Node en VSC 
-----------------------------------------------------------------------------
$ npm init -y

## Crear Base de datos MongoDB
![Captura](https://user-images.githubusercontent.com/7141537/171055590-418b3bb8-1762-4738-ae51-9ad05cb210ac.PNG)

## Estrutura de Carpetas
![Captura2](https://user-images.githubusercontent.com/7141537/171055588-6891ea52-7dfb-48e1-ab45-f90db2c5dae4.PNG)

## Dependencias
```
"dependencies": {
    "debug": "^4.3.4",
    "dotenv": "^16.0.1",
    "excel4node": "^1.7.2",
    "express": "^4.18.1",
    "http-errors": "^2.0.0",
    "mongodb": "^4.6.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.16"
  }
```
ver: https://www.npmjs.com/package/nodemon
* excel4node: Una biblioteca de generación de archivos xlsx con todas las funciones que permite la creación de archivos de Excel avanzados.
* dotenv: Módulo de dependencia cero que carga variables de entorno desde un archivo .env en process.env.
* http-errors: Cree errores HTTP para Express, Koa, Connect, etc. con facilidad.
* debug: Realizar seguimiento a compilación.
* express: Framework web minimalista, rápido y sin opiniones para node.
* mongodb: El controlador oficial de MongoDB para Node.js.
* nodemon: Herramienta que ayuda a desarrollar aplicaciones basadas en Node.js al reiniciar automáticamente la aplicación del nodo cuando se detectan cambios en los archivos del directorio.
