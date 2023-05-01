const newsRoutes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT');
const Users = require("../data/users");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ed4fd8b53a164ab9864d24cd6b2aa8f1');
// const path = require('path');

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());


newsRoutes.get('/', verifyToken,  (req, res) => {
    try{
        if (!req.user && req.message == null) {
            res.status(403).send({
                message: "Invalid JWT token"
            });
        } else if (!req.user && req.message) {
            res.status(403).send({
            message: req.message
            });
        } else{
            var category = user.category.join();
            newsapi.v2.topHeadlines({
                category: category,
                language: 'en',
              }).then(response => {
                res.status(200).send(response);
              }).catch(err => {
                res.status(500).send({status: "error", message: err});
              });
        }
    }
    catch (err){
        res.status(500).send(err);
    }

});

module.exports = newsRoutes;