const { ProductsService } = require("./services");
const debug = require("debug")("app:module-products-controller");

const getProducts = async (req, res) => {
  try {
    const products = await ProductsService.getAll();
    res.json(products);
  } catch (error) {
    debug(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getProduct = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    console.log(id);
    const product = await ProductsService.getById(id);
    res.json(product);
  } catch (error) {}
};

const createProduct = async (req, res) => {
  try {
    const { body } = req;
    const insertedId = await ProductsService.create(body);
    res.json({ message: "Producto creado correctamente.", id: insertedId });
  } catch (error) {
    debug(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports.ProductsController = {
  getProducts,
  getProduct,
  createProduct,
};
