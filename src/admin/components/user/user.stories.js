import user from "./user.vue";
import avatar from "./../avatar"
import { bgBlueDecorator } from "./../../../../.storybook/decorators";

export default {
  title: "user",
  decorators: [bgBlueDecorator]

}

export const defaultView = () => ({
  components: { user },
  template: `
    <user 
    username="Pavel Sysoev"
    />
  `,
});

export const withAvatarView = () => ({
  components: { user, avatar },
  template: `
    <user 
    username="Pavel Sysoev">
      <avatar src="https://picsum.photos/300/300" />
    </user>
  `,
});

defaultView.story = {
  name: "Без аватара"
}

withAvatarView.story = {
  name: "С аватаром"
}
