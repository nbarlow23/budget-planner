const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");

const User = users.model;

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  date: String,
  amount: String,
  category: String,
  description: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  title: String,
  description: String
});

const Category = mongoose.model("Category", categorySchema);

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  date: String,
  amount: String,
  category: String,
  description: String
});

const Income = mongoose.model("Income", incomeSchema);

/* Rest API*/
router.get("/transactions", auth.verifyToken, User.verify, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user
    });
    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post(
  // eslint-disable-next-line prettier/prettier
  "/transactions", auth.verifyToken, User.verify, async (req, res) => {
    const transaction = new Transaction({
      user: req.user,
      date: req.body.date,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description
    });
    try {
      await transaction.save();
      res.send(transaction);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.put("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id
    });
    transaction.date = req.body.date;
    transaction.amount = req.body.amount;
    transaction.description = req.body.description;
    transaction.category = req.body.category;
    transaction.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/transactions/:id", async (req, res) => {
  try {
    await Transaction.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/categories", auth.verifyToken, User.verify, async (req, res) => {
  try {
    const categories = await Category.find({
      user: req.user
    });
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/categories", auth.verifyToken, User.verify, async (req, res) => {
  const category = new Category({
    user: req.user,
    title: req.body.title,
    description: req.body.description
  });
  try {
    await category.save();
    res.send(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id
    });
    category.title = req.body.title;
    category.description = req.body.description;
    category.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    await Category.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/incomes", auth.verifyToken, User.verify, async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user
    });
    res.send(incomes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/incomes", auth.verifyToken, User.verify, async (req, res) => {
  const income = new Income({
    user: req.user,
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description
  });
  try {
    await income.save();
    res.send(income);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/incomes/:id", async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id
    });
    income.date = req.body.date;
    income.amount = req.body.amount;
    income.category = req.body.category;
    income.description = req.body.description;
    income.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/incomes/:id", async (req, res) => {
  try {
    await Income.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  tModel: Transaction,
  cModel: Category,
  iModel: Income,
  routes: router
};
