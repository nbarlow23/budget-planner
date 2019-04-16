const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static("./"));

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/budget-tracker", {
  useNewUrlParser: true
});

const transactionSchema = new mongoose.Schema({
  date: String,
  amount: String,
  category: String,
  description: String
});
const categorySchema = new mongoose.Schema({
  title: String,
  description: String
});
const incomeSchema = new mongoose.Schema({
  date: String,
  amount: String,
  category: String,
  description: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const Category = mongoose.model("Category", categorySchema);
const Income = mongoose.model("Income", incomeSchema);

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get("/api/incomes", async (req, res) => {
  try {
    const incomes = await Income.find();
    res.send(incomes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/categories", async (req, res) => {
  const category = new Category({
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

app.post("/api/transactions", async (req, res) => {
  const transaction = new Transaction({
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
});

app.post("/api/incomes", async (req, res) => {
  const income = new Income({
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

app.delete("/api/categories/:id", async (req, res) => {
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

app.delete("/api/transactions/:id", async (req, res) => {
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

app.delete("/api/incomes/:id", async (req, res) => {
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

app.put("/api/categories/:id", async (req, res) => {
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

app.put("/api/transactions/:id", async (req, res) => {
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

app.put("/api/incomes/:id", async (req, res) => {
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

app.listen(3000, () => console.log("Server listening on 3000"));
