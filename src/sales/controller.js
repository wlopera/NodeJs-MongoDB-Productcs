const { SalesService } = require("./services");
const { UsersService } = require("../users/services");
const { ProductsService } = require("../products/services");

const debug = require("debug")("app:module-sales-controller");
const { Response } = require("../common/response");
const CreateError = require("http-errors");

const getSales = async (req, res) => {
  try {
    const sales = await SalesService.getAll();
    Response.success(res, 200, "Listado de ventas", sales);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const getSale = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const sale = await SalesService.getById(id);
    if (sale) {
      Response.success(res, 200, `Venta ${id}`, sale);
    } else {
      Response.error(res, new CreateError.NotFound());
    }
  } catch (error) {
    console.log(error);
    Response.error(res);
  }
};

const createSale = async (req, res) => {
  try {
    const { body } = req;
    const { idUser, idProduct } = body;

    const product = await ProductsService.getById(idProduct);

    if (product) {
      if (product.amount > body.quantity) {
        const user = await UsersService.getById(idUser);
        if (user) {
          if (!body || Object.keys(body).length === 0) {
            Response.error(res, new CreateError(404, "Usuario no encontrado"));
          } else {
            const insertedId = await SalesService.create(body);
            Response.success(res, 201, "Venta agregada", insertedId);
          }
        } else {
          Response.error(res, new CreateError(404, "Usuario no encontrado"));
        }
      } else {
        Response.error(
          res,
          new CreateError(
            409,
            `No existe la cantidad del producto solicitada en el álmacen ${body.quantity}/${product.amount}`
          )
        );
      }
    } else {
      Response.error(res, new CreateError(404, "Producto no encontrado"));
    }

    console.log(111, product);
    //console.log(222, user);
    // console.log(3333, idProduct, idUser);
  } catch (error) {
    debug("Error inesperado: ", error);
    Response.error(res);
  }
};

const updateSale = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      Response.error(res, new CreateError.BadRequest());
    } else {
      const modifiedCount = await SalesService.update(id, body);
      if (modifiedCount === 1) {
        Response.success(res, 200, `Venta ${id} modificada`);
      } else {
        Response.error(res, new CreateError.NotFound());
      }
    }
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const deleteSale = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await SalesService.delete(id);
    if (result === 1) {
      Response.success(res, 200, `Venta ${id} borrada`);
    } else {
      Response.error(res, new CreateError.NotFound());
    }
  } catch (error) {
    console.log(error);
    Response.error(res);
  }
};

module.exports.SalesController = {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
};
