<template lang="pug">
  .headline-component
    .content
      slot
    .desc Панель администрирования
    button(type="button" @click="").logout Выйти
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>