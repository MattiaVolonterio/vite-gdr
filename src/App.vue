<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {};
  },
  props: {},
  methods: {},
  components: { AppHeader, AppMain, AppFooter },
};
</script>

<template>
  <div class="page-container">
    <app-header />
    <div class="container main-container">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<style lang="scss">
@use "/src/scss/general.scss";

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .main-container {
    flex-grow: 1;
  }
}
</style>
