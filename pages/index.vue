<template>
  <div>
    <h1 class="font-bold uppercase text-lg mt-4">How to use:</h1>
    <p>
      Paste the link to your favorite youtube video in the form below then press
      search or click any of the example links below.
    </p>
    <form
      action=""
      method="get"
      @submit.prevent="search"
      class="m-auto flex flex-col"
    >
      <label for="youtube-link" class="uppercase font-bold pt-2"
        >Youtube link:</label
      >
      <input
        type="text"
        placeholder="e.g: https://www.youtube.com/watch?v=XqZsoesa55w"
        name="youtube-link"
        class="p-2 border-2"
        v-model="videoLink"
      />
      <button
        type="submit"
        class="bg-indigo-700 uppercase font-semibold text-white p-3"
      >
        search
      </button>
    </form>

    <Examples />
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLink:"",
    };
  },
  methods: {
    search() {
      if (this.videoId) {
        this.$router.push(`/details/${this.videoId}`);
      } else {
        alert("Provided youtube link is invalid");
      }
    },
  },
  computed: {
    videoId: function () {
      let parsedVideoLink = "";

      try {
        parsedVideoLink = new URL(this.videoLink.trim());
      } catch (_) {
        parsedVideoLink = "";
      }
      if (parsedVideoLink.hostname == "youtu.be" && parsedVideoLink.pathname) {
        return parsedVideoLink.pathname.slice(1);
      } else if (
        parsedVideoLink.hostname == "www.youtube.com" &&
        parsedVideoLink.searchParams.has("v")
      ) {
        return parsedVideoLink.searchParams.get("v");
      }
    },
  },
};
</script>