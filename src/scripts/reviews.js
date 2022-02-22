import Vue from "vue";

const screenWidth = window.screen.width;

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
    currentReviewFirst() {
      return this.reviewsData[this.currentIndex];
    },
    currentReviewSecond() {
      return this.reviewsData[this.currentIndex + 1];
    },
    currentReview() {
      if (screenWidth>480){
        return [this.currentReviewFirst, this.currentReviewSecond];
      } else{
        return [this.currentReviewFirst];
      }
    },
    maxCurrentIndex(){
      if (screenWidth>480){
        return this.reviewsData.length-2;
      } else {
        return this.reviewsData.length-1;
      }
      
    }
  },
  watch: {
    currentIndex(value) {
      this.allowSliderToWork(value);
    },
  },
  methods: {
    allowSliderToWork(value) {
      // const reviewAmountFromZero = this.reviewsData.length - 2;
      if (value > this.maxCurrentIndex) {
        this.currentIndex = this.maxCurrentIndex;
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