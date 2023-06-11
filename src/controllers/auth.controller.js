const { getOneUserByEmail, saveUser } = require('../models/users/users.model');
const AppError = require('../services/AppError');

async function httpSignupUser(req, res, next) {
  // 1) Check if user already exist
  if (await getOneUserByEmail(req.body.email)) {
    return next(new AppError('User already exist!', 400));
  }

  // Do not give whole body because user might give his role
  const user = await saveUser(req.body);

  return res.status(201).json({ status: 'success', data: { user } });
}

module.exports = {
  httpSignupUser
};
