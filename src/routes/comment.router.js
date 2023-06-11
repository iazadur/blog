const { Router } = require('express');
const catchAsync = require('../services/catchAsync');
const {
  httpGetAllComments,
  httpCreateComment,
  httpGetOneComment,
  httpUpdateComment,
  httpDeleteComment
} = require('../controllers/comment.controller');

const router = Router();

router
  .route('/')
  .get(catchAsync(httpGetAllComments))
  .post(catchAsync(httpCreateComment));
router
  .route('/:_id')
  .get(catchAsync(httpGetOneComment))
  .patch(catchAsync(httpUpdateComment))
  .delete(catchAsync(httpDeleteComment));

module.exports = router;
