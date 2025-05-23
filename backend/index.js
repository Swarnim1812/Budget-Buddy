//Hello
// import path from "path";
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');    //Authentican Part
const { connectToMongoDB } = require("./connect");
const cron = require('./utils/scheduler.js')
const userRouter = require("./routes/user");
const userRouterauth = require("./routes/auth");
const trader = require("./routes/trader")    //Authentican Part
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");  //Authentican Part
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const port = 5000;

require("dotenv").config();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://budget-buddy-hoki.onrender.com'],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

connectToMongoDB(process.env.MONGO_URL).then(() =>
  console.log("Mongodb connected.")
);


const _dirname = path.resolve();


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// VERIFY PACKAGE
const nodemailer = require("nodemailer");

const session = require('express-session');


// Set up body parser middleware to parse URL-encoded data


// Set up session middleware
app.use(session({
  secret: 'secret', // Secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));


//Authentican Part

// app.use("/search", restrictToLoggedinUserOnly, userRouter);// user hai
// app.use("/search", userRouter);// user hai
app.use("/user", userRouterauth);// auth
app.use("/trader", trader)
app.use("/forget-password", userRouter);
app.use("/", userRouter);


app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get('*',(req,res) =>{
  res.sendFile(path.resolve(_dirname,"frontend","build","index.html"));
});
// NODEMAILER

// Route to handle OTP verification
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//Start scheduled task of fetching price and sending email  
cron.start();



// app.get('/authorized', (req, res) => {
//   const uid = req.cookies.uid;
//   if(uid) {
//     return res.status(200).json({
//       status: 'success',
//       message: 'Authorizeddddddd',
//       uid: uid
//     });
//   }
//   else {
//     return res.status(401);
//   }
// })
