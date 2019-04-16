<template>
  <div v-show="user">
    <h1 class="pt-4 px-5">Manage Your Spending Categories</h1>
    <div class="container-fluid pb-5">
      <div class="table-responsive mt-5">
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind:key="category._id" v-for="category in categories">
              <th scope="row">{{categoryNum(category)}}</th>
              <td>{{category.title}}</td>
              <td>{{category.description}}</td>
              <td>
                <button type="button" class="btn btn-info" v-on:click="edit(category)">Edit</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="deleteCategory(category)"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container my-3">
        <div class="row">
          <button
            id="button"
            v-if="showButton"
            v-on:click="onClickNewCategory"
            type="button"
            class="btn bg-prim center"
          >
            New
            Category
          </button>
          <form v-if="showForm" class="m-auto" id="form" v-on:submit.prevent="createCategory">
            <input v-model="addedCategoryName" placeholder="Category">
            <input v-model="addedDescription" placeholder="Description">
            <button type="submit">Submit</button>
          </form>
          <form v-if="showEditForm" class="m-auto" id="editForm" v-on:submit.prevent="updateCategory">
            <input v-model="editCategoryName" placeholder="Category">
            <input v-model="editDescription" placeholder="Description">
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      addedCategoryName: "",
      addedDescription: "",
      editCategoryName: "",
      editDescription: "",
      editCategoryId: "",
      showForm: false,
      showEditForm: false,
      showButton: true
    };
  },
  created() {
    this.getCategories();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getCategories() {
      try {
        let response = await axios.get("/api/categories");
        this.categories = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    onClickNewCategory() {
      this.showButton = false;
      this.showForm = true;
    },
    async createCategory() {
      try {
        await axios.post("/api/categories", {
          title: this.addedCategoryName,
          description: this.addedDescription
        });
        this.addedCategoryName = "";
        this.addedDescription = "";
        this.showButton = true;
        this.showEditForm = false;
        this.showForm = false;
        this.getCategories();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(category) {
      try {
        let response = await axios.delete("/api/categories/" + category._id);
        this.getCategories();
        return true;
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
      this.showButton = false;
      this.showEditForm = true;
      this.showForm = false;
    },
    async updateCategory() {
      try {
        const response = await axios.put(
          "/api/categories/" + this.editCategoryId,
          {
            title: this.editCategoryName,
            description: this.editDescription
          }
        );
        this.getCategories();
        this.showButton = true;
        this.showEditForm = false;
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>

