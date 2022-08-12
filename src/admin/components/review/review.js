import review from "./review.vue";
import reviews from '../../../data/reviews.json';

const exampleReview = reviews[0];


export default {
  title: "review",

}

export const defaultView = () => ({
  components: { review },
  data() {
    return {
      exampleReview: exampleReview,
    }
  },
  template: `
    <review
    width="400px"
    :review="exampleReview"
    />
    `,
  // :title="title"
  // :skills="skills"
});

defaultView.story = {
  name: "Стандартный вид"
}