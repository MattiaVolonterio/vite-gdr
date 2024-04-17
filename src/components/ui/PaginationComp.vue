<script>
export default {
  data() {
    return {};
  },
  props: { links: Array },
  emits: ["change-page"],
};
</script>
<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" v-for="link in links">
        <a
          :class="{
            active: link.active,
            disabled: !link.url,
          }"
          class="page-link"
          href="javascript:void(0)"
          v-html="link.label"
          @click="$emit('change-page', link.url)"
        ></a>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped></style>
