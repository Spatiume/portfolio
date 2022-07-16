<template lang="pug">
button.button-component(v-on="$listeners") {{ title }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Добавить группу",
    },
  },
};
</script>


<style lang="postcss" scoped src="./iconedBtn.pcss"></style>