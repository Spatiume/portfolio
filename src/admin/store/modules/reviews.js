export default {
  namespaced: true,
  state: {
    reviews: [],
    userData: {
      id: 13,
    }
  },
  mutations: {
    SET_USERDATA(state, userData) {
      state.userData = userData;
    },
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    ADD_REVIEW(state, newReview) {
      state.reviews.push(newReview);
    },
    REMOVE_REVIEW(state, reviewToRemoveId) {
      state.reviews = state.reviews.filter(review => review.id !== reviewToRemoveId);
    },
    EDIT_REVIEW(state, editedReview) {
      state.reviews = state.reviews.map(review => review.id === editedReview.id ? editedReview : review)
    },
  },
  actions: {
    async addReview({ commit }, newReview) {
      const formData = new FormData();
      Object.keys(newReview).forEach((key) => {
        const value = newReview[key];
        formData.append(key, value);
      });

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async fetchReviews({ commit, state }) {
      try {
        const { data } = await this.$axios.get(`/reviews/${state.userData.id}`)
        commit("SET_REVIEWS", data);
        console.log("update reviews : ", data);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async removeReview({ commit }, reviewToRemoveId) {
      try {
        const { data } = await this.$axios.delete(`/reviews/${reviewToRemoveId}`);
        commit("REMOVE_REVIEW", reviewToRemoveId);
      } catch (error) {
        throw new Error(this.generateStdError(error))
      }
    },
    async editReview({ commit }, editedReview) {

      const formData = new FormData();
      Object.keys(editedReview).forEach((key) => {
        const value = editedReview[key];
        formData.append(key, value);
      });

      try {
        const { data } = await this.$axios.post(`/reviews/${editedReview.id}`, formData);
        commit("EDIT_REVIEW", data.review);
      } catch (error) {
        throw new Error(this.generateStdError(error));
      }
    }

  },
  getters: {},
};