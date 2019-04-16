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
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/transactions">Transactions</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/incomes">Income</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/categories">Spending Categories</router-link>
          </li>
          <li class="nav-item">
            <div @click="logout">Logout</div>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch('getUser');
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
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
</style>
