const {
  getAllPosts,
  getOnePostById,
  createPost,
  updatePost,
  deletePost
} = require('../models/posts/post.model');
const AppError = require('../services/AppError');

async function httpGetAllPosts(req, res, next) {
  const posts = await getAllPosts(req.query);
  return res
    .status(200)
    .json({ status: 'success', results: posts.length, data: { posts } });
}

async function httpCreatePost(req, res, next) {
  req.body.isVerified = true;
  // This time Admin is creating a new post so give whole body because admin can create another admin.
  const post = await createPost(req.body);
  return res.status(201).json({ status: 'success', data: { post } });
}

async function httpGetOnePost(req, res, next) {
  const post = await getOnePostById(req.params._id);

  if (!post) {
    return next(new AppError('Post not found!', 404));
  }

  post.password = undefined;
  return res.status(200).json({ status: 'success', data: { post } });
}

async function httpUpdatePost(req, res, next) {
  const post = await updatePost(req.params._id, req.body);
  if (!post) {
    return next(new AppError('Post not found!', 404));
  }
  return res.status(200).json({ status: 'success', data: post });
}

async function httpDeletePost(req, res, next) {
  const post = await deletePost(req.params._id);
  if (!post) {
    return next(new AppError('Post not found!', 404));
  }
  return res.status(204).json({ status: 'success', data: null });
}

module.exports = {
  httpGetAllPosts,
  httpGetOnePost,
  httpUpdatePost,
  httpDeletePost,
  httpCreatePost
};
