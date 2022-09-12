const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const planRouter = require("./routes/planRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const bookingRoutes= require("./routes/bookingRoutes");

// userModel with userSchema && and DataBase  Connection
const userModel = require("./Model/userModel");
// npm install cookie-parser ( used for json web token )
const cookiePraser = require("cookie-parser");

const { model } = require("mongoose");
const { response } = require("express");
const cors = require("cors");
app.use(express.json());
app.use(cookiePraser());
app.use(cors());  //used to enable CORS with various options
// for authentiction routes like login signup.
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoutes);

app.post("/" , function(req , res){
  res.end("<h1> This is foodAPP</h1>");
})

// creating a server at port number 3000 || heroku process.env.PORT (if server provided heroku then it will used process.env.PORT else loacly 3000)
const port = process.env.PORT || 3000; 
app.listen(port, function () {
  console.log(`This is from Port ${port}`);
});
