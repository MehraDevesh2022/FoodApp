const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const planRouter = require("./routes/planRoutes");

// userModel with userSchema && and DataBase  Connection
const userModel = require("./Model/userModel");
// npm install cookie-parser ( used for json web token )
const cookiePraser = require("cookie-parser");

const { model } = require("mongoose");
app.use(express.json());
app.use(cookiePraser());
// for authentiction routes like login signup.
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);


app.use(function(req , res){
  res.send("<h1>Backend API</h1>")
});

// creating a server at port number 3000 || heroku process.env.PORT (if server provided heroku then it will used process.env.PORT else loacly 3000)
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`This is from Port ${port}`);
});
