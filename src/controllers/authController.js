var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Users = require("../data/users");
var signup = (req, res) => {
    var result = Users.addUser(req.body.email, bcrypt.hashSync(req.body.password, 8));
    if(result == 'User added successfully'){
        res.status(200)
      .send({
          message: "User Registered successfully"
        });
    }
    else{
        res.status(500)
      .send({
        message: result
      });
      return;
    }
  };
  
  var signin = (req, res) => {
    var user = Users.getUser(req.body.email);
    if(user.startsWith("Error")){
        res.status(500)
            .send({
              message: user
            });
          return;
    }
    else if (!user) {
        return res.status(404)
        .send({
            message: "User Not found."
        });
    }
    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
        return res.status(401)
        .send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    //signing token with user id
    var token = jwt.sign({
        email: user.email
    }, process.env.API_SECRET, {
        expiresIn: 86400
    });
    //responding to client request with user profile success message and  access token .
    res.status(200)
        .send({
        user: {
            id: user._id,
            email: user.email,
        },
        message: "Login successful",
        accessToken: token,
        });
    };
  
  module.exports = {signin, signup};