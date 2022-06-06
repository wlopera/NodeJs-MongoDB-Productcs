const { UsersService } = require("./services");
const debug = require("debug")("app:module-users-controller");
const { Response } = require("../common/response");
const CreateError = require("http-errors");

const getUsers = async (req, res) => {
  try {
    const users = await UsersService.getAll();
    Response.success(res, 200, "Lista de usuarios", users);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const getUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await UsersService.getById(id);
    if (user) {
      Response.success(res, 200, `Usuario ${id}`, user);
    } else {
      Response.error(res, new CreateError.NotFound());
    }
  } catch (error) {
    console.log(error);
    Response.error(res);
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      Response.error(res, new CreateError.BadRequest());
    } else {
      const insertedId = await UsersService.create(body);
      Response.success(res, 201, "Usuario agregado", insertedId);
    }
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      Response.error(res, new CreateError.BadRequest());
    } else {
      const modifiedCount = await UsersService.update(id, body);
      if (modifiedCount === 1) {
        Response.success(res, 200, `Usuario ${id} modificado`);
      } else {
        Response.error(res, new CreateError.NotFound());
      }
    }
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await UsersService.delete(id);
    if (result === 1) {
      Response.success(res, 200, `Usuario ${id} borrado`);
    } else {
      Response.error(res, new CreateError.NotFound());
    }
  } catch (error) {
    console.log(error);
    Response.error(res);
  }
};

module.exports.UsersController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
