<template lang="pug">
.inner-tooltip-container(:class="type")
  .tooltip__text {{text}}
  button.tooltip__close(v-on="$listeners")
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "success"
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="postcss" scoped src="./notification.pcss"></style>