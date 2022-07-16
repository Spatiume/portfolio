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

  form.skill-edit(v-else, @submit.prevent="editCurrentSkill")
    appInput#input-skillTitle.skill-title(
      v-model="editedSkill.title",
      :errorMessage="validation.firstError('editedSkill.title')",
      autofocus="autofocus",
      @keydown.native.esc="canselEditModeForSkill",
      ref="skillInput"
    )
    appInput#input-skillPercent.skill-percent(
      type="number",
      min="0",
      max="100",
      maxlength="3",
      v-model="editedSkill.percent",
      :errorMessage="validation.firstError('editedSkill.percent')",
      @keydown.native.esc="canselEditModeForSkill"
    )
    ul.skill-instruments
      li.skill-instruments-item
        icon.submit(grayscale, symbol="tick", title="Изменить", type="submit")
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
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "editedSkill.title"(value) {
      return Validator.value(value).required("Поле не может быть пустым");
    },
    "editedSkill.percent"(value) {
      return Validator.value(value).required("Поле не может быть пустым");
      // .lessThan(100);
    },
  },
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
      this.focusInput();
    },
    canselEditModeForSkill() {
      this.editMode = false;
      this.editedSkill = { ...this.skill };
    },
    async editCurrentSkill() {
      if (this.validation.hasError()) return;

      try {
        await this.editSkill(this.editedSkill);
        this.editedSkill = { ...this.skill };
      } catch (error) {
        alert(error);
      }
      this.editMode = false;
    },
    async skillRemove() {
      try {
        await this.removeSkill(this.skill);
      } catch (error) {
        alert(error);
      }
    },
    focusInput() {
      this.$nextTick(function () {
        this.$refs.skillInput.$el.focus();
      });
    },
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

  .submit {
    background: transparent;
  }

  &:last-child {
    margin-right: 0;
  }
}

/* .hideElem {
  display: none;
} */
</style>