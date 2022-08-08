export default {
  namespaced: true,
  state: {
    works: [],
    userData: {
      id: 13,
    }
  },
  mutations: {
    SET_USERDATA(state, userData) {
      state.userData = userData;
    },
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
    // ADD_SKILL(state, newSkill) {
    //   state.categories = state.categories.map(category => {
    //     if (category.id === newSkill.category) {
    //       category.skills.push(newSkill);
    //     }
    //     return category
    //   })
    // },
    // REMOVE_SKILL(state, skillToRemove) {
    //   const findCategory = (category) => {
    //     if (category.id === skillToRemove.category) {
    //       removeSkillInCategory(category);
    //     }
    //     return category;
    //   }
    //   const removeSkillInCategory = (category) => {
    //     category.skills = category.skills.filter(
    //       (skill) => skill.id !== skillToRemove.id);
    //   }
    //   state.categories = state.categories.map(findCategory)
    // },
    // EDIT_SKILL(state, skillToEdit) {
    //   const findCategory = (category) => {
    //     if (category.id === skillToEdit.category) {
    //       editSkillInCategory(category);
    //     }
    //     return category;
    //   }
    //   const editSkillInCategory = (category) => {
    //     category.skills = category.skills.map(
    //       (skill) => skill.id === skillToEdit.id ? skillToEdit : skill);
    //   }
    //   state.categories = state.categories.map(findCategory)
    // }
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
    async fetchWorks({ commit, state }) {
      try {
        const { data } = await this.$axios.get(`/works/${state.userData.id}`)
        commit("SET_WORKS", data);
        console.log("update works : ", data);
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
        console.log(data);
        commit("EDIT_WORK", data.work);
      } catch (error) {
        throw new Error(this.generateStdError(error));
      }
    }

  },
  getters: {},
};