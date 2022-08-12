import formWork from "./formWork.vue";

export default {
  title: "formWork",
  components: {formWork}
}

export const defaultView = () => ({
  components: { formWork },
  template: `
    <formWork />
  `
});

defaultView.story = {
  name: "Стандартный вид",
};
