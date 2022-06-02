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

## Configurar el proyecto

* node-mongodb-products\.env
```
PORT=3000
```

* node-mongodb-products\src\config\index.js
```
require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,
};
```

* node-mongodb-products\index.js
```diff
...
+ const debug = require("debug")("app:main");
const { Config } = require("./src/config/index");
...

+ app.listen(Config.port, () => {
+  debug(`Servidor escuchando en el puerto ${Config.port}`);
+ });
```

* package.json
```diff
+   "dev": "set DEBUG=app:* & nodemon index.js"
```

## Agregar manejo de errores
* node-mongodb-products\src\common\response.js
```
const CreateError = require("http-errors");

module.exports.Response = {
  success: (res, status = 200, message = "OK", body = {}) => {
    res.status(status).json({ message, body });
  },
  error: (res, error = null) => {
    const { statusCode, message } = error
      ? error
      : new CreateError.InternalServerError();
    res.status(statusCode).json({ message });
  },
};
```

## Actualizar node-mongodb-products\src\products\controller.js

```diff
const createProduct = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
+      Response.error(res, new CreateError.BadRequest());
    } else {
      const insertedId = await ProductsService.create(body);
+      Response.success(res, 201, "Producto agregado", insertedId);
    }
  } catch (error) {
    debug(error);
+    Response.error(res);
  }
};

```
![Captura](https://user-images.githubusercontent.com/7141537/171667834-1d843250-3cfd-4f33-bd33-11bab9952f42.PNG)
![Captura1](https://user-images.githubusercontent.com/7141537/171667828-f0158e35-e1c9-477b-a694-ac88801034d1.PNG)

* Ejemplo de manejo de errores 
![Captura2](https://user-images.githubusercontent.com/7141537/171667831-f02b2acc-730f-4f02-a939-4b1a322aaaf0.PNG)

