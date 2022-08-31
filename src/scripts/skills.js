import Vue from 'vue';
import axios from "axios";

const requests = axios.create({
  baseURL: "https://webdev-api.loftschool.com/",
});

const userId = 13;

const skill = {
  template: "#skill",
  props: ["skill"],
  methods: {
    drawColoredCircle() {
      const circle = this.$refs["circle"];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const percent = (dashArray / 100) * (100 - this.skill.percent);

      circle.style.strokeDashoffset = percent;
    }
  },
  mounted() {
    this.drawColoredCircle();

  },
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skill,
  },
  props: ["category"]
}

new Vue({
  el: '#skills-component',
  template: '#skills-list',
  components: {
    skillsRow,
  },
  data() {
    return {
      skills: []
    }
  },
  async created() {
    try {
      const { data } = await requests.get(`/categories/${userId}`);
      this.skills = data;
    } catch (error) {
      //если сервер прислал ошибку, то возьмем свои данные 

      const data = require("../data/skills.json");
      this.skills = data;
    }
  }

});