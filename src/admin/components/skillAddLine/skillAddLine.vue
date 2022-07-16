<template lang="pug">
form.skillAddLine-component(@submit.prevent="addNewSkill")
  appInput#input-skillTitle.skill-title(
    v-model="skill.title",
    placeholder="New skill",
    :errorMessage="validation.firstError('skill.title')",
    ref="inputAddSkill"
  )

  appInput#input-skillPercent.skill-percent(
    type="number",
    min="0",
    max="100",
    maxlength="3",
    v-model="skill.percent",
    placeholder="10",
    :errorMessage="validation.firstError('skill.percent')"
  )
  iconedBtn.btn(type="submit", title=" ") 
</template>

<script>
import appInput from "./../input";
import iconedBtn from "./../button/types/iconedBtn";

import { mapActions } from "vuex";

import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skill.title"(value) {
      return Validator.value(value).required("Поле не может быть пустым");
    },
    "skill.percent"(value) {
      return Validator.value(value).required("Поле не может быть пустым");
    },
  },
  components: {
    appInput,
    iconedBtn,
  },
  props: {
    categoryId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
      },
    };
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    ...mapActions("categories", ["fetchCategories"]),

    async addNewSkill() {
      // this.$validate().then((success) => {
      //   if (!success) return;
      // });
      this.$validate();
      if (this.validation.hasError()) return;

      const newSkill = {
        ...this.skill,
        category: this.categoryId,
      };
      try {
        await this.addSkill(newSkill);
        //очищаем форму и валидатор
        this.skill = {
          title: "",
          percent: "",
        };
        this.validation.reset();
        //делаем фокус на input при добавлении нового skill
        this.focusInput();
        /* ОБНОВЛЯЕМ ВСЕ КАТЕГОРИИ, вот почему:
        поле id у skill присваивается на сервере
        в случае если после создания skill мы захотим удалить или изменить его,
        нам нужно будет поле id, которая генерируется на сервере
        возможности загрузить отдельно skill не предусмотренно
        поэтому мы обновляем всю категорию   */
        this.fetchCategories();
      } catch (error) {
        alert(error);
      }
    },
    focusInput() {
      this.$nextTick(function () {
        this.$refs.inputAddSkill.$el.focus();
      });
    },
  },
};
</script>




<style lang="postcss" scoped >
.skillAddLine-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.skill-title {
  flex: 1;
  margin-right: 10px;
}

.skill-percent {
  margin-left: auto;
  margin-right: 20px;
  width: 65px;
  text-align: right;
  position: relative;

  &:before {
    content: "%";
    display: block;
    color: black;
    position: absolute;
    right: 4px;
    bottom: 10px;
  }
}

.btn {
  width: 8%;
}
</style>
