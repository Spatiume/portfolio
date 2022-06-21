<template lang="pug">
.avatar-component(:style="measures")
  img.image(v-bind="$attrs", alt="user picture")
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: "3",
    },
  },
  computed: {
    measures() {
      const size = Number(this.size);
      return {
        width: `${size}rem`,
        height: `${size}rem`,
      };
    },
  },
};
</script>
<style lang="postcss" scoped src="./avatar.pcss"></style>