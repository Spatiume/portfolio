<template lang="pug">
.root-wrapper-container
  .root-container
    template
      header.header-container
        headline
          user(username="Pavel Sysoev")
            avatar(src="./../../src/images/content/user.jpg")

      section.tabs-container
        tabs
      main.content-container
        .container
          .header
            .title Блок "Обо мне"
            iconed-button(
              type="iconed",
              v-if="emptyCatIsShow == false",
              @click="emptyCatIsShow = true",
              title="Добавить группу"
            )
          ul.categories-skills
            li.item(v-if="emptyCatIsShow")
              category
            li.item(v-for="category in categories", :key="category.id")
              category(:title="category.title", :skills="category.skills")
</template> 

<script>
import headline from "./components/headline";
import tabs from "./components/tabs";
import user from "./components/user";
import avatar from "./components/avatar";
import category from "./components/category";
import button from "./components/button";

export default {
  components: {
    headline,
    tabs,
    user,
    avatar,
    category,
    iconedButton: button,
  },
  data() {
    return {
      categories: [],
      emptyCatIsShow: false,
    };
  },
  methods: {

  },
  created() {
    this.categories = require("./../data/skills.json");
  },
};
</script>

<style lang="postcss" scoped src="./main.pcss"></style>