<template lang="pug">
section.about-page-component
  .about-page-header
    h1.section-title Обо мне
    roundBtn.btn-newcategory(
      type="iconed",
      @click="showFormCategory = true",
      v-if="showFormCategory == false"
    ) 
  .about-page-content
    ul.categories-list
      addCategory.category-form.categories-item(
        v-if="showFormCategory == true",
        @createNewCategory="showFormCategory = false",
        @cancelCreateNewCategory="showFormCategory = false"
      ) 
      li.categories-item(v-for="category in categories", :key="category.id")
        category(:category="category")
</template>

<script>
import category from "./../components/category";
import roundBtn from "./../components/button";
import addCategory from "./../components/addCategory";

import { mapActions, mapState } from "vuex";
export default {
  components: { category, roundBtn, addCategory },
  data() {
    return {
      category: {
        title: "",
      },
      showFormCategory: false,
    };
  },
  computed: {
    ...mapState("categories", {
      categories: (state) => state.categories,
      userData: (state) => state.userData,
    }),
  },
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style lang="postcss" scoped>
@import "./../../styles/mixins.pcss";
.category-form,
.btn-newcategory {
  display: flex;
}

.about-page-header {
  display: flex;
  align-items: center;
  padding: 3% 2%;
  .section-title {
    margin-right: 20px;
  }

  .btn-newcategory {
    padding-top: 5px;
  }
}
.categories-list {
  display: flex;
  flex-wrap: wrap;
}

.categories-item {
  width: 45%;
  margin-right: 5%;

  @include tablets {
    width: 100%;
  }
}
</style>