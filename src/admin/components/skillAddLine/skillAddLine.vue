<template lang="pug">
form.skillAddLine-component(@submit.prevent="addNewSkill")
  appInput#input-skillTitle.skill-title(
    v-model="skill.title",
    placeholder="New skill",
    :errorMessage="errorMessage"
  )
  appInput#input-skillPercent.skill-percent(
    type="number",
    min="0",
    max="100",
    maxlength="3",
    v-model="skill.percent",
    placeholder="10",
  )
  iconedBtn.btn(type="submit", title=" ")
</template>

<script>
import appInput from "./../input";
import iconedBtn from "./../button/types/iconedBtn";

import { mapActions } from "vuex";

export default {
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
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      const newSkill = {
        ...this.skill,
        category: this.categoryId,
      };
      console.log(newSkill);
      try {
        await this.addSkill(newSkill);
      } catch (error) {
        console.log(error);
        this.errorMessage = error;
      }
      this.skill.title = "",
      this.skill.percent = ""
    },
    // validateInput(title, percent) {
    //   this.errorMessage = { title: "", percent: "" };
    //   if (title === "" || title.length < 2) {
    //     this.errorMessage.title = "Заполните строку";
    //     return false;
    //   }
    //   if (isNaN(percent) || percent > 100 || percent < 0 || percent === "") {
    //     this.errorMessage.percent = "Введите число от 0 до 100";
    //     return false;
    //   }
    //   return true;
    // },
    // onClick() {
    //   if (this.validateInput(this.skillTitle, this.skillPercent)) {
    //     this.$emit("createNewSkill", {
    //       title: this.skillTitle,
    //       percent: this.skillPercent,
    //     });
    //     console.log(
    //       "Skill = " + this.skillTitle + " , percent = " + this.skillPercent
    //     );
    //     this.skillTitle = " ";
    //     this.skillPercent = " ";
    //   }
    // },
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
