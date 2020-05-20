import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#35495e",
        secondary: "#3e556d",
        secondary_lighter: "#56718c",
        blue_accent: "#3cd1c2",
        info: "#ffaa2c",
        error: "#f83e70",
        green_accent: "#3cd1c2",
        download: "#64CEAA",
        upload: "#00b3fa",
        background: "#0000",
      },
      dark: {
        primary: "#35495e",
        secondary: "#3e556d",
        secondary_lighter: "#56718c",
        blue_accent: "#3cd1c2",
        info: "#ffaa2c",
        error: "#f83e70",
        green_accent: "#3cd1c2",
        download: "#64CEAA",
        upload: "#00b3fa",
        background: "#0000",
      },
    },
  },
});
