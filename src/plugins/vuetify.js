// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//Styles
import "vuetify/styles";
// import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  // theme: {
  //   defaultTheme: "light",
  //   color
  // },
});

export default vuetify;
