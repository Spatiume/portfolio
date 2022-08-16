import { mapActions } from "vuex"

export default {
  methods: {
    ...mapActions("notification", ["changeNotification"]),
    addNotification(text, type) {
      if (!type) {
        // успешно по умолчанию
        type = "success";
      }
      const newNotification = {
        text: text,
        type: type,
      };
      this.changeNotification(newNotification);
    },
  }
}