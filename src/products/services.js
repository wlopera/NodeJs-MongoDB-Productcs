const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const { ProductsUtil } = require("../util/util");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  const result = await collection.insertOne(product);
  return result.insertedId;
};

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

const generateReport = async (name, res) => {
  const products = await getAll();
  ProductsUtil.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteProduct,
  generateReport,
};
