import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  defaults: {
    VBtn: {
      style: {
        textTransform: "none",
      },
    },
  },
});
