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
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getCategories")
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    onClickNewCategory() {
      this.showButton = false;
      this.showForm = true;
    },

    async createCategory() {
      try {
        await this.$store.dispatch("createCategory", {
          title: this.addedCategoryName,
          description: this.addedDescription
        });
        await this.$store.dispatch("getCategories");
        this.addedCategoryName = "";
        this.addedDescription = "";
        this.showButton = true;
        this.showEditForm = false;
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCategory(category) {
      try {
        let response = await this.$store.dispatch("deleteCategory", category._id);
        await this.$store.dispatch("getCategories");
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
        const response = await this.$store.dispatch("updateCategory", {
          id: this.editCategoryId,
          title: this.editCategoryName,
          description: this.editDescription
        });
        await this.$store.dispatch("getCategories");
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

img {
    width: 100%;
    /* 100% of the container it's in*/
}

.bg-prim {
    background-color: #42C98F;
}

.btn-primary {
    background-color: #42C98F;
}

.btn-info {
    background-color: #28B0AC;
}

.center {
    margin-left: auto;
    margin-right: auto;
}

.summary {
  margin-right: 15%;
}

.visuals {
  display: grid;
  grid-template: auto auto auto auto auto / 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

h1, h2, h3, h4 {
  padding: 15px;
}
.table {
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}

 table th {
    text-align: center;
 }

.visuals {
    display: grid;
    grid-template: auto auto auto auto auto / 1fr 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    padding-left: 15px;
    padding-right: 15px;
}

.overview {
    display: flex;
}

income,
expenses {
    flex: 1;
}

income h3, expenses h3 {
  text-align: center;
  padding: 15px;
}

income img, expenses img {
  max-width: 500px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.incomeColor {
  color: #149945 ;
}

.dangerColor {
  color: #E52528;
}

#incomeAmount {
  text-align: center;
}

#expensesAmount {
  text-align: center;
}

</style>

