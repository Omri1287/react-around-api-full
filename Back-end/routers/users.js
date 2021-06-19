const express = require('express');
const router = express.Router();
const userRouter = express.Router();
const {celebrate, Joi } = require('celebrate');
const validator = require("validator");

const {getOneUser, getUsers, createUser, getCurrentUser, updateUser, updateAvatar} = require('../controllers/userController')


userRouter.get('/', getUsers);
userRouter.get('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
}), getCurrentUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
    validate: {
      validator: (v) => validator.isURL(v, [{ allow_underscores: true }]),
    },
  }),
}), updateAvatar);

userRouter.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}),  getOneUser);
userRouter.post('/', createUser);



module.exports = userRouter;