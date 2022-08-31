export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
    CLEAR_USER: state => (state.user = {})
  },
  getters: {
    userIsLoggedIn: state => {
      const userObj = state.user;
      const userObjectIsEmpty =
        Object.keys(userObj).length === 0 && userObj.constructor === Object;
      //проверка является ли этот объект объектом, и не пустой ли он
      // если пустой то незалогинен пользователь, если не пустой то залогинен
      return userObjectIsEmpty === false;
    },
    getUserId: state => {
      return state.user.id;
    }
  },
  actions: {
    logout({ commit }) {
      commit("CLEAR_USER");
      localStorage.clear();
      // можем использовать delete Item, но у нас только token, так что используем clear
    }
  }
};
