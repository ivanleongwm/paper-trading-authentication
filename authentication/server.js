const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const user = require("./models/users");

const app = express();
const PORT = 4000;
// const users = [];

app.get("/", (req, res) => {
  res.send("Hello");
});

//New route
app.get("/register/new", (req, res) => {
  res.render("register.ejs");
});


//Create route
app.post("/register", (req,res) => {
    const save = async () => {
        await users.create(req.body)
    }
    save();

    const users = new users(req.body)
    users.save();
    res.redirect("/")

    // res.send(req.body);
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
