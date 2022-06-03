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

## Modificar y borrar producto
* node-mongodb-products\src\products\services.js
```
const update = async (id, product) => {
  const collection = await Database(COLLECTION);

  // Crear filtro de actualizacion
  const filter = { _id: ObjectId(id) };

  // Crear documento a actualizar
  const updateDoc = {
    $set: product,
  };

  // Instrucion por si no existe el registro, se crea uno nuevo
  const options = { upsert: true };

  const result = await collection.updateOne(filter, updateDoc, options);

  return result.modifiedCount;
};

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  return result.deletedCount;
};
```
* node-mongodb-products\src\products\controller.js
```
const updateProduct = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      Response.error(res, new CreateError.BadRequest());
    } else {
      const modifiedCount = await ProductsService.update(id, body);
      if (modifiedCount === 1) {
        Response.success(res, 200, `Producto ${id} modificado`);
      } else {
        Response.error(res, new CreateError.NotFound());
      }
    }
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await ProductsService.delete(id);
    if (result === 1) {
      Response.success(res, 200, `Producto ${id} borrado`);
    } else {
      Response.error(res, new CreateError.NotFound());
    }
  } catch (error) {
    console.log(error);
    Response.error(res);
  }
};
```

## Salida
![Captura](https://user-images.githubusercontent.com/7141537/171965917-76160d33-36e8-4cd0-8ee1-9e75069c5bca.PNG)
![Captura1](https://user-images.githubusercontent.com/7141537/171965919-3b4a7a60-9900-4c6a-8d36-ae74b0aea894.PNG)
![Captura3](https://user-images.githubusercontent.com/7141537/171965911-7ad6fbf1-f894-4474-923b-b50c4a0a8b3b.PNG)

## Generar Reporte
* node-mongodb-products\src\util\util.js
```
const excelGenerator = (products, namefile, res) => {
  const xl = require("excel4node");

  products = products.map((product) => {
    const id = product._id.toString();
    delete product._id;
    return {
      id,
      ...product,
    };
  });

  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Inventario");

  for (let i = 1; i <= products.length; i++) {
    for (let j = 1; j <= Object.values(products[0]).length; j++) {
      if (i === 1) {
        const data = Object.keys(products[i - 1])[j - 1];
        ws.cell(i, j).string(data.toUpperCase());
      }
      const data = Object.values(products[i - 1])[j - 1];
      typeof data === "string"
        ? ws.cell(i + 1, j).string(data)
        : ws.cell(i + 1, j).number(data);
    }
  }

  wb.write(`${namefile}.xlsx`, res);
};

module.exports.ProductsUtil = {
  excelGenerator,
};

```
![Captura4](https://user-images.githubusercontent.com/7141537/171965914-80bfcac5-59d5-458e-84ab-55deb1a18906.PNG)
![Captura5](https://user-images.githubusercontent.com/7141537/171965916-f5b43908-7165-4e4e-81ad-cb4b7650eb86.PNG)
![Captura](https://user-images.githubusercontent.com/7141537/171965974-f60a4720-ff1c-49bc-9194-0e3802e7460e.PNG)

