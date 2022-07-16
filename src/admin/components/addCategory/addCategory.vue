<template lang="pug">
.category-component
  .category-title
    editLine(
      v-model="newCategoryTitle",
      :currentEditMode="true",
      @approve="createNewCategory",
      @cancel="cancelCreateNewCategory",
      :errorMessage="validation.firstError('newCategoryTitle')"
    )
  ul.skills-list.blocked
    li.skills-item
  .addNewSkill.blocked
    skillAddLine
</template>

<script>
import editLine from "../editLine";
import skillAddLine from "../skillAddLine";

import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    newCategoryTitle(value) {
      return Validator.value(value).required("Поле не может быть пустым");
    },
  },
  components: { skillAddLine, editLine },
  props: {},
  data() {
    return {
      newCategoryTitle: "",
    };
  },
  methods: {
    ...mapActions("categories", ["addCategory", "fetchCategories"]),
    async createNewCategory() {
      this.$validate();
      if (this.validation.hasError()) return;

      try {
        await this.addCategory(this.newCategoryTitle);

        //
        this.fetchCategories();
      } catch (error) {
        alert(error.message);
      }
      this.newCategoryTitle = "";
      this.$emit("createNewCategory");
    },
    cancelCreateNewCategory() {
      this.newCategoryTitle = "";
      this.$emit("cancelCreateNewCategory");
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
