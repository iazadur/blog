const crypto = require('crypto');

const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address!']
    },
    email_verified: { type: Boolean, default: false },
    last_login: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

const User = model('User', userSchema);
module.exports = User;
