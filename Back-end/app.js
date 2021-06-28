const express = require('express');
const app = express();
const userRouter = require("./routers/users");
const cardRouter = require("./routers/cards");
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/loggers'); 
const { login, createUser } = require('./controllers/userController')
const cors = require('cors')
const auth = require('./middleware/auth');
const helmet = require("helmet");
const {celebrate} = require('celebrate');
const Joi = require('joi'); 
const NotFoundError = require("./middleware/errors/NotFoundError");



//const helmet = require('helmet');


// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// listen to port 3000
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public' )))

app.use(requestLogger); // enabling the request logger
app.use(cors());
app.use(helmet());

// followed by all route handlers

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).pattern(new RegExp('^[a-zA-Z-\\s]*$')),
      about: Joi.string().min(2).max(30),
      avatar: JJoi.string().required().custom((v) => {
        if (validator.isURL){
          return v;
        }
        else {
          throw new Error("invalid link")
        }
      }),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).alphanum().required(),
    }),
  }),
  createUser
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.use(auth)
app.use('/users', userRouter);
app.post('/cards', cardRouter); 

app.use(errors());

app.get('*', (req, res) => {
  throw new NotFoundError('Requested resource not found.')
})

app.use(errorLogger);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
    console.log(`App listening at port ${PORT}`)
})
// app.use((req, res, next) => {
//   req.user = {
//     _id: '605f55becb5770042f7908f3' // paste the _id of the test user created in the previous step//
//   };

//   next();
// });
// centralized error handler
app.use((err, req, res, next) => {
    // if an error has no status, display 500
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({
        // check the status and display a message based on it
        message: statusCode === 500
          ? 'An error occurred on the server'
          : message
      });
}); 