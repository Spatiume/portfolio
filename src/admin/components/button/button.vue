<template lang="pug">
component(:is="type", v-bind="$attrs", v-on="$listeners" type="typeBtn") 
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default",
    },
    typeBtn: {
      type: String,
      default: "button"
    },
  },
  components: {
    default: () => import("./types/defaultBtn"),
    square: () => import("./types/squareBtn"),
    iconed: () => import("./types/iconedBtn"),
    round: () => import("./types/roundBtn"),
  },
};
</script>