import { createRouter, createWebHistory } from "vue-router";

import CharactersList from "./components/CharactersList.vue";
import AppMain from "./components/AppMain.vue";
import ConfirmCharacter from "./components/ConfirmCharacter.vue";

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
    {
      path: "/confirm-character/:id",
      name: "confirm.character",
      component: ConfirmCharacter,
    },
  ],
});

export { router };
