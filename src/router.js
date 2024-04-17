import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import ProjectsList from "./pages/ProjectsList.vue";
import ProjectDetail from "./pages/ProjectDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

export { router };
