import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import axios from "axios";

// делаем защиту роутов, чтобы незалогиненый пользователь не мог по ним переходить

/* заводим новый экземпляр аксиоса, 
т.к. в старом экземпляре есть функционал обновления токкена 
и мы не сможем убедиться что пользователь незалогинен если отправим запрос
*/


const guard = axios.create({
  baseURL: "https://webdev-api.loftschool.com"
});

Vue.use(VueRouter);

const router = new VueRouter({ routes });

router.beforeEach(async (to, from, next) => {
  /* в объекте to, проходим циклом по matched, 
  если route или его потомки имеют в meta поле public, то это публичный route 
  на странице login public = true, на остальных он undefined, т.е. false) */
  const isPublicRoute = to.matched.some(route => route.meta.public);
  // проверяем залогинин ли пользователь 
  const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

  /* Проверяем:
  Если это не публичнй route(страница login) и пользователь не залогинен
  */

  if (isPublicRoute === false && isUserLoggedIn === false) {
    const token = localStorage.getItem("token");
    // берем токен из localStorage и кладем его в headers чтобы выполнить запрос с токена

    guard.defaults.headers["Authorization"] = `Bearer ${token}`;

    // мы должны сделать проверяющий запрос, который выдаст ошибку если пользователь не залогинен
    try {
      const { data } = await guard.get("/user");
      /* Возвращает информацию о пользователе. Только для авторизованного пользователя.
       Если юзер не авторизован, то придет ошибка.*/
      // получаем данные пользователя и заносим их в store
      store.commit("user/SET_USER", data.user);
      // продолжаем рендеринг  
      next();
    } catch (error) {
      // если ошибка, значит пользователь не залогинен 
      router.replace('/login'); // переходим на страницу login 
      localStorage.clear(); // очищаем localStorage
    }
  } else {
    // продолжаем рендеринг
    next();
  }
});

export default router;
