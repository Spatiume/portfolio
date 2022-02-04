import Vue from "vue";


const btns = {
  template: "#reviews-slider__btns",
  props: ["currentIndex", "maxCurrentIndex"],
}

const review = {
  template: "#review",
  props: ["review"]
}

const reviews = {
  template: "#reviews",
  components: {
    review: review
  },
  props: ['currentReview']
}



new Vue({
  el: "#reviews-slider-component",
  template: "#reviews-slider",
  components: {
    btns: btns,
    reviews: reviews,
  },
  data() {
    return {
      reviewsData: [],
      currentIndex: 0
    }
  },

  computed: {
    currentReviewLeft() {
      return this.reviewsData[this.currentIndex];
    },
    currentReviewRight() {
      return this.reviewsData[this.currentIndex + 1];
    },
    currentReview() {
      return [this.currentReviewLeft, this.currentReviewRight];
    },
    maxCurrentIndex(){
      return this.reviewsData.length-2;
    }
  },
  watch: {
    currentIndex(value) {
      this.allowSliderToWork(value);
    },
  },
  methods: {
    allowSliderToWork(value) {
      const reviewAmountFromZero = this.reviewsData.length - 2;
      if (value > reviewAmountFromZero) {
        this.currentIndex = reviewAmountFromZero;
      }
      if (value < 0) {
        this.currentIndex = 0;
      }
    },
    handleSlide(direction) {
      switch (direction) {
        case 'left':
          this.currentIndex--;
          break;
        case 'right':
          this.currentIndex++;
          break;
        default:
          break;
      }
    },
    makeArrWithRequiredImages(array) {
      return array.map((item) => {
        const requirePic = require(`../images/content/${item.authorPic}`).default;
        item.authorPic = requirePic;
        return item;
      });
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviewsData = this.makeArrWithRequiredImages(data);
  }
});