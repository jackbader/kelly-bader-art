// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts"],
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      Poppins: "200...900",
    },
  },
  ui: {
    icons: ["heroicons", "fa-brands"],
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon-32x32.png" }],
    },
  },
});
