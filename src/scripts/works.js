import Vue from "vue";
import axios from "axios";

const requests = axios.create({
  baseURL: "https://webdev-api.loftschool.com",
});
const baseURL = "https://webdev-api.loftschool.com";
const userId = 13;

const btns = {
  template: "#slider-btns",
};
const thumbs = {
  template: "#slider-thumbs",
  props: ["works", "currentWork", "worksForThumbs"],
  computed: {
    reversedWorks() {
      const works = [...this.worksForThumbs];
      return works.reverse();
    }
  }
};

const display = {
  template: "#slider-display",
  components: { thumbs, btns },
  props: ["currentWork", "works", "currentIndex", "worksForThumbs"],
  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.reverse();
    }
  }
};

const tags = {
  template: "#slider-tags",
  props: ["tags"]
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: ["currentWork", "isLoading"],
  computed: {
    tagsArray() {
      return this.currentWork.techs.split(",");
    }
  },
  created() {
    // console.log(this.currentWork);
  },
};

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: { display, info },
  data() {
    return {
      works: [],
      currentIndex: 0,
      isLoading: false,
    };
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    },
    worksWithId() {
      return this.works.map((item, index) => {
        item.id = index
        return item;
      });
    },
    worksForThumbs() {
      let minIndex = 0;
      let maxIndex = 3;
      if (this.currentIndex > 2) {
        minIndex = this.currentIndex - 2;
        return this.worksWithId.slice(minIndex, this.currentIndex + 1)
      }
      return this.worksWithId.slice(minIndex, maxIndex);
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForIndex(value);
    },
  },
  methods: {
    changeSlideByThumbs(newIndex) {
      const newCurrentIndex = newIndex;
      this.currentIndex = newCurrentIndex;
    },
    makeInfiniteLoopForIndex(value) {
      const worksAmountFromZero = this.works.length - 1;
      if (value > worksAmountFromZero) {
        this.currentIndex = 0;
      }
      if (value < 0) {
        this.currentIndex = worksAmountFromZero;
      }
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
      }
    },
    makeArrWithRequireImages(array) {
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
    }
  },

  async mounted() {
    this.isLoading = false;
    try {
      const { data } = await requests.get(`/works/${userId}`);
      this.works = this.makeArrWithAbsoluteImgPath(data);
      this.isLoading = true;
      console.log(this.works);
    } catch (error) {
      //если сервер прислал ошибку, то возьмем свои данные 
      const data = require("../data/works.json");
      this.works = this.makeArrWithRequireImages(data);
      console.log(error);
      this.isLoading = true;
    }
  }
});
