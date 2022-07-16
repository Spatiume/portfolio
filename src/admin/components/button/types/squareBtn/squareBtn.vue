<template lang="pug">
button.square-btn-component(type="button", v-on="$listeners")
  .text
    .sign
    .title {{ title }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Добавить работу",
    },
  },
};
</script>

<style lang="postcss" scoped src="./squareBtn.pcss"></style>