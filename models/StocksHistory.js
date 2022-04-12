const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    ticker: {type: String, required: false},
    date: {type: Date, required: false},
    price: {type: Number, required: false},
});

const stocksHistory = mongoose.model("stocks-history", historySchema);

module.exports = stocksHistory;

// [{date: '2021-12-20', price: 22}, {date: '2021-12-20', price: 22}]