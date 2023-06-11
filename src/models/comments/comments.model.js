const ApiFeatures = require('../../services/ApiFeatures');
const Comment = require('./comments.mongo');

async function getAllComments(queryString) {
  const features = new ApiFeatures(Comment.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
}
async function getOneCommentById(_id) {
  return await Comment.findById(_id);
}

async function createComment(currentComment) {
  return await Comment.create(currentComment);
}

async function updateComment(_id, currentUpdate) {
  return await Comment.findByIdAndUpdate(_id, currentUpdate, {
    new: true,
    runValidators: true
  });
}

async function deleteComment(_id) {
  return await Comment.findByIdAndDelete(_id);
}

module.exports = {
  getAllComments,
  updateComment,
  deleteComment,
  createComment,
  getOneCommentById
};
