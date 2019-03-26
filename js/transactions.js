const app = new Vue({
    el: '#app',
    data: {
        transactions: [],
        addedDate: '',
        addedAmount: '',
        addedDescription: '',
        addedCategory: '',
        budget: 1500,
    },
    created() {
        this.showButton();
        this.getTransactions();
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
        showButton() {
            let form = document.getElementById('form');
            let btn = document.getElementById('button');
            btn.style.display = "block";
            form.style.display = "none";
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
            var index = this.transactions.indexOf(transaction);
            if (index > -1)
                this.transactions.splice(index, 1);
        }
    },
});