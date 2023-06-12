const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Post must have a title!']
    },
    body: {
      type: String,
      required: [true, 'Please provide post body!']
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate("author")
  next();
});

const Post = model('Post', postSchema);
module.exports = Post;
