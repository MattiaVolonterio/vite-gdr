<script>
import { store } from "../store";

export default {
  data() {
    return {};
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <img src="../assets/images/icon.svg" alt="" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link active"
              aria-current="page"
              >Gioca</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"></style>
