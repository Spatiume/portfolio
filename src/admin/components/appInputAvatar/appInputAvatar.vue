<template lang="pug">
.inputAvatar(:class="{ 'pic-error': !!errorText }")
  .inputAvatar__pic(
    :class="{ filled: renderedPhoto.length }",
    :style="{ backgroundImage: `url(${renderedPhoto})` }"
  )
  appButton.inputAvatar__pic-btn(
    plain,
    typeAttr="file",
    :title="renderedPhoto.length > 0 ? 'Изменить фото' : 'Добавить фото'",
    @change="handleFileChange",
    :value="value"
  )
  tooltip.inputAvatar__pic-tooltip(:text="errorText")
</template>
<script>
import appButton from "../button";
import tooltip from "../tooltip";
import { getAbsoluteImgPath } from "../../helpers/pictures";
import { renderImageFile } from "../../helpers/pictures";

export default {
  props: {
    value: {
      type: File | Object,
      default() {
        return {};
      },
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
      mode: "",
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
      const file = event.target.files[0];
      this.photo = file;
      this.errorText = "";

      if (!this.validationPhoto(this.photo)) return;

      renderImageFile(file).then((resolve) => {
        this.renderedPhoto = resolve;
        this.$emit("input", file);
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
      /* 
       При создание нового объекта, сервер принимает изображение только в png формате,
       при редактирование уже существующего объекта, сервер принимает файлы и в png и в jpeg формате
       т.к. принцип работы при добавлении и редактирование одинаковый, предполагаю что проблема на стороне сервера
      */
      if (this.mode == "edit") {
        // проверка при редактирование существующего объекта
        if (type != "png" && type != "jpeg") {
          // проверка при создание нового объекта
          this.photo = this.value;
          this.errorText =
            "Неверный тип файла, сервер принимает файл только в 'png' или 'jpg' формате";
          return false;
        }
        return true;
      }
      
      if (type != "png") {
        // проверка при создание нового объекта
        this.photo = this.value;
        this.errorText =
          "Неверный тип файла, сервер принимает файл только в 'png' формате";
        return false;
      }

      return true;
    },
    checkImage(imageFile) {
      this.renderedPhoto = "";
      this.errorText = "";

      if (imageFile.size > 0) {
        //если получаем объект, т.е. фото добавлено пользователем
        renderImageFile(imageFile).then((resolve) => {
          this.renderedPhoto = resolve;
        });
        return;
      }
      if (imageFile.length > 0) {
        // если строка, т.е. фото пришло с сервера
        this.renderedPhoto = getAbsoluteImgPath(imageFile);
        this.mode = "edit";
        return;
      }
      this.mode = "";
    },
  },
  mounted() {
    this.checkImage(this.value);
  },
};
</script>
<style lang="postcss" scoped>
.inputAvatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.inputAvatar__pic {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  background: #cbd9ed;
  &:before {
    content: "";
    height: 130px;
    width: 110px;
    background: svg-load(
        "filled-user.svg",
        fill=#fff,
        stroke=#fff,
        stroke-width=10
      )
      center center no-repeat;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.filled {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    &:before {
      display: none;
    }
  }
}

.inputAvatar__pic-btn {
  position: absolute;
  bottom: 0;
  background: none;
}

.inputAvatar__pic-tooltip {
  display: none;
  position: absolute;
  bottom: -45px;
}

.pic-error {
  border-color: $errors-color;

  .inputAvatar__pic-tooltip {
    display: block;
  }
}
</style>
  