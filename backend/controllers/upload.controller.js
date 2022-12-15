const UserModel = require("../models/User");

exports.uploadProfil = (req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.body.userId,
    {
      $set: { picture: `./uploads/profil/${req.file.filename}` },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: err }));
};
