const app = new Vue({
    el: '#app',
    data: {
        income: '',
        expenses: '',
    },
    created() {
        this.calculateBudget();
        this.calculateExpenses();
    },
    methods: {
        async calculateBudget() {
            try {
            let response = await axios.get('/api/incomes');
                let incomes = response.data;
                let totalBudget = 0;
                incomes.forEach(income => {
                    totalBudget += parseFloat(income.amount);
                });
                this.income = totalBudget;
                return true;
            } catch (error) {
                console.log(error);
            }
        },

        async calculateExpenses() {
            try {
                let response = await axios.get('/api/transactions');
                let transactions = response.data;
                let totalTransactions = 0;
                transactions.forEach(transaction => {
                    totalTransactions += parseFloat(transaction.amount);
                });
                this.expenses = totalTransactions;
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
