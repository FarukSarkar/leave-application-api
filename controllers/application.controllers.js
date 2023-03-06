const applicationService = require('../services/application.service');

module.exports.getAll = async function (req, res, next) {
  try {
    const applications = await applicationService
      .getAll()
      .populate({
        path: 'user',
        select: '-_id -password -createdAt -updatedAt',
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.getById = async function (req, res, next) {
  try {
    const application = await applicationService.getById(req.params.id);
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.create = async function (req, res, next) {
  try {
    const application = await applicationService.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.updateById = async function (req, res, next) {
  try {
    const application = await applicationService.updateById(
      req.params.id,
      req.body
    );
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.deleteById = async function (req, res, next) {
  try {
    const application = await applicationService.deleteById(req.params.id);
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
