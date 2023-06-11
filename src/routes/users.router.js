const { Router } = require('express');

const { httpSignupUser } = require('../controllers/auth.controller');
const {
  httpUpdateMe,
  httpDeleteMe,
  httpGetAllUsers,
  httpGetOneUser,
  httpUpdateUser,
  httpDeleteUser
} = require('../controllers/users.controller');
const catchAsync = require('../services/catchAsync');

const router = Router();

// Not RestFul for all users
router.route('/signup').post(catchAsync(httpSignupUser));

router.route('/updateMe').patch(catchAsync(httpUpdateMe));
router.route('/deleteMe').delete(catchAsync(httpDeleteMe));

// RestFul routes may only used by administration
router.route('/').get(catchAsync(httpGetAllUsers));
router
  .route('/:_id')
  .get(catchAsync(httpGetOneUser))
  .patch(catchAsync(httpUpdateUser))
  .delete(catchAsync(httpDeleteUser));

module.exports = router;
