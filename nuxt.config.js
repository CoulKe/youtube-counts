export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "youtube counts",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Luteya Coulston" },
      {
        hid: "description",
        name: "description",
        content:
          "Web app for displaying live youtube video views, likes, comments and dislikes counts"
      },
      {
        name: "keywords",
        content: "youtube counts, live youtube counts, youtube counter"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/styles/global.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/axios"
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
      name: "youtube-counts",
      short_name: "yt-counts",
      description: "live youtube data",
    },
    meta: {
      title: "Youtube count",
      author: "Luteya Coulston"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  
  serverMiddleware: ["~/api/index.js"]
};
