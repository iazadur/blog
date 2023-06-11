const { Router } = require('express');
const catchAsync = require('../services/catchAsync');
const {
  httpGetAllPosts,
  httpCreatePost,
  httpGetOnePost,
  httpUpdatePost,
  httpDeletePost
} = require('../controllers/post.controller');

const router = Router();

router
  .route('/')
  .get(catchAsync(httpGetAllPosts))
  .post(catchAsync(httpCreatePost));
router
  .route('/:_id')
  .get(catchAsync(httpGetOnePost))
  .patch(catchAsync(httpUpdatePost))
  .delete(catchAsync(httpDeletePost));

module.exports = router;
