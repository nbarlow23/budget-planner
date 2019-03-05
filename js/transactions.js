const app = new Vue({
    el: '#app',
    data: {
        transactions: [
            {
                date: '01/05',
                amount: '$40.00',
                description: 'Maverick Gas',
                category: 'Gas'
            },
            {
                date: '01/06',
                amount: '$700.00',
                description: 'January Rent & Utilities',
                category: 'Rent'
            },
        ],
        addedDate: '',
        addedAmount: '',
        addedDescription: '',
        addedCategory: '',
    },
    created() {
        this.showButton();
    },
    methods: {
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
        },
        deleteTransaction(transaction) {
            var index = this.transactions.indexOf(transaction);
            if (index > -1)
                this.transactions.splice(index, 1);
        }
    },
});