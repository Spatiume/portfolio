<template lang="pug">
.reviews-page-component
  .reviews-page-header
    h1.section-title Блок &#171Отзывы&#187
  input(type="input", v-model="notification.text")
  formReview(
    v-if="mode == 'edit' || mode == 'create'",
    :mode="mode",
    :reviewToEdit="reviewToEdit",
    @close="closeFormReview",
    @create="createNewReview",
    @edit="editCurrentReview"
  )
  .reviews__list
    squareBtn.reviews__item(@click="(mode = 'create'), (reviewToEdit = {})")
    .reviews__item(v-for="review in reviews", :key="review.id")
      review(
        :review="review",
        @onChange="sendForEditReview",
        @remove="removeCurrentReview",
        :class="{ 'disabled-current-item': review.id == reviewToEdit.id }"
      )
  notification(
    v-if="notification.text"
    :text="notification.text",
    @click="clearNotification",
    :type="notification.type"
  )
</template>

<script>
import review from "./../components/review";
import squareBtn from "./../components/button/types/squareBtn";
import formReview from "./../components/formReview";
import { mapActions, mapState } from "vuex";
import notification from "./../components/notification";

export default {
  components: { review, squareBtn, formReview, notification },
  data() {
    return {
      mode: "",
      reviewToEdit: {},
      notification: {
        text: "",
        type: "success",
      },
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
    clearNotification() {
      this.notification.text = "";
      this.notification.type = "";
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
        this.notification.text = "Отзыв успешно добавлен";
      } catch (error) {
        console.log(error);
      }
    },
    async editCurrentReview(editedReview) {
      try {
        await this.editReview(editedReview);
        this.mode = "";
        this.reviewToEdit = {};
        this.notification.text = "Отзыв успешно обновлен";
      } catch (error) {
        console.log(error);
      }
    },
    async removeCurrentReview(reviewToRemoveId) {
      try {
        await this.removeReview(reviewToRemoveId);
        this.notification.text = "Отзыв успешно удален";
      } catch (error) {
        console.log(error);
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