<script>
import axios from "axios";
import { store, api } from "../store";

export default {
  data() {
    return {
      title: "Character",
      character: null,
      loading: true,
      selectedWeaponId: null,
      randomWeaponIndex: null,

      playerHealth: null,
      cpuHealth: null,

      cpu_damage_show: 0,
      player_damage_show: 0,

      total_player_damege: 0,
      total_cpu_damege: 0,

      /* fine gioco */
      game_over: false,
      cpu_win: false,
      player_win: false,

      /* dice */

      dice_cpu: "",
      dice_player: "",
    };
  },
  computed: {
    selectedWeapon() {
      return this.character?.items.find(
        (item) => item.id === this.selectedWeaponId
      );
    },
    randomCharacter() {
      if (store.characters.length > 0) {
        const randomIndex = Math.floor(Math.random() * store.characters.length);
        return store.characters[randomIndex];
      }
      return null;
    },
    randomCPUWeapon() {
      if (this.randomCharacter && this.randomCharacter.items.length > 0) {
        return this.randomCharacter.items[
          Math.floor(Math.random() * this.randomCharacter.items.length)
        ];
      }
      return null;
    },
    fullImagePath() {
      if (this.randomCharacter && this.randomCharacter.type.image) {
        return api.baseUrl2 + this.randomCharacter.type.image;
      }
      return "";
    },
  },
  methods: {
    fetchCharacter() {
      const characterId = this.$route.params.id;
      axios
        .get(api.baseUrl + `characters/${characterId}`)
        .then((response) => {
          this.character = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching character:", error);
          this.loading = false;
        });
    },

    //assegnazione vita
    initializeHealth() {
      if (this.character && this.randomCharacter) {
        this.playerHealth = this.character.life;
        this.cpuHealth = this.randomCharacter.life;
      }
    },

    //metodi per att
    playerAttack() {
      if (this.randomCPUWeapon && this.randomCharacter) {
        if (this.selectedWeapon.dice_num) {
          this.dice_player = Math.floor(
            Math.random() * parseInt(this.selectedWeapon.dice_faces) + 1
          );
          let player_damege = this.character.strength + this.dice_player;
          this.total_player_damege =
            player_damege - this.randomCharacter.defence;

          if (this.total_player_damege <= 0) {
            this.total_player_damege = Math.floor(Math.random() * 6);
          }
        } else {
          this.total_player_damege =
            this.selectedWeapon.damege +
            this.character.strength -
            this.randomCharacter.defence;
        }
        this.cpuHealth -= this.total_player_damege;
        this.cpu_damage_show += this.total_player_damege;

        if (this.cpuHealth <= 0) {
          this.game_over = true;
          this.player_win = true;
          return;
        }

        this.cpuAttack();
        // setTimeout(() => {
        // }, 1000);
      }
    },

    cpuAttack() {
      if (this.randomCPUWeapon && this.character) {
        if (this.randomCPUWeapon.dice_num) {
          this.dice_cpu = Math.floor(
            Math.random() * parseInt(this.randomCPUWeapon.dice_faces) + 1
          );

          let cpu_damege = this.randomCharacter.strength + this.dice_cpu;

          this.total_cpu_damege = cpu_damege - this.character.defence;

          if (this.total_cpu_damege <= 0) {
            this.total_cpu_damege = Math.floor(Math.random() * 6);
          }
        } else {
          this.total_cpu_damege =
            this.srandomCPUWeapon.damege +
            this.randomCharacter.strength -
            this.character.defence;
        }
        this.playerHealth -= this.total_cpu_damege;
        this.player_damage_show += this.total_cpu_damege;

        if (this.playerHealth <= 0) {
          this.game_over = true;
          this.cpu_win = true;
          return;
        }
      }
    },
  },

  created() {
    this.fetchCharacter();
  },
};
</script>

