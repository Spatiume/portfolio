<template lang="pug">
nav.tabs-component
  ul.tabs-list
    li.tabs-item(
      v-for="tab in tabs",
      :key="tab.id",
    )
      router-link.btn(tag="button", :to="tab.href" exact-active-class="active") {{ tab.title }}
</template>

<script>
const tabs = [
  { id: 0, title: "Обо мне", href: "/" },
  { id: 1, title: "Работы", href: "/works" },
  { id: 2, title: "Отзывы", href: "/reviews" },
];
export default {
  data() {
    return {
      tabs,
      // activeTabId: 0,
    };
  },
  methods: {
    handleChange(tab) {
      this.activeTabId = tab.id;
      this.$emit("tabChanged", tab);
    },
  },
};
</script>

<style lang="postcss" scoped src="./tabs.pcss"></style>