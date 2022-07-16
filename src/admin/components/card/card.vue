<template lang="pug">
.card-component.card_plain(v-if="simple")
  slot(name="default")
.card-component(v-else="")
  .header
    .text(v-text="title")
    slot(name="title" v-if="!!title === false")
  .content
    slot(name="content")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "" 
    },
    simple: Boolean
  }
};
</script>


<style lang="postcss" src="./card.pcss" scoped>
</style>

