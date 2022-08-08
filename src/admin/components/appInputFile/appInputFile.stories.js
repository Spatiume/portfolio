import appInputFile from "./appInputFile.vue";



export default {
  title: "appInputFile",

}

export const defaultView = () => ({
  components: { appInputFile },
  template: `
    <appInputFile 
    />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}