const ApiFeatures = require('../../services/ApiFeatures');
const Post = require('./posts.mongo');

// async function getAllPosts(queryString) {
//   const features = new ApiFeatures(Post.find(), queryString)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   return await features.query;
// }

async function getAllPosts(queryString) {
  let query = Post.find();

  if (queryString.userId == 'undefined' || queryString.userId == 'null') {

    const posts = await query.populate('author');

    return posts;
  }
  if (queryString.userId) {
    // Fetch posts based on userId
    query = query.where('author').equals(queryString.userId);
  }

  const posts = await query.populate('author');

  return posts;
}

async function getOnePostById(_id) {
  return await Post.findById(_id);
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
