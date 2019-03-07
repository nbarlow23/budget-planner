const app = new Vue({
    el: '#app',
    data: {
        transactions: [
            {
                date: '01/05',
                amount: '40.00',
                description: 'Maverick Gas',
                category: 'Gas'
            },
            {
                date: '01/06',
                amount: '700.00',
                description: 'January Rent & Utilities',
                category: 'Rent'
            },
        ],
        addedDate: '',
        addedAmount: '',
        addedDescription: '',
        addedCategory: '',
        budget: 1500,
    },
    created() {
        this.showButton();
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
        createTransaction() {
            if (this.addedAmount[0] === '$') {
                this.addedAmount = this.addedAmount.substr(1);
            }
            let transaction = {
                date: this.addedDate,
                amount: this.addedAmount,
                description: this.addedDescription,
                category: this.addedCategory,
            };
            this.addedDate = '';
            this.addedAmount = '';
            this.addedDescription = '';
            this.addedCategory = '';
            this.transactions.push(transaction);
            this.showButton();
        },
        deleteTransaction(transaction) {
            var index = this.transactions.indexOf(transaction);
            if (index > -1)
                this.transactions.splice(index, 1);
        }
    },
});