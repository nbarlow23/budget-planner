<template>
  <div v-show="user">
    <h1 class="pt-4 px-5">Track Your Income</h1>
    <div class="container-fluid">
      <h3 class="summary text-right">
        Total Income:
        <span class="incomeColor">${{totalIncome}}</span>
      </h3>
      <div class="table-responsive mt-5">
        <table id="table" class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tBody">
            <tr v-bind:key="income._id" v-for="income in incomes">
              <td>{{income.date}}</td>
              <td>${{income.amount}}</td>
              <td>{{income.description}}</td>
              <td>{{income.category}}</td>
              <td>
                <button type="button" class="btn btn-info mr-1" v-on:click="edit(income)">Edit</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="deleteIncome(income)"
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
            v-on:click="onClickNewIncome"
            type="button"
            class="btn bg-prim center"
          >
            New
            Income
          </button>
          <form v-if="showForm" class="m-auto" id="form" v-on:submit.prevent="createIncome">
            <input v-model="addedDate" placeholder="Date MM-DD">
            <input v-model="addedAmount" placeholder="Amount">
            <input v-model="addedDescription" placeholder="Description">
            <input v-model="addedCategory" placeholder="Category">
            <button type="submit">Submit</button>
          </form>
          <form v-if="showEditForm" class="m-auto" id="editForm" v-on:submit.prevent="updateIncome">
            <input v-model="editDate" placeholder="Date MM-DD">
            <input v-model="editAmount" placeholder="Amount">
            <input v-model="editDescription" placeholder="Description">
            <input v-model="editCategory" placeholder="Category">
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Incomes",
  data() {
    return {
      addedDate: "",
      addedAmount: "",
      addedDescription: "",
      addedCategory: "",
      editId: "",
      editDate: "",
      editAmount: "",
      editDescription: "",
      editCategory: "",
      showForm: false,
      showEditForm: false,
      showButton: true
    };
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getIncomes");
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    incomes() {
      return this.$store.state.incomes;
    },
    totalIncome() {
      return this.$store.state.totalIncome;
    },

  },
  methods: {
    onClickNewIncome() {
      this.showForm = true;
      this.showButton = false;
    },

    async createIncome() {
      if (this.addedAmount[0] === "$") {
        this.addedAmount = this.addedAmount.substr(1);
      }
      try {
        await this.$store.dispatch("createIncome", {
          date: this.addedDate,
          amount: this.addedAmount,
          description: this.addedDescription,
          category: this.addedCategory
        });
        await this.$store.dispatch("getIncomes");
        this.addedDate = "";
        this.addedAmount = "";
        this.addedDescription = "";
        this.addedCategory = "";
        this.showButton = true;
        this.showEditForm = false;
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteIncome(income) {
      try {
        let response = await this.$store.dispatch("deleteIncome", income._id);        
        await this.$store.dispatch("getIncomes");
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
      this.showEditForm = true;
      this.showForm = false;
      this.showButton = false;
    },

    async updateIncome() {
      try {
        const response = await this.$store.dispatch("updateIncome", {
          id: this.editId,
          date: this.editDate,
          description: this.editDescription,
          amount: this.editAmount,
          category: this.editCategory
        });
        await this.$store.dispatch("getIncomes");
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
