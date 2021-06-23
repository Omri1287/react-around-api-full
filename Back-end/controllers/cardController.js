
//fconst path = require('path')
//const pathtoCards = path.join(__dirname,'..', 'data', 'cards.json')
//const getFilecContent = require('../helpers/getFilecContent')//

const BadRequestError = require('../middleware/errors/BadRequestError');
const NotFoundError = require("../middleware/errors/NotFoundError");
const UnauthorizedError = require('../middleware/errors/UnauthorizedError');
const Card = require("../models/card");



function getCards(req, res){
    Card.find({})
        .then((cards) => {
            res.status(200).send(cards);
        })
        .catch(next)
}

function createCard(req,res, next){
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
  .then((card) => {
    if (!card){
      throw new BadRequestError('Invalid data for creating card');
    }
    res.status(200).send(card)
  })
  .catch(next);
}

function deleteCard(req, res){
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('The requested card was not found');
    }
    if (card.owner !== req.user._id) {
      throw new UnauthorizedError('You are not authorized to delete this card');
    }
    res.send(card);
  })
  .catch(next);
    // .catch((err) => {
    //   if (err.name === "ValidationError") {
    //     return res.status(500).send({ message: "Internal Server Error" });
    //   } else {
    //     return res.status(400).send({message: "This is not the card you are looking for"});
    //   }
    // })

}
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
  .then((card) => {
    if (card) {
      return res.status(200).send(card);
    }
    throw new BadRequestError('This card is already liked' );
  })
  .catch(next)
  // .catch((err) => {
  //   if (err.name === "CastError") {
  //     return res.status(400).send({message: "This is not the card you are looking for"});
  //   }
  //   return res.status(500).send({ message: "Internal Server Error" });
  // });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate( req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true })
  .then((card) => {
    if (card) {
      return res.status(200).send(card);
    }
    throw new BadRequestError('This card is already liked' );
  })
  .catch(next)
  // .catch((err) => {
  //   if (err.name === "CastError") {
  //     return res.status(400).send({message: "This is not the card you are looking for"});
  //   }
  //   return res.status(500).send({ message: "Internal Server Error" });
  // });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard
}