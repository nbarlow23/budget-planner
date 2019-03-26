const app = new Vue({
    el: '#app',
    data: {
        categories: [],
        addedCategoryName: '',
        addedDescription: '',
    },
    created() {
        this.showButton();
    },
    methods: {
        onClickNewCategory() {
            console.log('here');
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
        createCategory() {
            const category = {
                categoryName: this.addedCategoryName,
                categoryDescription: this.addedDescription,
            }
            this.categories.push(category);
            this.addedCategoryName = '';
            this.addedDescription = '';
            this.showButton();
        },
        deleteCategory(category) {
            var index = this.categories.indexOf(category);
            if (index > -1)
                this.categories.splice(index, 1);
        },
        categoryNum(category) {
            return this.categories.indexOf(category) + 1;
        }
    },
});