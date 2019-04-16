import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    transactions: [],
    incomes: [],
    categories: [],
    totalIncome: 0,
    totalExpenses: 0
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setIncomes(state, incomes) {
      state.incomes = incomes;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setTotalIncome(state, income) {
      state.totalIncome = income;
    },
    setTotalExpenses(state, expenses) {
      state.expenses = expenses;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit("setUser", null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async createTransaction(context, data) {
      try {
        await axios.post("/api/budget/transactions", {
          date: data.date,
          amount: data.amount,
          category: data.category,
          description: data.description
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getTransactions(context) {
      try {
        let response = await axios.get("/api/budget/transactions");
        context.commit("setTransactions", response.data);
        let totalExpenses = 0;
        this.state.transactions.forEach(transaction => {
          totalExpenses += Number(transaction.amount);
        });
        context.commit("setTotalIncome", totalExpenses);
        return "";
      } catch (error) {
        return "";
      }
    },

    async deleteTransaction(context, id) {
      try {
        await axios.delete("/api/budget/transactions/" + id);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async updateTransaction(context, data) {
      try {
        await axios.put("/api/budget/transactions/" + data.id, {
          date: data.date,
          amount: data.amount,
          category: data.category,
          description: data.description
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async createCategory(context, data) {
      try {
        await axios.post("/api/budget/categories", {
          title: data.title,
          description: data.description
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getCategories(context) {
      try {
        let response = await axios.get("/api/budget/categories");
        context.commit("setCategories", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async deleteCategory(context, id) {
      try {
        await axios.delete("/api/budget/categories/" + id);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async updateCategory(context, data) {
      try {
        await axios.put("/api/budget/categories/" + data.id, {
          title: data.title,
          description: data.description
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async createIncome(context, data) {
      try {
        await axios.post("/api/budget/incomes", {
          date: data.date,
          amount: data.amount,
          category: data.category,
          description: data.description
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getIncomes(context) {
      try {
        let response = await axios.get("/api/budget/incomes");
        context.commit("setIncomes", response.data);
        let totalIncome = 0;
        this.state.incomes.forEach(income => {
          totalIncome += Number(income.amount);
        });
        context.commit("setTotalIncome", totalIncome);
        return "";
      } catch (error) {
        return "";
      }
    },

    async deleteIncome(context, id) {
      try {
        await axios.delete("/api/budget/incomes/" + id);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async updateIncome(context, data) {
      try {
        await axios.put("/api/budget/incomes/" + data.id, {
          date: data.date,
          amount: data.amount,
          category: data.category,
          description: data.description
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    }
  }
});
