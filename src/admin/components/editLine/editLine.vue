<template lang="pug">
.edit-line-component(:class="{ blocked: blocked }")
  .title(v-show="editmode === false")
    .text {{ value }}
    .icon
      icon(
        symbol="pencil",
        grayscale="",
        @click="editmode = true",
        title="Редактировать"
      )
      icon(
        grayscale,
        symbol="trash",
        title="Удалить",
        @click="$emit('remove')"
      )
  .title(v-show="editmode === true")
    .input
      app-input(
        placeholder="Название новой группы",
        :value="value",
        :errorMessage="errorMessage",
        @input="$emit('input', $event)",
        @keydown.native.enter="onApprove",
        autofocus="autofocus",
        no-side-paddings="no-side-paddings",
        ref="inputEditLine"
      )
    .buttons
      .button-icon
        icon(symbol="tick", grayscale="", @click="onApprove", title="Принять")
      .button-icon
        icon(symbol="cross", grayscale="", @click="onCancel", title="Отменить")
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    blocked: Boolean,
    currentEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editmode: this.currentEditMode,
      editedValue: this.value,
    };
  },
  methods: {
    onCancel() {
      this.$emit("cancel", this.editedValue);
      this.editmode = false;
    },
    onApprove() {
      this.$emit("approve", this.value);
      this.editmode = false;

      //для добавления  новой категории
      if (this.currentEditMode) {
        this.editmode = this.currentEditMode;
      }
    },
    focusInput() {
      this.$nextTick(function () {
        this.$refs.inputEditLine.$el.focus();
      });
    },
  },
  watch: {
    editmode() {
      if (this.editmode) {
        this.focusInput();
      }
    },
  },
  mounted(){
    if(this.currentEditMode){
      this.focusInput();
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),
  },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>