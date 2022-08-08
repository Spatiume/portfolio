<template lang="pug">
label.input(
  v-if="fieldType === 'input'",
  :class="[\ { input_labeled: !!title, 'no-side-paddings': noSidePaddings },\ iconClass,\ { error: !!errorMessage },\ ]"
)
  .title(v-if="title") {{ title }}
  input.input__elem.field__elem(
    v-bind="$attrs",
    :value="value",
    @input="$emit('input', $event.target.value)"
  )
  .input__error-tooltip
    tooltip(:text="errorMessage")
label.textarea(
  v-else-if="fieldType === 'textarea'",
  :class="{ error: !!errorMessage }"
)
  .title(v-if="title") {{ title }}
  textarea.textarea__elem.field__elem(
    :value="value",
    v-bind="$attrs",
    :class="{ error: !!errorMessage }",
    @input="$emit('input', $event.target.value)"
  )
  .input__error-tooltip
    tooltip(:text="errorMessage")
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    noSidePaddings: Boolean,
    fieldType: {
      type: String,
      default: "input",
    },
    value: String | Number,
    icon: {
      type: String,
      default: "",
      validator: (value) => ["", "user", "key"].includes(value),
    },
  },
  computed: {
    iconClass() {
      const iconName = this.icon;
      return iconName.length ? ` input_iconed input_icon-${iconName}` : "";
    },
  },
  components: {
    tooltip: () => import("./../tooltip"),
  },
};
</script>

<style lang="postcss" scoped src="./input.pcss"></style>