import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { defineCustomElements as defineDashComponents } from "@didyoumeantoast/dash-components/loader";
import VueRouter from "vue-router";

function initializeWebComponents() {
  // define dash-components as web components
  defineDashComponents(window, { resourcesUrl: "dash-components/" });
}

function initializeRouter() {
  const Home = { template: "<div>Home</div>" };
  const About = { template: "<div>About</div>" };

  const routes = [
    { path: "/", component: Home },
    { path: "/about", component: About },
  ];

  return VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
  });
}

initializeWebComponents();

const router = initializeRouter();

const app = createApp(App);
app.use(router);

app.mount("#app");
