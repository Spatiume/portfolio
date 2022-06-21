<template lang="pug">
.category-component
  .category-title
    editLine(
      v-if="this.empty",
      v-model="newCategoryTitle",
      :currentEditMode="this.empty",
      @approve="createNewCategory",
      @remove="canselCreateNewCategory"
    )
    editLine(
      v-else,
      v-model="editedCategory.category",
      @approve="editCurrentCategory",
      @remove="removeCategoryById"
    )
  ul.skills-list
    li.skills-item(
      v-for="skill in category.skills",
      :key="skill.id",
      :skillsLength="skillsLength"
    )
      skill(:skill="skill")
  .addNewSkill(:class="{'blocked': this.empty}")
    skillAddLine(:categoryId="category.id")
</template>

<script>
import editLine from "./../editLine";
import skill from "./../skill";
import skillAddLine from "./../skillAddLine";
import iconedBtn from "./../button/types/iconedBtn";

import { mapActions } from "vuex";

export default {
  props: {
    category: {
      type: Object,
      default() {
        return {};
      },
    },
    empty: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  components: { skill, skillAddLine, editLine, iconedBtn },
  data() {
    return {
      skillsLength: 0,
      editedCategory: {
        ...this.category,
      },
      newCategoryTitle: "",
      showFormCategory: true,
    };
  },
  computed: {},
  methods: {
    ...mapActions("categories", [
      "addCategory",
      "removeCategory",
      "editCategoryTitle",
      "fetchCategories",
    ]),
    async createNewCategory() {
      console.log("createNewCategory");
      try {
        await this.addCategory(this.newCategoryTitle);
        this.fetchCategories();
      } catch (error) {
        console.log(error.message);
      }
      this.newCategoryTitle = "";
      this.$emit("hideFormNewCategory");
      this.showFormCategory = false;
    },
    canselCreateNewCategory() {
      this.newCategoryTitle = "";
      this.$emit("hideFormNewCategory");
    },
    async editCurrentCategory() {
      try {
        await this.editCategoryTitle(this.editedCategory);
      } catch (error) {
        console.log(error);
      }
      this.editedCategory = { ...this.category };
    },
    async removeCategoryById() {
      try {
        await this.removeCategory(this.category.id);
      } catch (error) {
        console.log(error);
      }
    },
    isEmpty(obj) {
      for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false;
      }
      return true;
    },
  },
  created() {
    // console.log(this.isEmpty(this.category));
    if (this.empty == true) {
      this.title = "";
      this.skills = [];
      console.log("chtoto tut est", this.empty);
    }
  },
};
</script>


<style lang="postcss" scoped >
.blocked {
  opacity: 0.5;
  filter: grayscale(100%);
  pointer-events: none;
}

.category-component {
  color: grey;
  padding: 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.category-title {
  font-size: 24px;
  border-bottom: 2px solid rgba(156, 156, 156, 0.4);
  padding-bottom: 16px;
}

.skills-item {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.addNewSkill {
  margin-top: auto;
  padding-left: 20%;
}
</style>
