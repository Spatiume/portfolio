<template lang="pug">
.category-component
  .category-title
    editLine(
      v-model="editedCategory.category",
      @approve="editCurrentCategory",
      @remove="removeCategoryById",
      @cancel="cancelEditCategory",
      :errorMessage="validation.firstError('editedCategory.category')"
    )
  ul.skills-list
    li.skills-item(v-for="skill in category.skills", :key="skill.id")
      skill(:skill="skill")
  .addNewSkill
    skillAddLine(:categoryId="category.id")
</template>

<script>
import editLine from "./../editLine";
import skill from "./../skill";
import skillAddLine from "./../skillAddLine";

import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";
import addNotification from "../../mixins/addNotification";

export default {
  mixins: [require("simple-vue-validator").mixin, addNotification],
  validators: {
    "editedCategory.category"(value) {
      return Validator.value(value).required("Поле не может быть пустым");
    },
  },
  props: {
    category: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: { skill, skillAddLine, editLine },
  data() {
    return {
      editedCategory: {
        ...this.category,
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions("categories", ["removeCategory", "editCategoryTitle"]),
    async editCurrentCategory() {
      if (this.validation.hasError()) return;
      try {
        await this.editCategoryTitle(this.editedCategory);
        this.editedCategory = { ...this.category };
        this.addNotification("Категория успешно обновлена");
      } catch (error) {
        this.addNotification(error.message, "error");
      }
    },
    cancelEditCategory() {
      this.editedCategory = { ...this.category };
    },
    async removeCategoryById() {
      try {
        await this.removeCategory(this.category.id);
        this.addNotification("Категория успешно удалена");
      } catch (error) {
        this.addNotification(error.message, "error");
      }
    },
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
  position: relative;
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
