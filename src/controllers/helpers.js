const {Book, Reader, Genre, Author } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.`});

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
    author: Author,
  };
  return models[model];
};

const removePassword = (obj) => {
  if (obj.hasOwnProperty('password')) {
    delete obj.password;
  }
  return obj;
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);
  try {
    const newItem = await Model.create(item);
    const itemWithoutPassword = removePassword(newItem.get());
  
    res.status(201).json(itemWithoutPassword);
  } catch (error) {
    const errorMessages = error.errors.map((e) => e.message);

    res.status(400).json({ errors: errorMessages });
  }
};

const getAllItems = async (res, model) => {
  const Model = getModel(model);
  const items = await Model.findAll();
  const itemsWithoutPassword = items.map((item) => {
    return removePassword(item.get());
  });

  res.status(200).json(itemsWithoutPassword);
};

const getItemById = (res, model, id) => {
  const Model = getModel(model);
  return Model.findByPk(id, { includes: Genre }).then((item) => {
    if (!item) {

      res.status(404).json(get404Error(model));
    } 

    res.status(200).json(removePassword(item.dataValues));
  });
};

const updateItemById = async (res, model, item, id) => {
  const Model = getModel(model);
  const [ itemsUpdated ] = await Model.update(item, { where: { id } });
  if (!itemsUpdated) {

    res.status(404).json(get404Error(model));
  }   
  const updatedItem = await Model.findByPk(id);

  res.status(200).json(removePassword(updatedItem.get()));
};

const deleteItemById = async (res, model, id) => {
  const Model = getModel(model);
  const deletedItem = await Model.destroy({ where: { id } });
  if (!deletedItem) {

    res.status(404).json(get404Error(model));
  } 
  
  res.status(204).send();
};

module.exports = {
  createItem, 
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
