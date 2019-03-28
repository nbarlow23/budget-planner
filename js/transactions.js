const app = new Vue({
    el: '#app',
    data: {
        transactions: [],
        addedDate: '',
        addedAmount: '',
        addedDescription: '',
        addedCategory: '',
        budget: 0,
        editTransactionDate: '',
        editTransactionAmount: '',
        editCategory: '',
        editDescription: '',
        editTransactionId: '',
    },
    created() {
        this.showButton();
        this.getTransactions();
        this.calculateBudget();
    },
    computed: {
        summaryString() {
            const res = this.budgetSummary();
            return 'You are $' + Math.abs(res) + ((res < 0) ? ' over ' : ' under ') + ' budget!';
        },
        totalTransactions() {
            let total = 0;
            this.transactions.forEach(t => {
                total += parseFloat(t.amount);
            });
            return total;
        }
    },
    methods: {

        async getTransactions() {
            try {
                let response = await axios.get('/api/transactions');
                this.transactions = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },

        budgetSummary() {
            let total = 0;
            this.transactions.forEach(t => {
                total += parseFloat(t.amount);
            });
            return (this.budget - total).toFixed(2);
        },

        onClickNewTransaction() {
            this.showForm();
        },

        showForm() {
            let form = document.getElementById('form');
            let btn = document.getElementById('button');
            form.style.display = "block";
            btn.style.display = "none";
        },

        showEditForm() {
            let form = document.getElementById('editForm');
            let btn = document.getElementById('button');
            form.style.display = "block";
            btn.style.display = "none";
        },

        showButton() {
            let form = document.getElementById('form');
            let editForm = document.getElementById('editForm');
            let btn = document.getElementById('button');
            btn.style.display = "block";
            form.style.display = "none";
            editForm.style.display = "none";
        },
        
        async createTransaction() {
            if (this.addedAmount[0] === '$') {
                this.addedAmount = this.addedAmount.substr(1);
            }
            try {
                await axios.post('/api/transactions', {
                    date: this.addedDate,
                    amount: this.addedAmount,
                    description: this.addedDescription,
                    category: this.addedCategory,
                });
                this.addedDate = '';
                this.addedAmount = '';
                this.addedDescription = '';
                this.addedCategory = '';
                this.showButton();
                this.getTransactions();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTransaction(transaction) {
            try {
                let response = await axios.delete('/api/transactions/' + transaction._id);
                this.getTransactions();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async calculateBudget() {
            try {
            let response = await axios.get('/api/incomes');
                let incomes = response.data;
                let totalBudget = 0;
                incomes.forEach(income => {
                    totalBudget += parseFloat(income.amount);
                });
                this.budget = totalBudget;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async updateTransaction() {
            try {
                const response = await axios.put('/api/transactions/' + this.editTransactionId, {
                    date: this.editTransactionDate,
                    amount: this.editTransactionAmount,
                    description: this.editDescription,
                    category: this.editCategory,
                });
                this.getTransactions();
            } catch (error) {
                console.log(error);
            }
        },
        edit(transaction) {
            this.editTransactionDate = transaction.date;
            this.editTransactionAmount = transaction.amount;
            this.editDescription = transaction.description;
            this.editCategory = transaction.category;
            this.editTransactionId = transaction._id;
            this.showEditForm();
        }
    },
});