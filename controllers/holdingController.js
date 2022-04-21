// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const StockHolding = require("../models/StockHolding");
const router = express.Router();

router.get("/seed", async (req, res) => {
  const stockHolding = [
    {
      username: "Joy Kwok",
      purchaseLog: [
        {
          date: "2021-05-27",
          ticker: "AAPL",
          quantity: 3,
          purchasePrice: 50,
        },
        {
          date: "2021-05-27",
          ticker: "GOOGL",
          quantity: 5,
          purchasePrice: 200,
        },
      ],
      salesLog: [
        {
          date: "2021-06-27",
          ticker: "AAPL",
          quantity: 1,
          purchasePrice: 60,
        },
        {
          date: "2021-06-27",
          ticker: "GOOGL",
          quantity: 5,
          purchasePrice: 500,
        },
      ],
      cashBalance: [
        {
          date: "2021-05-27",
          cash: 8000,
        },
        {
          date: "2021-05-28",
          cash: 8000,
        },
        {
          date: "2021-05-29",
          cash: 8000,
        },
        {
          date: "2021-05-30",
          cash: 8000,
        },
        {
          date: "2021-05-31",
          cash: 8000,
        },
        {
          date: "2021-06-01",
          cash: 8000,
        },
        {
          date: "2021-06-02",
          cash: 8000,
        },
      ],
      stockBalance: [
        {
          ticker: "AAPL",
          quantity: 3,
        },
      ],
    },
    {
      username: "Ivan Leong",
      purchaseLog: [
        {
          date: "2021-05-27",
          ticker: "AMZN",
          quantity: 10,
          purchasePrice: 888,
        },
        {
          date: "2021-05-27",
          ticker: "AAPL",
          quantity: 10,
          purchasePrice: 50,
        },
      ],
      salesLog: [
        {
          date: "2021-06-27",
          ticker: "AMZN",
          quantity: 1,
          purchasePrice: 999,
        },
        {
          date: "2021-06-27",
          ticker: "AAPL",
          quantity: 5,
          purchasePrice: 200,
        },
      ],
      cashBalance: [
        {
          date: "2021-05-27",
          cash: 8000,
        },
        {
          date: "2021-05-28",
          cash: 8000,
        },
        {
          date: "2021-05-29",
          cash: 8000,
        },
        {
          date: "2021-05-30",
          cash: 8000,
        },
        {
          date: "2021-05-31",
          cash: 8000,
        },
        {
          date: "2021-06-01",
          cash: 8000,
        },
        {
          date: "2021-06-02",
          cash: 8000,
        },
      ],
      stockBalance: [
        {
          ticker: "AAPL",
          quantity: 10,
        },
      ],
    },
  ];
  await StockHolding.deleteMany({});
  await StockHolding.insertMany(stockHolding);
  res.json(stockHolding);
});

// =======================================
//              ROUTES
// =======================================
//Index route
router.get("/", (req, res) => {
  StockHolding.find()
    .then((stockHolding) => {
      res.json(stockHolding);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Post route
router.post("/buyStocks", async (req, res) => {
  console.log("body", req.body);
  try {
    const buyStocks = await StockHolding.create(req.body);
    res.status(200).send(buyStocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
