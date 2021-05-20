//const path = require('path')

//const pathtoUsers = path.join(__dirname,'..', 'data', 'users.json')
//const getFilecContent = require('../helpers/getFilecContent')//
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



function getUsers(req, res){
    return User.find({})
        .then((users) => {
          res.status(200).send(users);
        })
        .catch()
}

function getOneUser(req, res){
    return User.findById({_id: req.params.id})
      .then((user) => {
        if (user) {
          return res.status(200).send(user);
        }else{
          return res.status(404).send({ message: 'User ID not found' })
        }
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(400).send({message: "This is not the card you are looking for"});
        }
        return res.status(500).send({ message: "Internal Server Error" });
      });
}

function createUser(req,res){
  const { name, about, avatar, email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Please enter a valid email or password");
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      if (!user) {
        throw new BadRequestError("Invalid data");
      }
      res.status(200).send({name: user.name, about: user.about, avatar: user.avatar, email: user.email});
    })

    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).send({message: 'Duplicate User'});
      }
    })
}
function updateUser(req,res){
  const { name, about } = req.body;
  return User.findByIdAndUpdate( req.params.id,
    { name, about },
    { new: true, runValidators: true })
  .then((user) => {
      res.status(200).send(user)})
  .catch((err) => {
    if (err.name === "CastError") {
      return res.status(400).send({message: "This is not the card you are looking for"});
    }
    return res.status(500).send({ message: "Internal Server Error" });
  });
}
function updateAvatar(req,res){
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.params.id,
    { avatar },
    { new: true, runValidators: true } )
  .then((user) => {
      res.status(200).send(user)})
  .catch((err) => {
    if (err.name === "CastError") {
      return res.status(400).send({message: "This is not the card you are looking for"});
    }
    return res.status(500).send({ message: "Internal Server Error" });
  });
}

module.exports = {
    getOneUser,
    getUsers,
    createUser,
    updateUser,
    updateAvatar
}
