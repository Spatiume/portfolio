<template lang="pug">
.headline-component
  .content
    slot
  .desc Панель администрирования
  button.logout(type="button", @click="logoutUser") Выйти
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["logout"]),
    logoutUser() {
      this.logout();
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>