<template lang="pug">
button(
  :class="['default-btn-container', 'btn-decorator', { disabled }, { plain }]",
  v-if="typeAttr === 'button'",
  v-on="$listeners",
  :disabled="disabled"
) {{ title }}
label.btn-file-container(v-else-if="typeAttr === 'file'")
  .btn-file-fake.btn-decorator {{ title }}
  input.btn-file-input(type="file", v-on="$listeners")
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Отправить",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: Boolean,
    typeAttr: {
      type: String,
      default: "button",
      validator: (value) => ["button", "file"].includes(value),
    },
  },
};
</script>

<style lang="postcss" scoped src="./defaultBtn.pcss"></style>