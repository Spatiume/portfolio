<template lang="pug">
.root-wrapper-container
  .root-container
    header.header-container
      headline
        user(username="Pavel Sysoev")
          avatar(src="./../../src/images/content/user.jpg")

    section.tabs-container
      tabs

    section.router

    main.content-container
      router-view
  notification
</template> 

<script>
import headline from "./components/headline";
import tabs from "./components/tabs";
import user from "./components/user";
import avatar from "./components/avatar";
import category from "./components/category";
import button from "./components/button";
import notification from "./components/notification";

export default {
  components: {
    headline,
    tabs,
    user,
    avatar,
    category,
    notification,
    iconedButton: button,
  },
  data() {
    return {
      categories: [],
      emptyCatIsShow: false,
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="postcss" scoped src="./main.pcss"></style>