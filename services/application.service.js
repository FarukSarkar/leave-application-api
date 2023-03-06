const Application = require('../models/Application.model');

module.exports.getAll = () => Application.find({});
module.exports.getById = (id) => Application.findById(id);
module.exports.create = (data) => Application.create(data);
module.exports.updateById = (id, data) =>
  Application.findByIdAndUpdate(id, data, { new: true });
module.exports.deleteById = (id) => Application.findByIdAndDelete(id);