<template>
  <div v-if="character" class="text-center mt-5">
    <div class="container row pt-5">
      <!-- Card Giocaotore -->
      <div class="col-5 d-flex">
        <div class="card">
          <div class="card-header mb-2">
            <h2>{{ character.name }}</h2>
          </div>
          <div class="mb-2">
            <img
              :src="character.type.image"
              :alt="character.name"
              class="character-image"
            />
          </div>
          <div class="card-body">
            <div class="row d-flex align-items-center">
              <div class="col-6">
                <span><strong>Seleziona arma:</strong></span>
              </div>
              <div class="col-4">
                <select v-model="selectedWeaponId" class="form-select mt-3">
                  <option
                    v-for="item in character.items"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="selectedWeaponId" class="mt-3 text-start">
              <h5 class="mb-4">Razza: {{ character.type.name }}</h5>
              <h5>Statistiche Arma</h5>
              <div><strong>Nome:</strong> {{ selectedWeapon.name }}</div>
              <div><strong>Danno:</strong> {{ selectedWeapon.damege }}</div>
              <div class="row mt-3">
                <div class="col-4 mt-3 me-5">
                  <h5>Stat PG</h5>
                  <div>HP: {{ character.life }}</div>
                  <div>Forza: {{ character.strength }}</div>
                  <div>Difesa: {{ character.defence }}</div>
                  <div>Velocita: {{ character.speed }}</div>
                  <div>Intelligenza: {{ character.intelligence }}</div>
                </div>
                <div class="col-4 mt-3">
                  <h5>Vita</h5>
                  <div>HP: {{ character.life }}</div>
                  <div>Danni Subiti: {{ player_damage_show }}</div>
                  <div>
                    HP rimasti:
                    {{ playerHealth ? playerHealth : character.life }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--           VSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVS                                -->

      <div class="col-2 d-flex align-items-center">
        <div class="center-area">
          <div>VS</div>
          <!-- btn logica -->
          <div class="pe-3">
            <button class="btn btn-primary ms-3" @click="initializeHealth">
              inizia
            </button>
            <button class="btn btn-warning ms-3" @click="playerAttack">
              Attacca
            </button>
          </div>
          <div>
            <div class="d-flex justify-content-center align-items-center gap-3">
              <div class="dice border-success">{{ dice_player }}</div>
              <div class="dice border-danger">{{ dice_cpu }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Cpu -->
      <div class="col-5">
        <div class="card">
          <div class="card-header mb-2">
            <h2>{{ randomCharacter.name }}</h2>
          </div>
          <div class="mb-2">
            <img
              :src="fullImagePath"
              :alt="randomCharacter.name"
              class="character-image"
            />
          </div>
          <div class="card-body">
            <div v-if="randomCharacter" class="mt-3 text-start">
              <h5 class="mb-4">Razza: {{ randomCharacter.type.name }}</h5>
              <h5>Statistiche Arma</h5>
              <div><strong>Nome:</strong> {{ randomCPUWeapon.name }}</div>
              <div><strong>Nome:</strong> {{ randomCPUWeapon.damege }}</div>
              <div class="row mt-3">
                <div class="col-4 mt-3 me-5">
                  <h5>Stat PG</h5>
                  <div>HP: {{ randomCharacter.life }}</div>
                  <div>Forza: {{ randomCharacter.strength }}</div>
                  <div>Difesa: {{ randomCharacter.defence }}</div>
                  <div>Velocita: {{ randomCharacter.speed }}</div>
                  <div>Intelligenza: {{ randomCharacter.intelligence }}</div>
                </div>
                <div class="col-4 mt-3">
                  <h5>Vita</h5>
                  <div>HP: {{ randomCharacter.life }}</div>
                  <div>Danni Subiti: {{ cpu_damage_show }}</div>
                  <div>
                    HP rimasti:
                    {{ cpuHealth ? cpuHealth : randomCharacter.life }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="d-flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <h2>Loading...</h2>
  </div>

  <!-- Fine Gico  -->
  <div v-if="game_over" class="fine_gioco">
    <div class="card-end-game" :class="player_win ? 'bg-success' : 'bg-danger'">
      <div class="end-game-title">
        <div v-if="player_win">Hai vinto!!</div>
        <div v-else>Hai Perso!!</div>
      </div>

      <div class="end-game-content">
        <div class="player-card" :class="player_win ? 'scaled-card' : ''">
          <div class="d-flex justify-content-center my-3">
            <div class="end-game-image">
              <img :src="character.type.image" :alt="character.name" />
            </div>
          </div>
          <h5 class="text-center mb-4">{{ character.name }}</h5>

          <div class="table-container w-75 m-auto text-center">
            <table class="table table-sm">
              <thead>
                <th scope="col">Danni Inflitti</th>
                <th scope="col">Danni subiti</th>
              </thead>
              <tbody>
                <tr>
                  <td>{{ cpu_damage_show }}</td>
                  <td>{{ player_damage_show }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-center my-3" v-if="player_win">
            <div class="champ-image">
              <img src="../assets/images/coppa.jpeg" alt="" />
            </div>
          </div>
        </div>

        <div class="cpu-card" :class="cpu_win ? 'scaled-card' : ''">
          <div class="d-flex justify-content-center my-3">
            <div class="end-game-image">
              <img :src="fullImagePath" :alt="randomCharacter.name" />
            </div>
          </div>
          <h5 class="text-center mb-4">{{ randomCharacter.name }}</h5>

          <div class="table-container w-75 m-auto text-center">
            <table class="table">
              <thead>
                <th scope="col">Danni Inflitti</th>
                <th scope="col">Danni subiti</th>
              </thead>
              <tbody>
                <tr>
                  <td>{{ player_damage_show }}</td>
                  <td>{{ cpu_damage_show }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-center my-3" v-if="cpu_win">
            <div class="champ-image">
              <img src="../assets/images/coppa.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <router-link
          :to="{ name: 'characters.index' }"
          class="btn btn-primary play-button replay-button"
          >Rigioca</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  .center-area {
    width: 65%;
    font-size: 5rem;
    .dice {
      border: 2px solid;
      border-radius: 20px;
      min-width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 1px 2px 13px 0px #9a4d4d;
    }
  }
  .card {
    width: 440px;
    height: 666px;
    box-shadow: 1px 2px 13px 0px #ffffff;
  }
  img {
    height: 150px;
  }
  h5 {
    color: rgb(3, 125, 125);
  }
  .card-header {
    color: rgb(106, 106, 56);
  }
  .fine_gioco {
    width: 100vw;
    height: 100vh;
    background-color: rgb(33, 37, 41);
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .card-end-game {
      position: relative;
      min-height: 650px;
      width: 1000px;
      border-radius: 20px;
      padding-bottom: 2rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .end-game-title {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
      }

      .player-card,
      .cpu-card {
        width: 300px;
        min-height: 300px;
        background-color: rgb(33, 37, 41);
        border-radius: 20px;
      }

      .scaled-card {
        transform: scale(1.2);
      }
      .end-game-content {
        display: flex;
        gap: 100px;
        background-color: inherit;
      }

      .end-game-image {
        width: 100px;
        aspect-ratio: 1;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid red;

        img {
          width: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      .champ-image {
        width: 100px;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      .replay-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
}
</style>
