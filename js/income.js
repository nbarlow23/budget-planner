const app = new Vue({
    el: '#app',
    data: {
        incomes: [],
        addedDate: '',
        addedAmount: '',
        addedDescription: '',
        addedCategory: '',
    },
    created() {
        this.showButton();
    },
    computed: {
        totalIncome() {
            let total = 0;
            this.incomes.forEach(i => {
                total += parseFloat(i.amount);
            });
            return total;
        }
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
            if (this.addedAmount[0] === '$') {
                this.addedAmount = this.addedAmount.substr(1);
            }
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