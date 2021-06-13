export const actions = {
  async fetchVideoDetails() {
    let data = await this.$axios.$get(
      `/api/video/${this.$router.history.current.params.id}`
    );
    return data;
  }
};
