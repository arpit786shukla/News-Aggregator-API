const jwt = require("jsonwebtoken");
const User = require("../data/users");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err)  {
        req.user = undefined;
        next();
      }
      User.getUser(decode.email).then(user => {
          req.user = user;
          next();
        }).catch(err => {
          res.status(500)
          .send({
            message: err
          });
        });
    });
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};
module.exports = verifyToken;