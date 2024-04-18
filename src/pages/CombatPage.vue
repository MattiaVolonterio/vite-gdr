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
      game_over : true,
      cpu_win:false,
      player_win:false,
      

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
          let player_damege =
            this.character.strength +
            parseInt(this.selectedWeapon.dice_num) *
              Math.floor(
                Math.random() * parseInt(this.selectedWeapon.dice_faces) + 1
              );
          this.total_player_damege =
            player_damege - this.randomCharacter.defence;
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

        setTimeout(() => {
          this.cpuAttack();
        }, 1000); // Dopo 1 secondo, il CPU attacca
      }
    },

    cpuAttack() {
      if (this.randomCPUWeapon && this.character) {
       

        if (this.randomCPUWeapon.dice_num) {
          let cpu_damege =
            this.randomCharacter.strength +
            parseInt(this.randomCPUWeapon.dice_num) *
              Math.floor(
                Math.random() * parseInt(this.randomCPUWeapon.dice_faces) + 1
              );
          this.total_cpu_damege = cpu_damege - this.character.defence;
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
                    rimasti: {{ playerHealth ? playerHealth : character.life }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- VS -->

      <div class="col-2 d-flex align-items-center">
        <div class="center-area">
          <div>VS</div>
          <!-- btn logica -->
          <div>
            <button class="btn btn-primary ms-3" @click="initializeHealth">
              inizia
            </button>
            <button class="btn btn-warning ms-3" @click="playerAttack">
              Attacca
            </button>
            <div>HP: {{ playerHealth }}</div>
            <div>HP: {{ cpuHealth }}</div>
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
                  randomCharacter
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
                    rimasti: {{ cpuHealth ? cpuHealth : randomCharacter.life }}
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
   <div v-if='game_over' class="fine_gioco">
      <div class="card" :class="player_win ? 'bg-success' : 'bg-danger' " >

        <div v-if="player_win">
          hai vinti !!
        </div>
        <div v-else>
          <div class="row"></div>
        </div>


      </div>
    </div>
</template>






<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  .center-area {
    width: 15%;
    font-size: 5rem;
  }
  .card {
    width: 440px;
    height: 666px;
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
  .fine_gioco{
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
    .card{
      height: 320px;
      width: 580px;
      background-color: rgba(51, 85, 45, 0.75);
    }
  
  }
}
</style>


