export default {
  namespaced: true,
  state: {
    categories: [],
    userData: {
      id: 13,
    }
  },
  mutations: {
    SET_USERDATA(state, userData) {
      state.userData = userData;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_CATEGORY(state, newCategory) {
      newCategory = { ...newCategory, ...{ skills: [] } };
      // в ответе от сервера приходит объект без скиллов, поэтому добавляем его самостоятельно
      state.categories.unshift(newCategory);
    },
    REMOVE_CATEGORY(state, categoryToRemoveId) {
      state.categories = state.categories.filter(category => category.id !== categoryToRemoveId);
    },
    EDIT_CATEGORY(state, editedCategory) {
      state.categories = state.categories.map(category => category.id === editedCategory.id ? editedCategory : category)
    },
    ADD_SKILL(state, newSkill) {
      state.categories = state.categories.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category
      })
    },
    REMOVE_SKILL(state, skillToRemove) {
      const findCategory = (category) => {
        if (category.id === skillToRemove.category) {
          removeSkillInCategory(category);
        }
        return category;
      }
      const removeSkillInCategory = (category) => {
        category.skills = category.skills.filter(
          (skill) => skill.id !== skillToRemove.id);
      }
      state.categories = state.categories.map(findCategory)
    },
    EDIT_SKILL(state, skillToEdit) {
      const findCategory = (category) => {
        if (category.id === skillToEdit.category) {
          editSkillInCategory(category);
        }
        return category;
      }
      const editSkillInCategory = (category) => {
        category.skills = category.skills.map(
          (skill) => skill.id === skillToEdit.id ? skillToEdit : skill);
      }
      state.categories = state.categories.map(findCategory)
    }
  },
  actions: {
    async addCategory({ commit }, title) {
      try {
        const { data } = await this.$axios.post("/categories", { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async fetchCategories({ commit, state }) {
      try {
        const { data } = await this.$axios.get(`/categories/${state.userData.id}`)
        commit("SET_CATEGORIES", data);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async removeCategory({ commit }, categoryToRemoveId) {
      try {
        const { data } = await this.$axios.delete(`/categories/${categoryToRemoveId}`);
        commit("REMOVE_CATEGORY", categoryToRemoveId);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async editCategoryTitle({ commit }, editedCategory) {
      try {
        const { data } = await this.$axios.post(`/categories/${editedCategory.id}`, { title: editedCategory.category });
        commit("EDIT_CATEGORY", editedCategory);
      } catch (error) {
        throw new Error(this.generateStdError(error));
      }
    }

  },
  getters: {},
};