import work from "./work.vue";
import works from './../../../data/works.json';

const exampleWork = works[0];


export default {
  title: "work",

}

export const defaultView = () => ({
  components: { work },
  data(){
    return{
      exampleWork: exampleWork,
    }
  },
  template: `
    <work
    width="400px"
    :work="exampleWork"
    />
    `,
    // :title="title"
    // :skills="skills"
});

defaultView.story = {
  name: "Стандартный вид"
}