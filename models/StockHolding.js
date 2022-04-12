const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stocksSchema = new Schema({
    name: {type: String, required: false},
    username: {type: String, required: false},
    purchaseLog: {type: String, required: false},
});

const stockHoldings = mongoose.model("stock-holdings", stocksSchema);

module.exports = stockHoldings;
