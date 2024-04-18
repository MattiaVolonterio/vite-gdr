<script>
import PaginationComp from "./ui/PaginationComp.vue";
import CharactersListCard from "./CharactersListCard.vue";
import axios from "axios";
import { store, api } from "../store";

export default {
  data() {
    return {
      store,
      title: "Seleziona il tuo personaggio",
    };
  },
  props: {},

  components: { PaginationComp, CharactersListCard },

  methods: {
    fetchCharacters(endpoint = api.baseUrl + "characters") {
      axios.get(endpoint).then((response) => {
        store.characters = response.data;
        // store.charactersLink = response.data.links;
      });
    },
  },

  created() {
    this.fetchCharacters();
  },
};
</script>
<template>
  <h1 class="mt-5">{{ title }}</h1>

  <div class="row row-cols-5 g-3 mt-3">
    <characters-list-card
      v-for="character in store.characters"
      :character="character"
    />
  </div>

  <div class="d-flex justify-content-between align-items-center">
    <pagination-comp
      :links="store.charactersLink"
      @change-page="fetchCharacters"
      class="mt-4"
    />

    <router-link :to="{ name: 'home' }" class="btn btn-warning h-50 mt-4"
      >Torna alla pagina iniziale</router-link
    >
  </div>
</template>
<style lang="scss" scoped></style>
