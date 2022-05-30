const express = require("express");
const debug = require("debug")("app:main");
const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");

const app = express();

// Recibir parametros en el request
app.use(express.json());

// modulos
ProductsAPI(app);

app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
