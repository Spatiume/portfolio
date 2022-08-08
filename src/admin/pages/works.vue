<template lang="pug">
.works-page-component
  .works-page-header
    h1.section-title Блок &#171Мои работы&#187
  addWork(
    v-if="mode == 'edit' || mode == 'create'",
    :mode="mode",
    :workToEdit="workToEdit",
    @closeAddWork="closeAddWork",
    @createAddWork="mode = ''",
    @editAddWork="(mode = ''), (workToEdit = {})"
  )
  .works__list
    squareBtn.works__item(@click="(mode = 'create'), (workToEdit = {})")
    .works__item(v-for="work in works", :key="work.id")
      work(
        :work="work",
        @onChange="editCurrentWork",
        @remove="removeCurrentWork",
        :class="{ 'disabled-current-item': work.id == workToEdit.id }"
      )
</template>

<script>
import work from "./../components/work";
import squareBtn from "./../components/button/types/squareBtn";
import addWork from "./../components/addWork";
import { mapActions, mapState } from "vuex";

export default {
  components: { work, squareBtn, addWork },
  data() {
    return {
      mode: "",
      workToEdit: {},
    };
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.works,
    }),
  },
  methods: {
    editCurrentWork(currentWork) {
      this.workToEdit = currentWork;
      this.mode = "edit";
    },
    closeAddWork() {
      this.mode = "";
      this.workToEdit = {};
    },
    ...mapActions("works", ["fetchWorks", "removeWork"]),
    async removeCurrentWork(workToRemoveId) {
      try {
        await this.removeWork(workToRemoveId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchWorks();
  },
};
</script>
<style lang="postcss" scoped>
@import "./../../styles/mixins.pcss";

.section-title {
  /* margin-left: 20px; */
  padding: 3%;
}

.disabled {
  opacity: 0.9;
}

.disabled-current-item {
  user-select: none;
  pointer-events: none;
  opacity: 0.5;
}
.works__list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -3%;

  .works__item {
    width: 30%;

    margin-left: 2%;
    margin-top: 2%;

    height: auto;

    @include desktop {
      width: 48%;
    }
    @include tablets {
      width: 100%;
    }
  }
}
</style>