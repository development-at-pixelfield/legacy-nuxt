export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "Legacy | Own the universe",
    title: "Legacy | Own the universe",
    meta: [
      {charset: "utf-8"},
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1",
      },
      {name: "msapplication-TileColor", content: "#da532c"},
      {name: "theme-color", content: "#ffffff"},
      {hid: "description", name: "description", content: "We build emotions between you and celebrities across the world."},
      {hid: "author", name: "author", content: "Legacy NFT"},
      {hid: "DC.title", name: "DC.title", content: "Legacy NFT"},
      {hid: "DC.creator", name: "DC.creator", content: "Legacy NFT"},
      {hid: "og:type", name: "og:type", content: "website"},
      {hid: "og:url", name: "og:url", content: "https://www.legacy-nft.com/"},
      {
        hid: "og:title",
        name: "og:title",
        content: "Legacy NFT | The ultimate fan experience",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "We build emotions between you and celebrities across the world.",
      },
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://www.legacy-nft.com/legacy-opengraph.jpg",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content:
          "https://www.legacy-nft.com/legacy-opengraph.jpg",
      },
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
      {rel: "manifest", href: "/site.webmanifest"},
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
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
        href: "https://www.legacy-nft.com/legacy-opengraph.jpg",
      },
    ],
    script: [
      {
        hid: "facebook-pixel",
        innerHTML: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '369489891964660');
        fbq('track', 'PageView');
        `,
        type: "text/javascript",
        charset: "utf-8",
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-F6ZW3CDN76",
      },
      {
        hid: "googletag",
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F6ZW3CDN76');
        `
      }
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  loading: {color: "#3843FF"},
  // loading: '@/components/LoadingBar.vue',

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
  hooks: {
    'generate:page': page => {
      page.html = page.html.replace('head data-n-head=""', 'head');
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
    extend (config, { isDev, isClient }) {
      config.node = {
           fs: 'empty'
      },
      config.optimization.minimize = false,
      config.performance.maxEntrypointSize = 2000000
      config.module.rules.push({
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
      })
    },
    transpile: ["three"],
  },

  axios: {
    baseUrl: process.env.API_URL,
  },

  dev: process.env.NODE_ENV !== "production",
  server: {
    host: "0.0.0.0",
  },
};
