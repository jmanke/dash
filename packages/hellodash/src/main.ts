import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import initializeRouter from "./initializers/router";
import { initializeWebComponents } from "./initializers/web-components";

//#region initializers

initializeWebComponents();
const router = initializeRouter();

//#endregion

const app = createApp(App);

app.use(router);
app.mount("#app");
