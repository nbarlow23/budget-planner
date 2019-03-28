const app = new Vue({
    el: '#app',
    data: {
        incomes: [],
        addedDate: '',
        addedAmount: '',
        addedDescription: '',
        addedCategory: '',
        editId: '',
        editDate: '',
        editAmount: '',
        editDescription: '',
        editCategory: '',
    },
    created() {
        this.showButton();
        this.getIncomes();
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

        async getIncomes() {
            try {
                let response = await axios.get('/api/incomes');
                this.incomes = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },

        onClickNewIncome() {
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

        async createIncome() {
            if (this.addedAmount[0] === '$') {
                this.addedAmount = this.addedAmount.substr(1);
            }
            try {
                await axios.post('/api/incomes', {
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
            this.getIncomes();
            } catch (error) {
                console.log(error);
            }
        },

        async deleteIncome(income) {
            try {
                let response = await axios.delete('/api/incomes/' + income._id);
                this.getIncomes();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        edit(income) {
            this.editDate = income.date;
            this.editAmount = income.amount;
            this.editDescription = income.description;
            this.editCategory = income.category;
            this.editId = income._id;
            this.showEditForm();
        },
        async updateIncome() {
            try {
                const response = await axios.put('/api/incomes/' + this.editId, {
                    date: this.editDate,
                    description: this.editDescription,
                    amount: this.editAmount,
                    category: this.editCategory
                });
                this.getIncomes();
                this.showButton();
            } catch (error) {
                console.log(error);
            }
        },
   },
});