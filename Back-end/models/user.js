const  mongoose = require('mongoose');
const validator = require('validator');
//for commit reasons

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxlength: 30,
    required: true,
    default:'Jacques Cousteau'
  },
  about: {
    type: String,
    minLength: 2,
    maxlength: 30,
    required: true,
    default:'Explorer'
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => validator.isURL(v, [{ allow_underscores: true }]),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) =>
        validator.isEmail(v, {
          require_tld: true,
          allow_utf8_local_part: false,
        }),
      message: 'field "e-mail" must be a valid e-mail address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);