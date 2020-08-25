const mongoose = require('mongoose');
const { hash } = require('../services/auth');

/**
 * Validate an email field
 * @param {string} email
 */
const isEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      lowercase: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
      trim: true,
      validate: [isEmail, 'Provide a valid email'],
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true },
);

/**
 * Hash the password before saving it into the database
 * Use ES5 function to access to the "this" context
 */
user.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  try {
    this.password = await hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', user);
