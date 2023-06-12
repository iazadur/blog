const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate("author")
  next();
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;
