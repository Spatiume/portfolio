<template lang="pug">
.skill-component
  .skill-show(v-if="editMode === false")
    .skill-title {{ skill.title }}
    .skill-percent {{ skill.percent }}
    ul.skill-instruments
      li.skill-instruments-item
        icon.skill-change(
          grayscale,
          symbol="pencil",
          title="Редактировать",
          @click="editModeForSkill"
        )
      li.skill-instruments-item
        icon.skill-remove(
          grayscale,
          symbol="trash",
          title="Удалить",
          @click="skillRemove"
        )

  .skill-edit(v-else)
    appInput#input-skillTitle.skill-title(
      v-model="editedSkill.title",
      :errorMessage="errorMessage.title",
      autofocus="autofocus",
      @keydown.native.enter="editCurrentSkill",
      @keydown.native.esc="canselEditModeForSkill"
    )
    appInput#input-skillPercent.skill-percent(
      type="number",
      min="0",
      max="100",
      maxlength="3",
      v-model="editedSkill.percent",
      :errorMessage="errorMessage.percent",
      autofocus="autofocus",
      @keydown.native.enter="editCurrentSkill",
      @keydown.native.esc="canselEditModeForSkill"
    )
    ul.skill-instruments
      li.skill-instruments-item
        icon(
          grayscale,
          symbol="tick",
          title="Изменить",
          @click.submit="editCurrentSkill"
        )
      li.skill-instruments-item
        icon(
          grayscale,
          symbol="cross",
          title="Отмена",
          @click="canselEditModeForSkill"
        )
</template>

<script>
import icon from "./../icon";
import appInput from "./../input";
import { mapActions } from "vuex";

export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  components: { icon, appInput },
  data() {
    return {
      editMode: false,
      errorMessage: { title: "", percent: "" },
      editedSkill: {
        ...this.skill,
      },
    };
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    editModeForSkill() {
      this.editMode = true;
    },
    canselEditModeForSkill() {
      this.editMode = false;
      this.editedSkill = { ...this.skill };
    },
    async editCurrentSkill() {
      try {
        await this.editSkill(this.editedSkill);
        this.editedSkill = { ...this.skill };
      } catch (error) {
        console.log(error);
      }
      this.editMode = false;
    },
    async skillRemove() {
      try {
        await this.removeSkill(this.skill);
      } catch (error) {
        console.log(error);
      }
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
  },
};
</script>

<style lang="postcss" scoped>
.skill-show,
.skill-edit {
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

/* .hideElem {
  display: none;
} */
</style>