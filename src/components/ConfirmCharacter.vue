<script>
import axios from "axios";
import { api } from "../store";
export default {
  data() {
    return {
      character: null,
    };
  },
  props: {},
  methods: {
    fetchCharacter() {
      const characterId = this.$route.params.id;
      axios.get(api.baseUrl + "characters/" + characterId).then((response) => {
        this.character = response.data;
      });
    },
  },

  created() {
    this.fetchCharacter();
  },
};
</script>

<template>
  <div v-if="character" class="my-5">
    <h1>
      Conferma la tua selezione di <strong>{{ character.name }}</strong>
    </h1>

    <div class="row mt-5">
      <div class="col-6">
        <img
          :src="character.type.image"
          :alt="character.name"
          class="character-image w-75"
        />
      </div>
      <div class="col-6">
        <div class="fs-4">
          <strong class="me-3">Classe:</strong>{{ character.type.name }}
        </div>
        <div class="fs-4 mt-3">
          <strong class="me-3">Descrizione:</strong>{{ character.description }}
        </div>
        <div class="fs-4 mt-3">
          <strong class="me-3">Statistiche:</strong>
          <table class="table fs-6">
            <thead>
              <tr>
                <th scope="col">Attributo</th>
                <th scope="col">Valore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Forza</td>
                <td>{{ character.strength }}</td>
              </tr>
              <tr>
                <td>Difesa</td>
                <td>{{ character.defence }}</td>
              </tr>
              <tr>
                <td>Velocità</td>
                <td>{{ character.speed }}</td>
              </tr>
              <tr>
                <td>Intelligenza</td>
                <td>{{ character.intelligence }}</td>
              </tr>
              <tr>
                <td>Vita</td>
                <td>{{ character.life }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- selezione arma -->
        <div class="fs-4">
          <strong class="me-3">Armi disponibili:</strong>
          <table class="table fs-6">
            <thead>
              <tr>
                <th scope="col">Arma</th>
                <th scope="col">Danni</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in character.items">
                <td>{{ item.name }}</td>
                <td>{{ item.damege }}</td>
              </tr>
            </tbody>
          </table>

          <div class="button-container mt-4">
            <router-link
              :to="{ name: 'characters.index' }"
              class="btn btn-warning me-3"
              >Torna alla selezione</router-link
            >

            <router-link
              :to="{
                name: 'characters.show',
                params: { id: character.id, weaponId: selectedWeapon },
              }"
              class="btn btn-success"
            >
              Continua
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
