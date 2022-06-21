<template>
  <button
    :class="['icon-component', iconClass, {'grayscale': this.grayscale}, {'no-words' : !!btnTitle === false}]"
    :data-text="btnTitle"
    type="button"
    v-on="$listeners"
  ></button>
</template>

<script>
export default {
  props: {
    symbol: {
      type: String,
      default: "pencil",
      validator: value => ["pencil", "cross", "tick", "trash"].includes(value)
    },
    grayscale: {
      type: Boolean
    },
    btnTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconClass() {
      return `is-${this.symbol}`;
    }
  }
};
</script>

<style lang="postcss" scoped src="./icon.pcss"></style>
