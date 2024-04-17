<script>
import axios from 'axios';
import { api } from './store';

export default {
  data() {
    return {
      title: 'Character List',
      characters: [],
    };
  },
  props: {},
  methods: {
    created() {
      axios.get(api.baseUrl + 'character').then((response)) => {
        this.characters = response.data.data;
      }

    }
  },
};
</script>
<template>
  <div class="container mt-5">
    <h1>{{ title }}</h1>

    <div v-for="character in characters">
      <ul>
        <li><strong>ID: </strong>{{ character.id }}</li>
        <li><strong>Title: </strong>{{ character.title }}</li>
        <li><strong>Stats: </strong>{{ character.stats }}</li>
      </ul>

    </div>
  </div>
</template>
<style lang="scss" scoped></style>
