const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://Admin:jQI4i32WDsLeYqhJ@cluster0.rqwdlhs.mongodb.net/groupomania?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Failed to connect to MongoDB"));
