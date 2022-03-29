const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cfmPassword : {type: String, required: true},
    dob: {type: Date, required: true},
    gender: {type: Boolean, required: true},
    risk: {type: Boolean, required: true},
    amount: {type: String, required: true},
    newToTrading: {type: Boolean, required: true},
});

const user = mongoose.model("user", userSchema);

module.exports = user;