<template>
  <div>
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
                <button type="button" class="btn btn-info" v-on:click="edit(income)">Edit</button>
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
  data() {
    return {
      incomes: [],
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
  created() {
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
        let response = await this.$store.dispatch("getIncomes");

        return true;
      } catch (error) {
        console.log(error);
      }
    },

    onClickNewIncome() {
      this.showForm = true;
      this.showButton = false;
    },

    async createIncome() {
      if (this.addedAmount[0] === "$") {
        this.addedAmount = this.addedAmount.substr(1);
      }
      try {
        await axios.post("/api/incomes", {
          date: this.addedDate,
          amount: this.addedAmount,
          description: this.addedDescription,
          category: this.addedCategory
        });
        this.addedDate = "";
        this.addedAmount = "";
        this.addedDescription = "";
        this.addedCategory = "";
        this.showButton = true;
        this.showEditForm = false;
        this.showForm = false;
        this.getIncomes();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteIncome(income) {
      try {
        let response = await axios.delete("/api/incomes/" + income._id);
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
      this.showEditForm = true;
      this.showForm = false;
      this.showButton = false;
    },
    async updateIncome() {
      try {
        const response = await axios.put("/api/incomes/" + this.editId, {
          date: this.editDate,
          description: this.editDescription,
          amount: this.editAmount,
          category: this.editCategory
        });
        this.getIncomes();
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
