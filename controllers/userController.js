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
            password: bcrypt.hashSync("88888", saltRounds),
        },
        {
            username: "Ivan Leong",
            email:"hi345@gmail.com",
            password: bcrypt.hashSync("88888", saltRounds),
        },
        {
            username: "Simon",
            email:"hi456@gmail.com",
            password: bcrypt.hashSync("88888", saltRounds),
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



// //* login route
// router.post("/login", async (req, res) => {
//     const { username, password} = req.body;
//     // const hashPassword = bcrypt.hashSync(password, saltRounds);
//     const user = await User.findOne({ username });

//     if (!user) {
//         res.send("User not found");
//     } else if (bcrypt.compareSync(password, user.password)) {
//       req.session.user = user;
//       req.session.count = 1;
//       res.send("Ok");
//     } else {
//       res.send("No")
//     }

//   // res.send(user);
//   //* success or failure
// });


const saltRounds = 10;
//Create route for register
router.post("/register", async (req,res) => {
    const body = req.body
    console.log("body", body)
    try {
        console.log(body)
        const createdUser = await User.create(req.body);
        // const salt = await bcrypt.genSalt(10);
        createdUser.password = await bcrypt.hashSync(createdUser.password, saltRounds)
        createdUser.save().then(()=> res.status(200).send('Success'));
    } catch (error) {
        res.status(400).json({error: error.message});
    };
});



//Create route for login
router.post("/login", async (req,res) => {
    console.log("body",req.body)
    try {
        const findUserName = await User.findOne({"username": req.body.username});//req.body.username
        console.log("findUsername", findUserName);
        if (findUserName) {
            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds)
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(req.body.password, findUserName.password);
            console.log("valid password", validPassword)
            // const validPassword = await bcrypt.compare("TEST", bcrypt.hashSync("TEST",bcrypt.genSaltSync(10)));
            
            if (validPassword) {
              req.session.currentUser = findUserName
              req.session.count = 1;
            //   res.redirect("../portfolio")
              res.status(200).json({ message: "Valid password" });
            } else {
              res.status(400).json({ error: "Invalid Password" });
            }
          } else {
            res.status(401).json({ error: "User does not exist" });
          }

        console.log(findUserName)
    } catch (error) {
        console.log(error)
    }
});

// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.send("logout")
// })


module.exports = router;






// router.get("/secret", (req, res) => {
//     const user = req.session.user;

//     if (user) {
    
//       res.send(user)
//     } else {
//       res.send("no entry")
//     }
// })

// router.get("/secret2", (req, res) => {
//   const count = req.session.count;
//   req.session.count = req.session.count + 1;
//   res.send("count" + count)
// })