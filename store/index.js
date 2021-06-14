export const actions = {
  async fetchVideoDetails() {
    let data = await this.$axios.$get(
      `https://youtube-counts.vercel.app/api/video/${this.$router.history.current.params.id}`
    );
    return data;
  }
};
