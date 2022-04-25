import category from "./category.vue";
import categories from './../../../data/skills.json';

const skills = categories[0].skills;


export default {
  title: "category",

}

export const defaultView = () => ({
  components: { category },
  data(){
    return{
      title: "FrontEnd",
      skills: skills,
    }
  },
  template: `
    <category 
    :title="title"
    :skills="skills"
    />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}