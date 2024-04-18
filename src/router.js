import { createRouter, createWebHistory } from "vue-router";

import CharactersList from "./components/CharactersList.vue";
import AppMain from "./components/AppMain.vue";
import ConfirmCharacter from "./components/ConfirmCharacter.vue";
import CombatPage from "./pages/CombatPage.vue";

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
    {
      path: "/characters/:id",
      name: "characters.show",
      component: CombatPage,
    },
  ],
});

export { router };
