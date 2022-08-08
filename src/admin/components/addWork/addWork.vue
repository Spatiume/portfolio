<template lang="pug">
.addwork-form
  h2.addwork-form__title(v-if="mode == 'edit'") Редактирование работы
  h2.addwork-form__title(v-else) Добавление новой работы
  .addwork
    .addwork__left-col
      .addwork__pic
        appInputFile(
          v-model="currentWork.photo",
          :errorMessage="validation.firstError('currentWork.photo')"
        )
    .addwork__right-col
      .addwork__title 
        appInput(
          v-model="currentWork.title",
          title="Название",
          placeholder="Название работы",
          ref="addwork__title",
          :errorMessage="validation.firstError('currentWork.title')"
        )
      .addwork__link 
        appInput(
          v-model="currentWork.link",
          title="Ссылка",
          placeholder="Ссылка на работу",
          :errorMessage="validation.firstError('currentWork.link')"
        )
      .addwork__desc 
        appInput(
          v-model="currentWork.description",
          title="Описание",
          fieldType="textarea",
          placeholder="Описание работы",
          :errorMessage="validation.firstError('currentWork.description')"
        )

      .addwork__tags Добавление тега
        addTags(
          v-model="currentWork.techs",
          :errorMessage="validation.firstError('currentWork.techs')"
        )
      .addwork__btn
        appButton(plain, title="Отменить", @click="$emit('closeAddWork')")
        appButton(
          v-if="mode == 'edit'",
          title="Сохранить",
          @click="editCurrentWork"
        )
        appButton(v-else, title="Добавить", @click="createNewWork")
</template>
<script>
import appInputFile from "../appInputFile";
import appInput from "../input";
import addTags from "../addTags";
import appButton from "./../button";
import { Validator } from "simple-vue-validator";
import { mapActions } from "vuex";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "currentWork.title"(value) {
      return Validator.value(value).required(
        "Поле 'название' не может быть пустым"
      );
    },
    "currentWork.link"(value) {
      return Validator.value(value).required(
        "Поле 'ссылка' не может быть пустым"
      );
    },
    "currentWork.description"(value) {
      return Validator.value(value).required(
        "Поле 'описание' не может быть пустым"
      );
    },
    "currentWork.techs"(value) {
      return Validator.value(value).required(
        "Поле 'теги' не может быть пустым"
      );
    },
    "currentWork.photo"(value) {
      if (value.size > 0) {
        value = value.size;
      } else if (value.length > 0) {
        value = value.length;
      } else {
        value = "";
      }
      return Validator.value(value).required("Загрузите изображение");
    },
  },
  components: {
    appInput,
    addTags,
    appButton,
    appInputFile,
  },
  props: {
    mode: {
      type: String,
      default: "create",
      validator: (value) => ["", "edit", "create"].includes(value),
    },
    workToEdit: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentWork: {
        title: "",
        techs: "",
        photo: {},
        link: "",
        description: "",
        ...this.workToEdit,
      },
    };
  },
  watch: {
    workToEdit() {
      this.currentWork = {
        ...this.workToEdit,
      };
      this.focusInput();
    },
    mode() {
      this.checkMode();
    },
  },
  methods: {
    ...mapActions("works", ["addWork", "editWork"]),
    async createNewWork() {
      this.$validate();
      if (this.validation.hasError()) return;

      try {
        await this.addWork(this.currentWork);
        this.validation.reset();
        this.$emit("createAddWork");
      } catch (error) {
        console.log(error);
      }
    },
    async editCurrentWork() {
      this.$validate();
      if (this.validation.hasError()) return;

      try {
        await this.editWork(this.currentWork);
        this.validation.reset();
        this.$emit("editAddWork");
      } catch (error) {
        console.log(error);
      }
    },
    checkMode() {
      if (this.mode == "edit") {
        // если меняем изменяемую работу
        this.currentWork = {
          ...this.workToEdit,
        };
        this.focusInput();
      }
      if (this.mode == "create") {
        this.validation.reset();
        this.currentWork = {
          title: "",
          techs: "",
          photo: {},
          link: "",
          description: "",
        };
        this.focusInput();
      }
    },
    focusInput() {
      this.$nextTick(function () {
        this.$refs.addwork__title.$el.focus();
      });
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>
<style lang="postcss" scoped>
@import "./../../../styles/mixins.pcss";

.addwork-form {
  background: white;
  padding: 0 4%;
  padding-top: 1%;
}

.addwork-form__title {
  border-bottom: 2px solid rgba(176, 174, 174, 0.25);
  padding: 2% 0;
}

.addwork {
  display: flex;
  padding: 5%;
  justify-content: space-between;

  .addwork__left-col,
  .addwork__right-col {
    width: 49%;
  }

  @include tablets {
    flex-direction: column;
    .addwork__left-col,
    .addwork__right-col {
      width: 100%;
    }
    .addwork__left-col {
      margin-bottom: 20px;
    }
  }
}

.addwork__pic {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addwork__title,
.addwork__link,
.addwork__desc,
.addwork__tags {
  margin-bottom: 20px;
}

.addwork__btn {
  display: flex;
  justify-content: flex-end;
}
</style>