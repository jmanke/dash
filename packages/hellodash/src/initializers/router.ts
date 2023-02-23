import { createRouter, createWebHashHistory } from 'vue-router';
import { Routes } from '../common/routes';
import BinRouteVue from '../components/routes/BinRoute.vue';
import NotesRouteVue from '../components/routes/NotesRoute.vue';

/**
 * Initializes a Vue router
 * @returns Vue router
 */
export default function initializeRouter() {
  const routes = [
    { path: '/', alias: [Routes.home], component: NotesRouteVue },
    { path: `${Routes.note}/:noteId`, component: NotesRouteVue },
    { path: `${Routes.label}/:labelId`, component: NotesRouteVue },
    { path: Routes.bin, component: BinRouteVue },
  ];

  return createRouter({
    history: createWebHashHistory(),
    routes,
  });
}
