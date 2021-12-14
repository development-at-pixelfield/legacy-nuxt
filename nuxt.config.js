export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "Galaxy.diamonds | Own the universe",
    title: "Galaxy.diamonds | Own the universe",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1",
      },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" },
      { hid: "description", name: "description", content: "NFT floating through galaxy. Own a piece of the universe." },
      { hid: "author", name: "author", content: "Galaxy.diamonds" },
      { hid: "DC.title", name: "DC.title", content: "Galaxy.diamonds" },
      { hid: "DC.creator", name: "DC.creator", content: "Galaxy.diamonds" },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:url", name: "og:url", content: "https://galaxy.diamonds/" },
      {
        hid: "og:title",
        name: "og:title",
        content: "Galaxy.diamonds | Own the universe",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "🚀 NFT floating through galaxy. Own a piece of the universe.",
      },
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://galaxy.diamonds/galaxy-opengraph.jpg",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content:
          "https://galaxy.diamonds/galaxy-opengraph.jpg",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        href: "/safari-pinned-tab.svg",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "/",
      },
      {
        rel: "image_src",
        href: "https://galaxy.diamonds/galaxy-opengraph.jpg",
      },
    ],
  },

  loading: { color: "#6B00C1" },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/scss/global.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/vue-multyselect" },
    { src: "~/plugins/axios.js" },
    { src: "~/plugins/metamask.js", mode: "client" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    '@nuxtjs/style-resources',
    "@nuxtjs/dotenv",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "nuxt-i18n"],

  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "en",
    strategy: "no_prefix",
    noPrefixDefaultLocale: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      onlyOnRoot: true, // recommended
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/users/auth/",
            method: "POST",
            propertyName: "access",
          },
          user: {
            url: "/users/detail/",
            method: "GET",
            propertyName: false,
            autoFetch: false
          },
          logout: false,
        },
        token: {
          type: "Bearer",
          maxAge: 1,
        },
      },
    },
  },

  styleResources: {
    scss: ["@/assets/scss/definitions.scss"],
  },


  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile:["three"]
  },

  axios: {
    baseUrl: process.env.API_URL,
  },

  dev: process.env.NODE_ENV !== "production",
};
