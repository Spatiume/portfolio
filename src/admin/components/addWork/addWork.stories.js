import addWork from "./addWork.vue";

export default {
  title: "addWork",
  components: {addWork}
}

export const defaultView = () => ({
  components: { addWork },
  template: `
    <addWork />
  `
});

defaultView.story = {
  name: "Стандартный вид",
};
