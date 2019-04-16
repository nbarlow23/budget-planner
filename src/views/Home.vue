<template>
  <div>
    <div v-if="user">Hello</div>
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
    }
  }
};
</script>
