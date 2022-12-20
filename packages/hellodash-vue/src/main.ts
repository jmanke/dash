import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { defineCustomElements as defineDashComponents } from "@didyoumeantoast/dash-components/loader";

defineDashComponents(window, { resourcesUrl: "dash-components/" });

createApp(App).mount("#app");
