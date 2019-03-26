const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('./'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/budget-tracker', {
    useNewUrlParser: true
});

const transactionSchema = new mongoose.Schema({
    date: String,
    amount: String,
    category: String,
    description: String,
});
const categorySchema = new mongoose.Schema({
    title: String,
    description: String,
});
const incomeSchema = new mongoose.Schema({
    date: String,
    amount: String,
    category: String,
    description: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const Category = mongoose.model('Category', categorySchema);
const Income = mongoose.model('Income', incomeSchema);

app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.send(transactions);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.get('/api/incomes', async (req, res) => {
    try {
        const incomes = await Income.find();
        res.send(incomes);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/categories', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description, 
    });
    try {
        await category.save();
        res.send(category);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        await Category.deleteOne({
            _id: req.params.id
        })
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/categories/:id', async (req, res) => {
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

app.listen(3000, () => console.log('Server listening on 3000'));