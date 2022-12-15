const UserModel = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getAllUsers = (req, res, next) => {
  // Affiche tous les users sans le password
  UserModel.find()
    .select("-password")
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(404).send(err));
};

exports.getOneUser = (req, res, next) => {
  // Si l'id est valide alors affiche l'user
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    UserModel.findById({ _id: req.params.id })
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(404).send(err));
  }
};

exports.findOneAndUpdate = (req, res, next) => {
  // Si l'id est valide alors permet de modifié la bio de l'user
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { bio: req.body.bio },
      },
      { new: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  }
};

exports.findOneAndDelete = (req, res, next) => {
  // Si l'id est valide alors permet de supprimer l'user et fait expirer son token
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    UserModel.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.cookie("access_token", "", { maxAge: 1 });
        res.status(200).send({ message: "Utilisateur supprimé" });
      })
      .catch((err) => res.status(404).send(err));
  }
};
