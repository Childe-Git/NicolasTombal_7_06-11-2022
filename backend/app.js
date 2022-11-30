const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const {
  authorization,
  requireAuth,
} = require("./middlewares/auth.middlewares");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
  exposedHeaders: ["Authorization"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/access_token", authorization, requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
