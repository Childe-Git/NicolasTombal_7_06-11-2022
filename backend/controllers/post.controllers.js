const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

exports.savePost = (req, res, next) => {
  const post = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file ? `uploads/posts/${req.file.filename}` : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });
  post
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
};

exports.readAllPost = (req, res, next) => {
  PostModel.find()
    // Affiche les postes par odre de création
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(404).send(err));
};

exports.findOnePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findById({ _id: req.params.id })
      .then((post) => res.status(200).send(post))
      .catch((err) => res.status(404).send(err));
  }
};

exports.findOneAndUpdate = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { message: req.body.message },
      },
      { new: true }
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  }
};

exports.findOneAndDelete = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        // Trouve l'img qui correspond au poste et la supprime
        fs.unlink(`../frontend/public/${post.picture}`, () => {
          PostModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).send(post))
            .catch((err) => res.status(400).send(err));
        });
      })
      .catch((err) => res.status(404).send(err));
  }
};

// Likes controllers

exports.addOneLike = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));

    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      // .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  }
};

exports.deleteOneLike = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    )
      .then(() => res.status(200).send({ message: "Like retiré" }))
      .catch((err) => res.status(400).send(err));

    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      // .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  }
};

// comments controllers

exports.saveComment = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterLastName: req.body.commenterLastName,
            commenterFirstName: req.body.commenterFirstName,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  }
};

exports.editOneComment = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findById({ _id: req.params.id }, (err, data) => {
      const theComment = data.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) {
        return res.status(404).send("Aucun commentaire trouvé");
      } else {
        theComment.text = req.body.text;
      }

      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    });
  }
};

exports.deleteOneComment = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID inconnu :" + req.params.id);
  } else {
    PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then(() => res.status(200).send({ message: "Commentaire retiré" }))
      .catch((err) => res.status(400).send(err));
  }
};
