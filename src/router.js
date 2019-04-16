import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Transactions from "./views/Transactions.vue";
import Incomes from "./views/Incomes.vue";
import Categories from "./views/Categories.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions
    },
    {
      path: "/icnomes",
      name: "incomes",
      component: Incomes
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
