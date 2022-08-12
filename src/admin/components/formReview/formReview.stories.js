import formReview from "./formReview.vue";

export default {
  title: "formReview",
  components: {formReview}
}

export const defaultView = () => ({
  components: { formReview },
  template: `
    <formReview />
  `
});

defaultView.story = {
  name: "Стандартный вид",
};
