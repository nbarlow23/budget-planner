import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    transactions: [],
    incomes: [],
    categories: []
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
    }
  }
});
