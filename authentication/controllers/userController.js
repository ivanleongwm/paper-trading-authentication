// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const user = require("./models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

// =======================================
//              ROUTES
// =======================================
//New route
router.get("/register/new", (req, res) => {
  res.render("register.ejs");
});


//Create route
router.post("/register", (req,res) => {
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

module.exports = router;