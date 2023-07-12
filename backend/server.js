const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;


mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

/*
  mongoose.connect is a method that connects to the MongoDB database.
  const connection = mongoose.connection; is a constant that stores the connection.
  connection.once("open", () => { is a method that runs once the connection is open.
    line 21 and 23 is used when base url has /exercises. It calls exerciseRouter
    line 22 and 24 is used when base url has /users. It calls userRouter



*/
