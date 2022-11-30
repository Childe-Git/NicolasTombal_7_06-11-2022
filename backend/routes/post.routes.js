const router = require("express").Router();
const postController = require("../controllers/post.controllers");
const { authorization, authRole } = require("../middlewares/auth.middlewares");
const multer = require("../middlewares/multer-post.middlewares");

router.post("/", authorization, multer, postController.savePost);

router.get("/", authorization, postController.readAllPost);
router.get("/:id", authorization, postController.findOnePost);

router.put("/:id", authorization, postController.findOneAndUpdate);
router.delete("/:id", authorization, postController.findOneAndDelete);

router.patch("/like-post/:id", authorization, postController.addOneLike);
router.patch("/unlike-post/:id", authorization, postController.deleteOneLike);

router.patch("/comment-post/:id", authorization, postController.saveComment);
router.patch(
  "/edit-comment-post/:id",
  authorization,
  postController.editOneComment
);
router.patch(
  "/delete-comment-post/:id",
  authorization,
  postController.deleteOneComment
);

module.exports = router;
