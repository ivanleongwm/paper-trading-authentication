// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const log = require("debug")("paper-trading:server")
// console.log(process.env.PORT)
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoDBSession = require ('connect-mongodb-session')(session)
const UserController = require("./controllers/userController")
const PurchaseController = require ("./controllers/purchaseController")
const SalesController = require ("./controllers/salesController")
const StocksHistory = require("./controllers/historyController")
const methodOverride = require("method-override");
const session = require("express-session");


const app = express();
const PORT = process.env.PORT ?? 8686;
const mongoURI = process.env.MONGO_URI;
// const db = mongoose.connection;
mongoose.connect(mongoURI, {}, () => {
    console.log("Connected~")
})

const store = new MongoDBSession({
  uri: mongoURI,
  collection: 'mySessions',
})

//Middleware
app.use(morgan("tiny"))
app.use(
  session({
    secret: "secretpassword", //process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false,  // default  more info: https://www.npmjs.com/package/express-session#resave
    store: store
  })
);

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());
app.use("/api/users", UserController);
app.use("/api/purchase", PurchaseController);
app.use("/api/sales", SalesController);
app.use("/api/history", StocksHistory);


app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
    console.log("I am listening");
  });
  

// // =======================================
// //              ROUTES
// // =======================================
// //New route
// app.get("/register/new", (req, res) => {
//   res.render("register.ejs");
// });


// //Create route
// app.post("/register", (req,res) => {
//     const save = async () => {
//         await user.create(req.body)
//     }
//     save();
// console.log(req.body)
// // console.log(req)
//     // const newUser = new user(req.body)
//     // newUser.save();
//     // res.redirect("/")
//     res.send(req.body);
// })

// // app.post("/", (req, res) => {
// //   console.log(req.body);
// //   users.push(req.body);
// //   res.redirect("/");
// // });


// // //Show route
// // app.get("/register/:login", (req, res) => {
// //     const login = req.params.login;
// //     const register = register[login];
// //     res.render("login.ejs", {login});
// // })

// // //* Create
// // app.post("/login", (req, res) => {
// //   // if (req.body.readyToEat === "on") {
// //   //   // if checked, req.body.readyToEat is set to 'on'
// //   //   req.body.readyToEat = true;
// //   // } else {
// //   //   // if not checked, req.body.readyToEat is undefined
// //   //   req.body.readyToEat = false;
// //   // }
// //   user.push(req.body);
// //   res.redirect("/login");
// // });