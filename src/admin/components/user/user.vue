<template lang="pug">
  .user-component
    .user-avatar
      slot
    .user-name {{username}}
</template>

<script>
import avatar from './../avatar'
export default {
  props: ['username'],
  components: {
    avatar
  }
}
</script>

<style lang="postcss" scoped src="./user.pcss"></style>