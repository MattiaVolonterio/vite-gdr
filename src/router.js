import { createRouter, createWebHistory } from "vue-router";

import CharactersList from "./components/CharactersList.vue";
import AppMain from "./components/AppMain.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppMain,
    },

    {
      path: "/character-selection",
      name: "characters.index",
      component: CharactersList,
    },
  ],
});

export { router };
