const express = require('express');
const app = express();
//const path = require('path')
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/loggers'); 


//const helmet = require('helmet');


// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const usersRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')


// listen to port 3000
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public' )))

app.use(requestLogger); // enabling the request logger

// followed by all route handlers
app.post('/signup', createUser);
app.post('/signin', login);
app.use('/users', usersRouter);
app.post('/posts', postsRouter); 

app.use(errors());

app.get('*', (req, res) => {
  res.status(404).send({ message: "Page not found" });
})


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