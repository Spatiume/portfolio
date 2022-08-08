<template lang="pug">
.tags
  appInput.tags__string(
    v-model="editedText",
    placeholder="Тег1, тег2, тег3",
    @input="editedTags",
    v-bind="$attrs"
  )
  .tags__list
    .tags__item(v-for="(tag, index) in tags")
      tag(:title="tag", :index="index", @remove="removeTag")
</template>
<script>
import appInput from "../input";
import tag from "../tag";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  components: {
    appInput,
    tag,
  },
  data() {
    return {
      editedText: this.value,
    };
  },
  watch: {
    value() {
      this.editedText = this.value;
    },
  },
  computed: {
    tags() {
      return this.editedText.split(",");
    },
  },
  methods: {
    removeTag(tagTitle, tagIndex) {
      // если последний элемент в строке без запятой, то мы его удаляем
      // если есть запятая, то добавляется пустой элемент в конец массива
      // таким образом, в массиве всегда будет 1 пустой элемент
      if (tagIndex == this.tags.length - 1) {
        this.editedText = this.editedText.replace(tagTitle, "").trim();
      } else {
        this.editedText = this.editedText.replace(tagTitle + ",", "").trim();
      }
      this.editedTags();
    },
    editedTags() {
      this.$emit("input", this.editedText);
    },
  },
};
</script>
<style lang="postcss">
.tags__list {
  display: flex;
  flex-wrap: wrap;
}

.tags__string {
  margin-bottom: 20px;
}
</style>