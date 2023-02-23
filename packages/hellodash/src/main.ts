import { createApp } from 'vue';
import App from './App.vue';
import initializeRouter from './initializers/router';
import { initializeWebComponents } from './initializers/web-components';
import './style.css';

//#region initializers

initializeWebComponents();
const router = initializeRouter();

//#endregion

const app = createApp(App);

app.use(router);
app.mount('#app');
