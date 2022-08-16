export default {
  namespaced: true,
  state: {
    notification: {
      text: '',
      type: '',
    }
  },
  mutations: {
    CLEAR_NOTIFICATION(state) {
      state.notification.text = "";
      state.notification.type = "";
    },
    SET_NOTIFICATION(state, newNotification) {
      state.notification = { ...newNotification };
    },
  },
  actions: {
    changeNotification({ commit }, newNotification) {
      commit("CLEAR_NOTIFICATION");
      setTimeout(() => {
        commit("SET_NOTIFICATION", newNotification)
      }, 10);
    },
  },
  getters: {},
};