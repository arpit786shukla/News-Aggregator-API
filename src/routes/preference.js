const preferenceRoutes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT');
const Users = require("../data/users");
// const path = require('path');

preferenceRoutes.use(bodyParser.urlencoded({ extended: false }));
preferenceRoutes.use(bodyParser.json());


preferenceRoutes.get('/', verifyToken,  (req, res) => {
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
            res.status(200).send(Users.getCategory(req.user.id));
        }
    }
    catch (err){
        res.status(500).send(err);
    }

});
preferenceRoutes.put('/:preference', verifyToken, (req, res) => {
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
            res.status(200).send({
                message: Users.addCategory(req.user.id,req.params.preference)
            });
        }
    }
    catch (err){
        res.status(500).send(err);
    }

});

module.exports = preferenceRoutes;