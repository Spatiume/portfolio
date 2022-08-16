import Vue from 'vue';
import App from './App.vue'
import "./main.pcss";
import router from './router';
import store from './store';
import $axios from "./requests";
import { generateStdError } from "./helpers/errorHendler"
import VueSimpleValidator from 'simple-vue-validator';
import directives from "./directives/"

Vue.use(VueSimpleValidator);


directives.forEach(directive => {
  Vue.directive(directive.name, directive)
})


store.$axios = $axios;
store.generateStdError = generateStdError;


new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});