const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const pick = require('object.pick');
const omit = require('object.omit');
const config = require('../config/config');

async function hashPasswordAsync(rounds, s) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, function (err, salt) {
      if (err) return reject(err);
      bcrypt.hash(s, salt, function (err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}

async function comparePasswordAsync(s, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(s, hash, function (err, success) {
      if (err) return reject(err);
      return resolve(success);
    });
  });
}

module.exports.isAuthenticated = async function isAuthenticated(
  req,
  res,
  next
) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken.startsWith('Bearer '))
      return res.status(401).json({ message: 'Something went wrong' });
    const token = bearerToken.split(' ')[1];
    const user = (await jwt.verify(token, config.secretKey)).data;
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const foundUser = await userService.findUserByEmail(email);
    if (!foundUser) {
      return res.status(404).json({
        error: false,
        data: null,
        token: null,
        message: `There's no account associated with this email. Try another email or create a new account.`,
      });
    }
    const foundMatch = await comparePasswordAsync(password, foundUser.password);
    if (!foundMatch) {
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: 'The password you entered is incorrect. Please try again.',
      });
    }
    const user = omit(JSON.parse(JSON.stringify(foundUser)), [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    const token = await jwt.sign({ data: user }, config.secretKey, {
      expiresIn: '24h',
    });
    return res
      .status(200)
      .json({ error: false, data: null, token, message: 'Success!' });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: null,
      token: null,
      message: 'Error!',
    });
  }
};

module.exports.register = async function (req, res, next) {
  try {
    const { name, phone, email, password } = req.body;
    const foundUser = await userService.findUserByEmail(email);
    if (foundUser)
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: 'Someone already has that email. Try another?',
      });
    const hash = await hashPasswordAsync(10, password);
    const createUser = {
      name,
      phone,
      email,
      password: hash,
    };

    const createdUser = await userService.create(createUser);
    const user = omit(JSON.parse(JSON.stringify(createdUser)), [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    const token = await jwt.sign({ data: user }, config.secretKey, {
      expiresIn: '24h',
    });
    return res
      .status(200)
      .json({ error: false, data: null, token, message: 'Success!' });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: null,
      token: null,
      message: 'Error!',
    });
  }
};
