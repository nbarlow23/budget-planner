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
    
  }
});
