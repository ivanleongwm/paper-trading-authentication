// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const session = require("express-session");
const { find, create } = require("../models/Users");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const router = express.Router();

router.get("/seed", async (req, res) => {
    const userDetails = [
        {
            username: "Joy Kwok",
            email:"hi123@gmail.com",
            password:"12345"
        },
        {
            username: "Ivan Leong",
            email:"hi345@gmail.com",
            password:"12345"
        },
        {
            username: "Simon",
            email:"hi456@gmail.com",
            password:"123"
        }
    ]
    await User.deleteMany({})
    await User.insertMany(userDetails)
    res.json(userDetails)
})

// =======================================
//              ROUTES
// =======================================
//Index route
router.get("/", (req, res) => {
    User.find()
        .then(userDetails => {
            res.json(userDetails)
        })
        .catch(err => {
            res.json(err)
        })
});



//Create route for register
router.post("/register", async (req,res) => {
    const body = req.body
    console.log("body", body)
    try {
        console.log(body)
        const createdUser = await User.create(req.body);
        const salt = await bcrypt.genSalt(10);
        createdUser.password = await bcrypt.hash(createdUser.password, salt)
        createdUser.save().then(()=> res.status(200).send('Success'));
    } catch (error) {
        res.status(400).json({error: error.message});
    };
});


//Create route for login
router.post("/login", async (req,res) => {
    console.log("body",req.body)
    try {
        const findUserName = await User.find({username: req.body.username});
        if (findUserName) {
            // check user password with hashed password stored in the database
            //const validPassword = await bcrypt.compare(req.body.password, findUserName.password);
            const validPassword = await bcrypt.compare("TEST", bcrypt.hashSync("TEST",bcrypt.genSaltSync(10)));
            
            if (validPassword) {
              req.session.currentUser = findUserName
              res.status(200).json({ message: "Valid password" });
            } else {
              res.status(400).json({ error: "Invalid Password" });
            }
          } else {
            res.status(401).json({ error: "User does not exist" });
          }

        console.log(findUserName)
        console.log(validPassword)
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;