export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async addSkill({ commit }, skill) {
      try {
        const { data } = await this.$axios.post("/skills", skill);
        commit("categories/ADD_SKILL", skill, { root: true })
      } catch (error) {
        console.log(error);
        throw new Error(this.generateStdError(error))
      }
    },
    async removeSkill({ commit }, skillToRemove) {
      try {
        console.log(skillToRemove.id);
        const { data } = await this.$axios.delete(`/skills/${skillToRemove.id}`);
        commit("categories/REMOVE_SKILL", skillToRemove, { root: true })
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async editSkill({ commit }, skillToEdit) {
      try {
        const { data } = await this.$axios.post(`/skills/${skillToEdit.id}`, skillToEdit);
        commit("categories/EDIT_SKILL", skillToEdit, { root: true })
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
  },
  getters: {},
}