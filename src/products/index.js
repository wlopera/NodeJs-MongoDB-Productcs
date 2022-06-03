const express = require("express");
const { ProductsController } = require("./controller");

const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts) //http"//localhost:3000/api/products/
    .get("/report", ProductsController.generateReport) //http"//localhost:3000/api/report/
    .get("/:id", ProductsController.getProduct) //http"//localhost:3000/api/products/25
    .post("/", ProductsController.createProduct) //http"//localhost:3000/api/products/
    .put("/:id", ProductsController.updateProduct) //http"//localhost:3000/api/products/
    .delete("/:id", ProductsController.deleteProduct); //http"//localhost:3000/api/products/25

  app.use("/api/products", router);
};
