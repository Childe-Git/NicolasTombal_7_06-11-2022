const router = require("express").Router();
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controllers");
const uploadController = require("../controllers/upload.controller");
const { authorization } = require("../middlewares/auth.middlewares");
const multer = require("../middlewares/multer-profil.middlewares");
// Auth routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// User routes
router.get("/", userController.getAllUsers);
router.get("/:id", authorization, userController.getOneUser);
router.put("/:id", authorization, userController.findOneAndUpdate);
router.delete("/:id", authorization, userController.findOneAndDelete);

router.post("/upload", multer, uploadController.uploadProfil);

module.exports = router;
