const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: {type: String, required: false},
    username: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
    cfmPassword : {type: String, required: false},
    // dob: {type: Date, default: Date.now, required: false},
    // gender: {type: String, required: false},
    // risk: {type: String, required: false},
    // amount: {type: String, required: false},
    // newToTrading: {type: String, required: false },
});

const accountDetails = mongoose.model("account-details", accountSchema);

module.exports = accountDetails;