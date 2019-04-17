<template>
  <div id="app">
    <nav v-if="user" class="navbar navbar-expand-lg navbar-light bg-prim">
      <router-link class="navbar-brand" to="/">MoneyTracker v260</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-bind:class="{ 'active ': isHome}" class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li v-bind:class="{ 'active ': isTransactions}" class="nav-item">
            <router-link class="nav-link" to="/transactions">Transactions</router-link>
          </li>
          <li v-bind:class="{ 'active ': isIncomes}" class="nav-item">
            <router-link class="nav-link" to="/incomes">Income</router-link>
          </li>
          <li v-bind:class="{ 'active ': isCategories}" class="nav-item">
            <router-link class="nav-link" to="/categories">Spending Categories</router-link>
          </li>
          <li class="nav-item">
            <div @click="logout" class="clickable nav-link">Logout</div>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    isHome() {
      const path = this.$route.path;
      return path === "/";
    },
    isTransactions() {
      return this.$route.path === "/transactions";
    },
    isCategories() {
      return this.$route.path === "/categories";
    },
    isIncomes() {
      return this.$route.path === "/incomes";
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
        this.$router.push({name: 'home'});
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

.bg-prim {
  background: #42c98f;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.clickable {
  cursor: pointer;
}
</style>
