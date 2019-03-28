const app = new Vue({
    el: '#app',
    data: {
        categories: [],
        addedCategoryName: '',
        addedDescription: '',
        editCategoryName: '',
        editDescription: '',
        editCategoryId: '',
    },
    created() {
        this.showButton();
        this.getCategories();
    },
    methods: {
        async getCategories() {
            try {
                let response = await axios.get('/api/categories');
                this.categories = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        onClickNewCategory() {
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
        async createCategory() {
            try {
                await axios.post('/api/categories', {
                    title: this.addedCategoryName,
                    description: this.addedDescription,
                });
                this.addedCategoryName = '';
                this.addedDescription = '';
                this.showButton();
                this.getCategories();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory(category) {
            try {
                let response = await axios.delete('/api/categories/' + category._id);
                this.getCategories();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async updateCategory() {
            try {
                const response = await axios.put('/api/categories/' + this.editCategoryId, {
                    title: this.editCategoryName,
                    description: this.editDescription
                });
                this.getCategories();
                this.showButton();
            } catch (error) {
                console.log(error);
            }
        },
        categoryNum(category) {
            return this.categories.indexOf(category) + 1;
        },
        edit(category) {
            this.editCategoryName = category.title;
            this.editDescription = category.description;
            this.editCategoryId = category._id;
            this.showEditForm();
        }
    },
});