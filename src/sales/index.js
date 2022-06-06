const express = require("express");
const { SalesController } = require("./controller");

const router = express.Router();

module.exports.SalesAPI = (app) => {
  router
    .get("/", SalesController.getSales) //http"//localhost:3000/api/sales/
    .get("/:id", SalesController.getSale) //http"//localhost:3000/api/sales/25
    .post("/", SalesController.createSale) //http"//localhost:3000/api/sales/
    .put("/:id", SalesController.updateSale) //http"//localhost:3000/api/sales/
    .delete("/:id", SalesController.deleteSale); //http"//localhost:3000/api/sales/25

  app.use("/api/sales", router);
};
