const User = require('../models/User.model');

module.exports.getAll = () => User.find({});
module.exports.getById = (id) => User.findById(id);
module.exports.findUserByEmail = (email) => User.findOne({ email });
module.exports.create = (data) => User.create(data);
module.exports.updateById = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });
module.exports.deleteById = (id) => User.findByIdAndDelete(id);
