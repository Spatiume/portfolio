<template lang="pug">
.tag(v-if="title.trim()")
  .tag__title {{ title }}
  icon.tag__button(
    grayscale,
    symbol="cross",
    title="Удалить",
    @click="$emit('remove', title, index)"
  )
</template>

<script>
import icon from "./../icon";
export default {
  components: {
    icon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="postcss" scoped>
.tag {
  white-space: nowrap;
  padding: 6px 20px;
  border-radius: 50px;
  color: rgba(40, 51, 64, 0.5);
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  background: rgba(203, 220, 238, 0.5);
  display: flex;
  align-items: center;
}

.tag__title {
  margin-right: 10px;
}
</style>