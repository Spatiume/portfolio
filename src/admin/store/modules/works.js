export default {
  namespaced: true,
  state: {
    works: [],
  },
  mutations: {
    SET_WORKS(state, works) {
      state.works = works;
    },
    ADD_WORK(state, newWork) {
      state.works.push(newWork);
    },
    REMOVE_WORK(state, workToRemoveId) {
      state.works = state.works.filter(work => work.id !== workToRemoveId);
    },
    EDIT_WORK(state, editedWork) {
      state.works = state.works.map(work => work.id === editedWork.id ? editedWork : work)
    },
  },
  actions: {
    async addWork({ commit }, newWork) {
      try {
        const formData = new FormData();
        Object.keys(newWork).forEach((key) => {
          const value = newWork[key];
          formData.append(key, value);
        });
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async fetchWorks({ commit, getters }) {
      const userId = getters.userId;
      try {
        const { data } = await this.$axios.get(`/works/${userId}`)
        commit("SET_WORKS", data);
        // console.log("update works : ", data);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async removeWork({ commit }, workToRemoveId) {
      try {
        const { data } = await this.$axios.delete(`/works/${workToRemoveId}`);
        commit("REMOVE_WORK", workToRemoveId);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async editWork({ commit }, editedWork) {

      const formData = new FormData();
      Object.keys(editedWork).forEach((key) => {
        const value = editedWork[key];
        formData.append(key, value);
      });

      try {
        const { data } = await this.$axios.post(`/works/${editedWork.id}`, formData);
        commit("EDIT_WORK", data.work);
      } catch (error) {
        throw new Error(this.generateStdError(error));
      }
    }

  },
  getters: {
    userId(state, getters, rootState, rootGetters) {
      return rootGetters["user/getUserId"];
    }
  },
};