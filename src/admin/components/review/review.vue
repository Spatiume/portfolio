<template lang="pug">
.review
  .review-top
    .review-top__left-col
      .review__pic
        img(:src="renderedPhoto")
    .review-top__right-col
      .review__author
        .review__name {{ review.author }}
        .review__occ {{ review.occ }}
  .review__text {{ review.text }}
  .review__btn
    icon(
      symbol="pencil",
      title="Изменить",
      btnTitle="Изменить",
      grayscale,
      @click="onChange"
    ) 
    icon(
      symbol="cross",
      title="Удалить",
      btnTitle="Удалить",
      grayscale,
      @click="remove"
    ) 
</template>
<script>
import icon from "../icon";
import tag from "../tag";
import { getAbsoluteImgPath } from "../../helpers/pictures";

export default {
  props: {
    review: {
      type: Object,
      default: {},
    },
  },
  components: {
    icon,
    tag,
  },
  computed: {
    renderedPhoto() {
      return getAbsoluteImgPath(this.review.photo);
    },
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.review);
    },
    remove() {
      this.$emit("remove", this.review.id);
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "./../../../styles/mixins.pcss";

.review {
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  height: 100%;
  min-height: 380px;
  padding: 0 5%;
  background: white;
}

.review-top {
  display: flex;
  border-bottom: 1px solid rgba(126, 126, 126, 0.63);
  padding: 5%;
  .review-top__left-col {
    margin-right: 20px;
  }

  .review-top__right-col {
    display: flex;
    flex: 1;
    align-items: center;
    word-break: break-all;
  }
}
.review__pic {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}

.review__author {
  .review__name {
    font-weight: 700;
    /* margin-bottom: 10px; */
  }

  .review__occ {
    opacity: 0.6;
    font-weight: 600;
    flex: 1;
  }
}

.review__text{
  padding: 5%;
  font-weight: 600;
  flex: 1;
}


.review__btn {
  padding: 5%;
  display: flex;
  justify-content: space-between;

  :first-child {
    margin-right: 10px;
  }
}
</style>