<template>
<div>
    <div v-if="error"><Error :message="error"/></div>
    <div v-if="offline" class="bg-white m-auto max-w-4xl rounded p-4 text-center">
      <h1>You appear to be offline</h1>
      <p>Data will be displayed once you're back onLine</p>
    </div>
  <div v-if="data.snippet && !error">
    <Nav />
    <div
      class="p-4"
      :style="{ 'background-image': 'url(/Protruding-Squares.svg)' }"
    >
      <img
        class="
          mx-auto
          rounded-full
          object-cover
          w-40
          h-40
          border-blue-600 border-4
        "
        :src="data.snippet.thumbnails.medium.url"
        :alt="data.snippet.title"
      />
    </div>
    <div class="text-center pt-4 font-bold bg-white">
      <h1 class="font-bold">{{ data.snippet.title }}</h1>
      <p>Posted by: {{ data.snippet.channelTitle }}</p>
      <p class="text-5xl p-4">
        {{ parseInt(data.statistics.viewCount).toLocaleString("en-US") }}
      </p>
    </div>
    <!--end title & view count -->
    <div class="md:flex border-2 bg-white justify-around text-center">
      <div>
        <p class="font-bold">Likes:</p>
        <p>{{ parseInt(data.statistics.likeCount).toLocaleString("en-US") }}</p>
      </div>
      <div>
        <p class="font-bold">Dislikes:</p>
        <p>
          {{ parseInt(data.statistics.dislikeCount).toLocaleString("en-US") }}
        </p>
      </div>
      <div>
        <p class="font-bold">Comments:</p>
        <!-- Sometimes comments are blocked -->
        <p>
          {{ data.statistics.commentCount ? parseInt(data.statistics.commentCount).toLocaleString("en-US") : 0 }}
        </p>
      </div>
    </div>
    <!--end likes & comments -->
    <div class="max-w-4xl shadow-lg p-4 bg-white mx-auto rounded">
      <div>
        <h1 class="font-bold">Description:</h1>
        <pre>{{ data.snippet.description }}</pre>
        <p>
          <span class="font-bold">Published on: </span>
          {{ new Date(data.snippet.publishedAt).toDateString() }}
        </p>
      </div>
      <!-- end descriptions -->
      <div class="font-bold">
        <h1>Tags</h1>
        <p class="text-blue-600">
          <span v-for="(tag, index) in data.snippet.tags" :key="index"
            >#{{ tag }}
          </span>
        </p>
      </div>
      <!-- end tags -->
    </div>
    <!-- end desc & tags container -->
  </div>
</div>
</template>

<script>
export default {
  layout: "details",
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description",
        },
      ],
    };
  },
  data() {
    return {
      title: "",
      offline: false,
      videoId: this.$route.params.id,
      data: [],
      error: "",
    };
  },
  methods: {
    async getVideoDetails() {
      if(!navigator.onLine){
        return this.offline = true
      }
      else{
        try {
        let res = await this.$store.dispatch("fetchVideoDetails");
  
        if(res.msg){
          this.error = res.msg
        }
        else if (!res.data[0]) {
          this.error = "Oops, video is not found";
        }
        else {
          this.data = res.data[0];
          this.title = this.data.snippet.title
        }
      } catch (err) {
        this.error = "An error has occurred, please try again";
      }
      }
    },
  },
  mounted() {
    this.getVideoDetails();
  },
};
</script>