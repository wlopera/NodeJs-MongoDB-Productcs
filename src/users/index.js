const express = require("express");
const { UsersController } = require("./controller");

const router = express.Router();

module.exports.UsersAPI = (app) => {
  router
    .get("/", UsersController.getUsers) //http"//localhost:3000/api/users/
    .get("/:id", UsersController.getUser) //http"//localhost:3000/api/users/25
    .post("/", UsersController.createUser) //http"//localhost:3000/api/users/
    .put("/:id", UsersController.updateUser) //http"//localhost:3000/api/users/
    .delete("/:id", UsersController.deleteUser); //http"//localhost:3000/api/users/25

  app.use("/api/users", router);
};
