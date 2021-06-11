//const path = require('path')

//const pathtoUsers = path.join(__dirname,'..', 'data', 'users.json')
//const getFilecContent = require('../helpers/getFilecContent')//
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../middleware/errors/NotFoundError");
const BadRequestError = require("../middleware/errors/BadRequestError");
const UnauthorizedError = require('../middleware/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;


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
        if (!user) {
          throw new NotFoundError("This is not the user you are looking for");
        }
        res.status(200).send(user);
      })
      .catch(() =>{
        if (res.status(400)){
          throw new BadRequestError('Invalid User');
        }
  
      })
      .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send({ data: user });
    })
    .catch(next);
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

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Incorrect password or email");
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'development', {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      if(res.status(401))

      throw new UnauthorizedError('Incorrect email or password');
    })

    .catch(next);
};

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
    updateAvatar,
    login,
    getCurrentUser
}
