const app = new Vue({
    el: '#app',
    data: {
        incomes: [
            {
                date: '01/01',
                amount: '$750.00',
                description: 'Work',
                category: 'Income'
            },
            {
                date: '01/15',
                amount: '$750.00',
                description: 'Work',
                category: 'Income'
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
        onClickNewIncome() {
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
        createIncome() {
            let income = {
                date: this.addedDate,
                amount: this.addedAmount,
                description: this.addedDescription,
                category: this.addedCategory,
            };
            this.addedDate = '';
            this.addedAmount = '';
            this.addedDescription = '';
            this.addedCategory = '';
            this.incomes.push(income);
            this.showButton();
        },
        deleteIncome(income) {
            let index = this.incomes.indexOf(income);
            if (index > -1)
                this.incomes.splice(index, 1);
        },
   },
});