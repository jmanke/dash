import { createRouter, createWebHashHistory } from 'vue-router';
import NotesRouteVue from '../components/routes/NotesRoute.vue';
import BinRouteVue from '../components/routes/BinRoute.vue';
import { Routes } from '../common/routes';

/**
 * Initializes a Vue router
 * @returns Vue router
 */
export default function initializeRouter() {
  const routes = [
    { path: '/', alias: [Routes.home], component: NotesRouteVue },
    { path: `${Routes.notes}/:noteId`, component: NotesRouteVue },
    { path: `${Routes.labels}/:labelId`, component: NotesRouteVue },
    { path: Routes.bin, component: BinRouteVue },
  ];

  return createRouter({
    history: createWebHashHistory(),
    routes,
  });
}
