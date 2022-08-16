<template lang="pug">
.addreview-form
  h2.addreview-form__title(v-if="mode == 'edit'") Редактирование отзыва
  h2.addreview-form__title(v-else) Новый отзыв
  .addreview
    .addreview__left-col
      .addreview__pic
        appInputAvatar(
          v-model="currentReview.photo",
          :errorMessage="validation.firstError('currentReview.photo')"
        )
    .addreview__right-col
      .addreview__form-row
        .addreview__author
          appInput(
            v-model="currentReview.author",
            title="Имя автора",
            placeholder="Имя автора",
            ref="addreview__author",
            :errorMessage="validation.firstError('currentReview.author')"
          )
        .addreview__occ 
          appInput(
            v-model="currentReview.occ",
            title="Титул автора",
            placeholder="Титул автора",
            :errorMessage="validation.firstError('currentReview.occ')"
          )
      .addreview__text 
        appInput(
          v-model="currentReview.text",
          title="Отзыв",
          fieldType="textarea",
          placeholder="Текст отзыва",
          :errorMessage="validation.firstError('currentReview.text')"
        )
      .addreview__btn
        appButton(plain, title="Отменить", @click="$emit('close')")
        appButton(
          v-if="mode == 'edit'",
          title="Сохранить",
          @click="editCurrentReview"
        )
        appButton(v-else, title="Добавить", @click="createNewReview")
</template>
<script>
import appInputAvatar from "../appInputAvatar";
import appInput from "../input";
import addTags from "../addTags";
import appButton from "../button";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "currentReview.author"(value) {
      return Validator.value(value).required(
        "Поле 'автор' не может быть пустым"
      );
    },
    "currentReview.occ"(value) {
      return Validator.value(value).required(
        "Поле 'титул' не может быть пустым"
      );
    },
    "currentReview.text"(value) {
      return Validator.value(value).required(
        "Поле 'текст отзыва' не может быть пустым"
      );
    },
    "currentReview.photo"(value) {
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
    appInputAvatar,
  },
  props: {
    mode: {
      type: String,
      default: "create",
      validator: (value) => ["", "edit", "create"].includes(value),
    },
    reviewToEdit: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentReview: {
        author: "",
        occ: "",
        photo: {},
        text: "",
        ...this.reviewToEdit,
      },
    };
  },
  watch: {
    reviewToEdit() {
      this.currentReview = {
        ...this.reviewToEdit,
      };
      this.focusInput();
    },
    mode() {
      this.checkMode();
    },
  },
  methods: {
    createNewReview() {
      this.$validate();
      if (this.validation.hasError()) return;

      this.$emit("create", this.currentReview);
      this.validation.reset();
    },
    editCurrentReview() {
      this.$validate();
      if (this.validation.hasError()) return;

      this.$emit("edit", this.currentReview);
      this.validation.reset();
    },
    checkMode() {
      if (this.mode == "edit") {
        // если меняем изменяемую работу
        this.currentReview = {
          ...this.reviewToEdit,
        };
        this.focusInput();
      }
      if (this.mode == "create") {
        this.validation.reset();
        this.currentReview = {
          author: "",
          occ: "",
          text: "",
          photo: {},
        };
        this.focusInput();
      }
    },
    focusInput() {
      this.$nextTick(function () {
        this.$refs.addreview__author.$el.focus();
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

.addreview-form {
  background: white;
  padding: 0 4%;
  padding-top: 1%;
}

.addreview-form__title {
  border-bottom: 2px solid rgba(176, 174, 174, 0.25);
  padding: 2% 0;
}

.addreview {
  display: flex;
  padding: 5%;
  justify-content: space-between;

  .addreview__left-col {
    width: 30%;
  }
  .addreview__right-col {
    width: 65%;
  }

  @include tablets {
    flex-direction: column;
    .addreview__left-col,
    .addreview__right-col {
      width: 100%;
    }
    .addreview__left-col {
      margin-bottom: 20px;
    }
  }
}

.addreview__pic {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addreview__form-row {
  display: flex;

  div {
    flex: 1;
  }

  .addreview__author {
    margin-right: 20px;
  }

  @include phones {
    flex-direction: column;
    div {
      margin-bottom: 10px;
    }
    .addreview__author {
      margin-right: 0px;
    }
  }
}

.addreview__form-row,
.addreview__text {
  margin-bottom: 20px;
}

.addreview__btn {
  display: flex;
  justify-content: flex-end;

  @include phones {
    flex-direction: column;
  }
}
</style>