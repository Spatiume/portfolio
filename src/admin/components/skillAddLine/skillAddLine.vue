<template lang="pug">
.skillAddLine-component
  appInput#input-skillTitle.skill-title(
    v-model="skillTitle",
    placeholder="New skill",
    :errorMessage="errorMessage.title"
  )
  appInput#input-skillPercent.skill-percent(
    v-model="skillPercent",
    placeholder="10",
    :errorMessage="errorMessage.percent"
  )
  iconedBtn.btn(type="iconed", @click="onClick", title=" ")
</template>

<script>
import appInput from "./../input";
import iconedBtn from "./../button/types/iconedBtn";

export default {
  components: {
    appInput,
    iconedBtn,
  },
  data() {
    return {
      skillTitle: "",
      skillPercent: "",
      errorMessage: { title: "", percent: "" },
    };
  },
  methods: {
    validateInput(title, percent) {
      this.errorMessage = { title: "", percent: "" };
      if (title === "" || title.length < 2) {
        this.errorMessage.title = "Заполните строку";
        return false;
      }
      if (isNaN(percent) || percent > 100 || percent < 0 || percent === "") {
        this.errorMessage.percent = "Введите число от 0 до 100";
        return false;
      }
      return true;
    },
    onClick() {
      if (this.validateInput(this.skillTitle, this.skillPercent)) {
        this.$emit("createNewSkill", {
          title: this.skillTitle,
          percent: this.skillPercent,
        });
        console.log(
          "Skill = " + this.skillTitle + " , percent = " + this.skillPercent
        );
        this.skillTitle = " ";
        this.skillPercent = " ";
      }
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
