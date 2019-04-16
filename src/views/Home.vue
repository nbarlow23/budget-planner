<template>
  <div>
    <div v-if="user">
      <h1>Welcome to MoneyTracker v260</h1>
      <section class="overview pb-5 mb-3">
        <div class="income">
          <br>
          <h3>Your total monthly income is:</h3>
          <h2 class="incomeColor" id="incomeAmount">${{income}}</h2>
          <br>
        </div>

        <div class="expenses">
          <br>
          <h3>Your total monthly expenses are:</h3>
          <h2 class="dangerColor" id="expensesAmount">${{expenses}}</h2>
          <br>
        </div>
      </section>
    </div>
    <register v-else></register>
  </div>
</template>

<script>

import Register from "@/components/Register.vue";

export default {
  name: "home",
  components: {
    Register
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    income() {
      return this.$store.state.totalIncome;
    },
    expenses() {
      return this.$store.state.totalExpenses;
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
  background-color: #42c98f;
}

.btn-primary {
  background-color: #42c98f;
}

.btn-info {
  background-color: #28b0ac;
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

h1,
h2,
h3,
h4 {
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

.income,
.expenses {
  flex: 1;
}

.income h3,
.expenses h3 {
  text-align: center;
  padding: 15px;
}

.incomeColor {
  color: #149945;
}

.dangerColor {
  color: #e52528;
}

#incomeAmount {
  text-align: center;
}

#expensesAmount {
  text-align: center;
}
</style>
