const {
  getAllComments,
  getOneCommentById,
  createComment,
  updateComment,
  deleteComment
} = require('../models/comments/comments.model');
const AppError = require('../services/AppError');

async function httpGetAllComments(req, res, next) {
  const comments = await getAllComments(req.query);
  return res
    .status(200)
    .json({ status: 'success', results: comments.length, data: { comments } });
}

async function httpCreateComment(req, res, next) {
  req.body.isVerified = true;
  // This time Admin is creating a new comment so give whole body because admin can create another admin.
  const comment = await createComment(req.body);
  return res.status(201).json({ status: 'success', data: { comment } });
}

async function httpGetOneComment(req, res, next) {
  const comment = await getOneCommentById(req.params._id);

  if (!comment) {
    return next(new AppError('Comment not found!', 404));
  }

  comment.password = undefined;
  return res.status(200).json({ status: 'success', data: { comment } });
}

async function httpUpdateComment(req, res, next) {
  const comment = await updateComment(req.params._id, req.body);
  if (!comment) {
    return next(new AppError('Comment not found!', 404));
  }
  return res.status(200).json({ status: 'success', data: comment });
}

async function httpDeleteComment(req, res, next) {
  const comment = await deleteComment(req.params._id);
  if (!comment) {
    return next(new AppError('Comment not found!', 404));
  }
  return res.status(204).json({ status: 'success', data: null });
}

module.exports = {
  httpGetAllComments,
  httpGetOneComment,
  httpUpdateComment,
  httpDeleteComment,
  httpCreateComment
};
