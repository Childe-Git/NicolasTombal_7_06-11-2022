const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

exports.authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        console.log("decoded token: " + decodedToken.userId);
        let user = await UserModel.findById(decodedToken.userId);
        res.locals.user = user;
        console.log("==== Connected user ====", res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.status(403).send({ message: "Unauthorized" });
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
