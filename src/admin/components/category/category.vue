<template lang="pug">
.category-component
  .category-title
    editLine(:value="title" )
  ul.skills-list
    li.skills-item(v-for="skill in skills", :skillsLength="skillsLength")
      skill(:title="skill.title", :percent="skill.percent")
  .addNewSkill
    skillAddLine(@createNewSkill="addNewSkill($event)")
</template>

<script>
import editLine from "./../editLine";
import skill from "./../skill";
import skillAddLine from "./../skillAddLine";
import iconedBtn from "./../button/types/iconedBtn";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    skills: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { skill, skillAddLine, editLine, iconedBtn },
  data() {
    return {
      skillsLength: 0,
    };
  },
  computed: {},
  methods: {
    addNewSkill(newSkillData) {
      this.skillsLength = this.skills.length;
      this.skills[this.skillsLength] = {
        id: this.skillsLength + 1,
        title: newSkillData.title,
        percent: newSkillData.percent,
      };
    },
  },
  created() {
    if (this.empty == true) {
      this.title = "";
      this.skills = [];
    }
  },
};
</script>


<style lang="postcss" scoped >
.category-component {
  color: grey;
  padding: 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.category-title {
  font-size: 24px;
  border-bottom: 2px solid rgba(156, 156, 156, 0.4);
  padding-bottom: 16px;
}

.skills-item {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.addNewSkill {
  margin-top: auto;
  padding-left: 20%;
}
</style>
