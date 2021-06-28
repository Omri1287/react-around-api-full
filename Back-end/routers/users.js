const express = require('express');
const router = express.Router();
const userRouter = express.Router();
const {celebrate} = require('celebrate');
const validator = require("validator");
const Joi = require('joi'); 

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
    avatar: Joi.string().required().custom((v) => {
      if (validator.isURL){
        return v;
      }
      else {
        throw new Error("invalid link")
      }
    }),
  })
}), updateAvatar);

userRouter.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}),  getOneUser);
userRouter.post('/', createUser);

module.exports = userRouter;