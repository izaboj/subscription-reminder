import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import BaseCard from "./components/UI/BaseCard.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("base-card", BaseCard);

app.mount("#app");
