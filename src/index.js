const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const {signin, signup} = require("./controllers/authController");
require("dotenv").config();
const newsRoutes = require("./routes/news");
const preferenceRoutes = require("./routes/preference");
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  });

const app = express();
app.use(cors);
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

const PORT = 5000;

routes.get('/', (req, res)=>{
    res.status(200).send("Welcome to the News Aggregator App");
  });
routes.use('/news', newsRoutes);
routes.use('/preference', preferenceRoutes);
routes.post('/signup', signup);

routes.post('/signin', signin);

app.listen(process.env.PORT || PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running and App is listening on port " + process.env.PORT);
  else
      console.log("Error occurred, server can't start", error);
  }
);
