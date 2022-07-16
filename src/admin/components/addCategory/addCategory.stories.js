import addCategory from "./addCategory.vue";



export default {
  title: "addCategory",

}

export const defaultView = () => ({
  components: { addCategory },
  template: `
    <addCategory 
    />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}