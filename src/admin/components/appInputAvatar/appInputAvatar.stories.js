import appInputAvatar from "./appInputAvatar.vue";



export default {
  title: "appInputAvatar",

}

export const defaultView = () => ({
  components: { appInputAvatar },
  template: `
    <appInputAvatar 
    />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}