<template lang="pug">
.skill-component
  .skill-show(:class="{ hideElem: changeActive == 1 }")
    .skill-title {{ skillTitle }}
    .skill-percent {{ skillPercent }}
    ul.skill-instruments
      li.skill-instruments-item
        icon.skill-change(
          grayscale,
          symbol="pencil",
          @click="skillChangeActive"
        )
      li.skill-instruments-item
        icon.skill-remove(grayscale, symbol="trash", @click="skillRemove")
  .skill-change(:class="{ hideElem: changeActive == 0 }")
    appInput#input-skillTitle.skill-title(
      v-model="skillTitle",
      :errorMessage="errorMessage.title"
    )
    appInput#input-skillPercent.skill-percent(
      v-model="skillPercent",
      :errorMessage="errorMessage.percent"
    )
    ul.skill-instruments
      li.skill-instruments-item
        icon(grayscale, symbol="tick", @click="skillTryToChange")
      li.skill-instruments-item
        icon(grayscale, symbol="cross", @click="skillChangeCancel")
</template>

<script>
import icon from "./../icon";
import appInput from "./../input";

export default {
  props: ["title", "percent"],
  components: { icon, appInput },
  data() {
    return {
      skillTitle: this.title,
      skillPercent: this.percent,
      titleBeforeChange: "",
      percentBeforeChange: "",
      changeActive: false,
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
    returnSkillData() {
      this.errorMessage = { title: "", percent: "" };
      this.skillTitle = this.titleBeforeChange;
      this.skillPercent = this.percentBeforeChange;
    },
    saveSkillData(){
      this.titleBeforeChange = this.skillTitle;
      this.percentBeforeChange = this.skillPercent;
    },
    skillChangeActive() {
      this.changeActive = true;
      this.saveSkillData();
    },
    skillTryToChange() {
      if (this.validateInput(this.skillTitle, this.skillPercent)) {
        this.changeActive = false;
      }
    },
    skillChangeCancel() {
      this.changeActive = false;
      this.returnSkillData();
    },
    skillRemove() {
      console.log("remove");
    },
  },
};
</script>

<style lang="postcss" scoped>
.skill-show,
.skill-change {
  display: flex;
  align-item: center;
}

.skill-title {
  flex: 1;
  margin-right: 10px;
}

.skill-percent {
  margin-left: auto;
  margin-right: 20px;
  width: 65px;
}

.skill-instruments {
  display: flex;
  /* width: 8%; */
}

.skill-instruments-item {
  display: flex;
  align-items: center;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
}

.hideElem {
  display: none;
}
</style>