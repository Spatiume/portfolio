<template lang="pug">
section.about-page-component
  notification
  .about-page-header
    h1.section-title Блок &#171Обо мне&#187
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
import notification from "./../components/notification";

import { mapActions, mapState } from "vuex";
export default {
  components: { category, roundBtn, addCategory, notification },
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
  white-space: nowrap;
  .section-title {
    margin-right: 20px;
  }

  .btn-newcategory {
    padding-top: 5px;
  }

  @include phones {
    align-items: flex-start;
    flex-direction: column;

    .section-title {
      margin-bottom: 10px;
    }

    .btn-newcategory {
      padding-top: 0;
    }
  }
}
.categories-list {
  display: flex;
  flex-wrap: wrap;
}

.categories-item {
  width: 45%;
  margin-right: 5%;
  margin-bottom: 5%;

  background: white;

  @include tablets {
    width: 100%;
    margin-right: 0;
  }
}
</style>