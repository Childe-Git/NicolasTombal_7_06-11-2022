const mongoose = require("mongoose");

// Connexion à la DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ID}@cluster0.rqwdlhs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Failed to connect to MongoDB"));
