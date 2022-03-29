// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const log = require("debug")("paper-trading:server")
console.log(process.env.PORT)
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const user = require("./models/users");

const app = express();
const PORT = process.env.PORT ?? 4000;
// const users = [];
const mongoURI = process.env.MONGO_URI;
// const db = mongoose.connection;
mongoose.connect(mongoURI, {}, () => {
    console.log("Connected~")
})

app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.send("Hello");
});

// =======================================
//              ROUTES
// =======================================
//New route
app.get("/register/new", (req, res) => {
  res.render("register.ejs");
});


//Create route
app.post("/register", (req,res) => {
    const save = async () => {
        await user.create(req.body)
    }
    save();
console.log(req.body)
// console.log(req)
    // const newUser = new user(req.body)
    // newUser.save();
    // res.redirect("/")
    res.send(req.body);
})

// app.post("/", (req, res) => {
//   console.log(req.body);
//   users.push(req.body);
//   res.redirect("/");
// });


// //Show route
// app.get("/register/:login", (req, res) => {
//     const login = req.params.login;
//     const register = register[login];
//     res.render("login.ejs", {login});
// })

// //* Create
// app.post("/login", (req, res) => {
//   // if (req.body.readyToEat === "on") {
//   //   // if checked, req.body.readyToEat is set to 'on'
//   //   req.body.readyToEat = true;
//   // } else {
//   //   // if not checked, req.body.readyToEat is undefined
//   //   req.body.readyToEat = false;
//   // }
//   user.push(req.body);
//   res.redirect("/login");
// });

app.listen(PORT, () => {
  console.log("I am listening");
});
