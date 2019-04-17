<template>
  <div>
    <h1>Register for an account</h1>
    <form class="pure-form pure-form-aligned">
      <fieldset>
        <p class="pure-form-message-inline">All fields are required.</p>

        <div class="pure-control-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" placeholder="Username">
        </div>

        <div class="pure-control-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" placeholder="Password">
        </div>

        <div class="pure-controls">
          <button class="pure-button pure-button-primary" @click.prevent="login">Login</button>
        </div>
        <div class="pure-controls">
          <button class="pure-button pure-button-primary" @click.prevent="register">Register</button>
        </div>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          username: this.username,
          password: this.password
        });
        if (!this.error) {
          await this.getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        if (!this.error) {
          await this.getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      await this.$store.dispatch("getTransactions");
      await this.$store.dispatch("getIncomes");
    }
  }
};
</script>

<style scoped>
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}

.pure-controls {
  display: flex;
}

.pure-controls button {
  margin-left: auto;
}
</style>