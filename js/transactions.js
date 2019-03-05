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
        this.initTable();
    },
    methods: {
        onClickNewTransaction() {
            console.log('h');
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
        initTable() {
            this.transactions.forEach(transaction => {
                this.addTransaction(transaction);
            });
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
            this.addTransaction(transaction);
        },
        addTransaction(transaction) {
            const body = document.getElementById('tBody');
            let row = document.createElement('tr');
            const keys = Object.keys(transaction);
            keys.forEach(key => {
                let cell = document.createElement('td');
                cell.innerHTML = transaction[key];
                row.appendChild(cell);
            });
            let cell = document.createElement('td');
            let btn = document.createElement('BUTTON');
            btn.appendChild(document.createTextNode('Delete'));
            cell.appendChild(btn);
            row.appendChild(cell);
            body.appendChild(row);
        }
    },
});