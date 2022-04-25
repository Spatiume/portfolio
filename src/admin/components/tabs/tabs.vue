<template lang="pug">
.tabs-component
  ul.list
    li.item(
      v-for="tab in tabs",
      :key="tab.id",
      :class="{ active: activeTabId == tab.id }"
    )
      button.btn(type="button", @click="handleChange(tab)") {{ tab.title }}
</template>

<script>
const tabs = [
  { id: 0, title: "Обо мне" },
  { id: 1, title: "Работы" },
  { id: 2, title: "Отзывы" },
];
export default {
  data() {
    return {
      tabs,
      activeTabId: 0,
    };
  },
  methods: {
    handleChange(tab){
      this.activeTabId = tab.id;
      this.$emit("tabChanged", tab);
    }
  },
};
</script>

<style lang="postcss" scoped src="./tabs.pcss"></style>