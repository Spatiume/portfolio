<template lang="pug">
.skills-group
  ul.skills-list
    li.skills-item
      pre {{category}}
      //- skill
</template>

<script>
import skill from "./../skill";

export default {
  props: {
    category: Object,
  },
  components: { skill },
};
</script>

<style lang="postcss" scoped>
</style>