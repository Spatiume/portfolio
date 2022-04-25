import skill from "./skill.vue";
import { bgBlueDecorator } from "./../../../../.storybook/decorators";

export default {
  title: "skill",
  decorators: [bgBlueDecorator]

}

export const defaultView = () => ({
  components: { skill },
  template: `
    <skill 
    title="Pavel Sysoev"
    percent="50"
    />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}