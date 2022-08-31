import Vue from "vue";
import axios from "axios";
import { debounce } from "simple-vue-validator/src/utils";

const requests = axios.create({
  baseURL: "https://webdev-api.loftschool.com",
});
const baseURL = "https://webdev-api.loftschool.com";
const userId = 13;

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
  props: ['currentReview', 'isLoading']
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
      currentIndex: 0,
      isLoading: false,
      // width: 0,
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
      if (screenWidth > 480) {
        return [this.currentReviewFirst, this.currentReviewSecond];
      } else {
        return [this.currentReviewFirst];
      }
    },
    maxCurrentIndex() {
      if (screenWidth > 480) {
        return this.reviewsData.length - 2;
      } else {
        return this.reviewsData.length - 1;
      }
    },
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
        const requirePic = require(`../images/content/${item.photo}`).default;
        item.photo = requirePic;
        return item;
      });
    },
    makeArrWithAbsoluteImgPath(array) {
      return array.map((item) => {
        item.photo = `${baseURL}/${item.photo}`;
        return item;
      })
    },
    // updateWidth() {
    //   this.width = window.innerWidth;
    //   console.log(this.width);
    // },
  },
  async mounted() {
    // window.addEventListener('resize', this.updateWidth);
    this.isLoading = false;
    try {
      const { data } = await requests.get(`/reviews/${userId}`);
      this.reviewsData = this.makeArrWithAbsoluteImgPath(data);
      this.isLoading = true;
      // console.log(this.reviewsData);
    } catch (error) {
      //если сервер прислал ошибку, то возьмем свои данные 
      const data = require("../data/reviews.json");
      this.reviewsData = this.makeArrWithRequiredImages(data);
      console.log(error);
      console.log('Загружаем свои данные')
      this.isLoading = true;

    }
  }
});