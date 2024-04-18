<script>
import { store, api } from "../store";
export default {
  data() {
    return {};
  },
  props: { character: Object },
  methods: {},
};
</script>

<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">
          <strong class="h5">{{ character.name }}</strong>
        </h5>
        <p class="card-title">
          <strong>{{ character.type.name }}</strong>
        </p>
        <!-- <p class="card-text">
          {{ character.description }}
        </p> -->
      </div>
      <!-- <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <strong>Forza: </strong>{{ character.strength }}
        </li>
        <li class="list-group-item">
          <strong>Difesa: </strong>{{ character.defence }}
        </li>
        <li class="list-group-item">
          <strong>Velocità: </strong>{{ character.speed }}
        </li>
        <li class="list-group-item">
          <strong>Intelligenza: </strong>{{ character.intelligence }}
        </li>
        <li class="list-group-item">
          <strong>Vita: </strong>{{ character.life }}
        </li>
      </ul> -->
      <div class="card-body">
        <router-link
          :to="{ name: 'confirm.character', params: { id: character.id } }"
          class="btn btn-primary"
          >Seleziona</router-link
        >
        <!-- <router-link :to="{ name: 'characters.show', params: { id: character.id } }" class="btn btn-primary ms-3">show</router-link> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
