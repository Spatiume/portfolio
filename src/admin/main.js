import Vue from 'vue';
import App from './App.vue'
import "./main.pcss";
import router from './router';
import store from './store';
import $axios from "./requests";
import { generateStdError } from "./helpers/errorHendler"

store.$axios = $axios;
store.generateStdError = generateStdError;


new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});