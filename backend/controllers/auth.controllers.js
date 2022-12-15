const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../utils/errors.utils.js");

exports.signUp = (req, res, next) => {
  // hash le mdp 10 x avec Bcrypt
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new UserModel({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin,
      });
      // Enregistre l'utilisateur dans la DB
      user
        .save()
        .then((data) => res.status(201).send(data))
        .catch((err) => {
          const errors = signUpErrors(err);
          return res.status(400).send(errors);
        });
    })
    .catch((err) => res.status(500).send(err));
};

exports.signIn = (req, res, next) => {
  // Trouve l'utilisateur grâce à son Email
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Adresse mail introuvable" });
      } else {
        // Si celui-ci est trouvé, compare le mdp hasher avec le mot de passe reçu
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(400)
                .send({ message: "Mot de passe incorrect" });
            } else {
              // Si valide, alors créé un token
              const maxAge = 3 * 24 * 60 * 1000;
              const token = jwt.sign(
                { userId: user._id },
                `${process.env.SECRET_TOKEN}`,
                {
                  expiresIn: maxAge,
                }
              );
              // Met celui-ci dans le cookie access_token
              res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: maxAge,
              });
              res.status(200).send({ userId: user._id });
            }
          })
          .catch((err) => res.status(400).send(err));
      }
    })
    .catch((err) => res.status(500).send(err));
};

exports.logout = (req, res, next) => {
  // Expire le cookie pour forcer la déconnexion
  res.cookie("access_token", "", { maxAge: 1 });
  res.redirect("/");
};
