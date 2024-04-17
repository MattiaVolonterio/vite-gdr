<script>
import { store } from "../store";

export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="play-container">
      <img
        src="../assets/images/home-img.jpg"
        alt="splash-img"
        class="splash-img"
      />

      <router-link
        :to="{ name: 'characters.index' }"
        class="btn btn-primary play-button"
        >Gioca</router-link
      >
    </div>
  </div>
</template>

<style lang="scss">
.play-container {
  position: relative;
  .splash-img {
    width: 100%;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
