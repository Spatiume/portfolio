<template lang="pug">
.reviews-page-component
  .reviews-page-header
    h1.section-title Блок &#171Отзывы&#187
  formReview(
    v-if="mode == 'edit' || mode == 'create'",
    :mode="mode",
    :reviewToEdit="reviewToEdit",
    @close="closeFormReview",
    @create="createNewReview",
    @edit="editCurrentReview"
  )
  .reviews__list
    squareBtn.reviews__item(
      @click="(mode = 'create'), (reviewToEdit = {})",
      title="Добавить отзыв",
      v-show="mode != 'create'"
    )
    .reviews__item(v-for="review in reviews", :key="review.id")
      review(
        :review="review",
        @onChange="sendForEditReview",
        @remove="removeCurrentReview",
        :class="{ 'disabled-current-item': review.id == reviewToEdit.id }"
      )
</template>

<script>
import review from "./../components/review";
import squareBtn from "./../components/button/types/squareBtn";
import formReview from "./../components/formReview";
import { mapActions, mapState } from "vuex";
import addNotification from "./../mixins/addNotification";
export default {
  mixins: [addNotification],
  components: { review, squareBtn, formReview },
  data() {
    return {
      mode: "",
      reviewToEdit: {},
    };
  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.reviews,
    }),
  },
  methods: {
    sendForEditReview(currentReview) {
      this.reviewToEdit = currentReview;
      this.mode = "edit";
    },
    closeFormReview() {
      this.mode = "";
      this.reviewToEdit = {};
    },
    ...mapActions("reviews", [
      "addReview",
      "editReview",
      "fetchReviews",
      "removeReview",
    ]),
    async createNewReview(newReview) {
      try {
        await this.addReview(newReview);
        this.mode = "";
        this.addNotification("Отзыв успешно добавлен");
      } catch (error) {
        this.addNotification(error.message, "error");
      }
    },
    async editCurrentReview(editedReview) {
      try {
        await this.editReview(editedReview);
        this.mode = "";
        this.reviewToEdit = {};
        this.addNotification("Отзыв успешно обновлен");
      } catch (error) {
        this.addNotification(error.message, "error");
      }
    },
    async removeCurrentReview(reviewToRemoveId) {
      try {
        await this.removeReview(reviewToRemoveId);
        this.addNotification("Отзыв успешно удален");
      } catch (error) {
        this.addNotification(error.message, "error");
      }
    },
  },
  created() {
    this.fetchReviews();
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
.reviews__list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -3%;

  .reviews__item {
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