const express = require('express');
const {celebrate} = require('celebrate');
const router = express.Router();
const cardRouter = express.Router();
const validator = require("validator");
const Joi = require('joi'); 

const {getCards} = require('../controllers/cardController')
const {deleteCard} = require('../controllers/cardController')
const {createCard} = require('../controllers/cardController')
const {likeCard} = require('../controllers/cardController')
const {dislikeCard} = require('../controllers/cardController')


cardRouter.get('/', getCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((v) => {
      if (validator.isURL){
        return v;
      }
      else {
        throw new Error("invalid link")
      }
    }),
  }),
}), createCard);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);
cardRouter.put('/:cardId/likes',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);
cardRouter.delete('/:cardId/likes',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
//