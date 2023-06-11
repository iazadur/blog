const ApiFeatures = require('../../services/ApiFeatures');
const Post = require('./posts.mongo');

async function getAllPosts(queryString) {
  const features = new ApiFeatures(Post.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
}
async function getOnePostById(_id) {
  return await Post.findById(_id).select('+password');
}

async function createPost(currentPost) {
  return await Post.create(currentPost);
}

async function updatePost(_id, currentUpdate) {
  return await Post.findByIdAndUpdate(_id, currentUpdate, {
    new: true,
    runValidators: true
  });
}

async function deletePost(_id) {
  return await Post.findByIdAndDelete(_id);
}

module.exports = {
  getAllPosts,
  updatePost,
  deletePost,
  createPost,
  getOnePostById
};
