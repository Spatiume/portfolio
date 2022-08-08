<template lang="pug">
label.input__pic(
  :class="{ 'pic-error': !!errorText, filled: renderedPhoto.length }",
  :style="{ backgroundImage: `url(${renderedPhoto})` }"
)
  p.input__pic-text Перетащите или загрузите для загрузки изображения.
  p.input__pic-text Загружать файлы можно размером не более 1,5 Mb в фортмате 'jpg' или 'png'
  appButton.input__pic-btn(
    typeAttr="file",
    :title="renderedPhoto.length > 0 ? 'Изменить' : 'Загрузить'",
    @change="handleFileChange",
    :value="value"
  )
  tooltip.input__pic-tooltip(:text="errorText")
</template>
<script>
import appButton from "./../button";
import tooltip from "./../tooltip";
import { getAbsoluteImgPath } from "./../../helpers/pictures";
import { renderImageFile } from "./../../helpers/pictures";

export default {
  props: {
    value: {
      type: File | Object,
      default: {},
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  components: {
    appButton,
    tooltip,
  },
  data() {
    return {
      photo: this.value,
      renderedPhoto: "",
      errorText: this.errorMessage,
    };
  },
  watch: {
    errorMessage() {
      this.errorText = this.errorMessage;
    },
    value() {
      this.checkImage(this.value);
      this.photo = this.value;
    },
  },
  methods: {
    handleFileChange(event) {
      this.photo = event.target.files[0];
      this.errorText = "";

      if (!this.validationPhoto(this.photo)) return;

      renderImageFile(this.photo).then((resolve) => {
        this.renderedPhoto = resolve;
        this.$emit("input", this.photo);
      });
    },
    validationPhoto(file) {
      if (!file) return false; //пустой файл
      const size = file.size / 1024; //Kbyte
      const type = file.type.slice(6, file.type.length); // type: "image/png" избавляемся от image

      if (1500 < size) {
        this.photo = this.value;
        this.errorText = "Файл больше 1.5 мегабайт.";
        return false;
      }

      if (type != "png" && type != "jpg") {
        this.photo = this.value;
        this.errorText = "Неверный тип файла";
        return false;
      }
      return true;
    },
    checkImage(imageFile) {
      this.renderedPhoto = "";

      if (imageFile.size > 0) {
        //если получаем объект, т.е. фото добавлено пользователем
        renderImageFile(imageFile).then((resolve) => {
          this.renderedPhoto = resolve;
        });
      }
      if (imageFile.length > 0) {
        // если строка, т.е. фото пришло с сервера
        this.renderedPhoto = getAbsoluteImgPath(imageFile);
      }
    },
  },
  mounted() {
    this.checkImage(this.value);
  },
};
</script>
<style lang="postcss" scoped>
.input__pic {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #bccce3;
  align-items: center;
  justify-content: center;
  padding: 20%;
  text-align: center;
  border-style: dashed;
  border: 2px dashed grey;
  cursor: pointer;
  position: relative;

  background: center center/cover no-repeat;

  p {
    margin-bottom: 20px;
    opacity: 0.6;
  }

  &.filled {
    p {
      opacity: 0;
    }
    .input__pic-btn {
      position: absolute;
      bottom: -75px;
    }

    margin-bottom: 75px;
  }
}

.input__pic-tooltip {
  display: none;
  position: absolute;
  bottom: -45px;
}

.pic-error {
  border-color: $errors-color;

  .input__pic-tooltip {
    display: block;
  }
}
</style>
  