const { ProductsService } = require("./services");
const debug = require("debug")("app:module-products-controller");
const { Response } = require("../common/response");
const CreateError = require("http-errors");

const getProducts = async (req, res) => {
  try {
    const products = await ProductsService.getAll();
    Response.success(res, 200, "Lista de productos", products);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

const getProduct = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const product = await ProductsService.getById(id);
    if (product) {
      Response.success(res, 200, `Producto ${id}`, product);
    } else {
      Response.error(res, new CreateError.NotFound());
    }
  } catch (error) {
    Response.error(res);
  }
};

const createProduct = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      Response.error(res, new CreateError.BadRequest());
    } else {
      const insertedId = await ProductsService.create(body);
      Response.success(res, 201, "Producto agregado", insertedId);
    }
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};

module.exports.ProductsController = {
  getProducts,
  getProduct,
  createProduct,
};
