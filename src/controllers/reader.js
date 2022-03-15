const { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItemById,
  deleteItemById, 
} = require('./helpers');

const createReader = (req, res) => createItem(res, 'reader', req.body);
const readReaders = (_, res) => getAllItems(res, 'reader');
const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);
const updateReader = (req, res) => updateItemById(res, 'reader', req.body, req.params.id);
const deleteReader = (req, res) => deleteItemById(res, 'reader', req.params.id);

module.exports = { 
  createReader, 
  readReaders, 
  getReaderById, 
  updateReader, 
  deleteReader 
};