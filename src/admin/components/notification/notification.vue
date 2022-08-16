<template lang="pug">
.inner-tooltip-container(v-if="notification.text", :class="notification.type")
  .tooltip__text {{ notification.text }}
  button.tooltip__close(@click="CLEAR_NOTIFICATION")
</template>

<script>
import { mapMutations, mapState} from "vuex";

export default {
  computed: {
    ...mapState("notification", {
      notification: (state) => state.notification,
    }),
  },
  methods: {
    ...mapMutations("notification", ["CLEAR_NOTIFICATION"]),
  },
};
</script>

<style lang="postcss" scoped src="./notification.pcss"></style>