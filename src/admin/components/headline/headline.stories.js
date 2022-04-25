import headline from "./headline.vue";

export default {
  title: "headline",

}

export const defaultView = () => ({
  components: { headline },
  template: `
    <headline 
    />
  `,
});

export const withContent = () => ({
  components: { headline },
  template: `
    <headline>
      <div> С содержимым </div>
    </headline>
  `,
});

withContent.story = {
  name: "С содержимым"
};

defaultView.story = {
  name: "Стандартный вид"
}
