const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");

const COLLECTION = "sales";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const create = async (sale) => {
  const collection = await Database(COLLECTION);
  const result = await collection.insertOne(sale);
  return result.insertedId;
};

const update = async (id, sale) => {
  const collection = await Database(COLLECTION);

  // Crear filtro de actualizacion
  const filter = { _id: ObjectId(id) };

  // Crear documento a actualizar
  const updateDoc = {
    $set: sale,
  };

  // Instrucion por si no existe el registro, se crea uno nuevo
  const options = { upsert: true };

  const result = await collection.updateOne(filter, updateDoc, options);

  return result.modifiedCount;
};

const deleteSale = async (id) => {
  const collection = await Database(COLLECTION);
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  return result.deletedCount;
};

module.exports.SalesService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteSale,
};
