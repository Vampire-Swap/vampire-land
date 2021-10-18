<script setup lang="ts">
import { PropType } from "vue";
import { NavigationLink as NavigationLinkEntity } from "../utils/entities/NavigationLink";
import NavigationLink from "./NavigationLink.vue"

defineProps({
  navigationLinks: Array as PropType<Array<NavigationLinkEntity>>,
});

defineEmits(['closeMobileNavbar'])


</script>

<template>
  <div id="mobile-navbar" class="overlay fixed z-10 right-0 top-0 bg-neutral overflow-x-hidden w-full md:w-96 md:mt-2 md:right-2">
    <btn class="btn absolute top-7 right-7 p-2" @click="this.$emit('closeMobileNavbar')"><fa-icon icon="times" size="lg" /></btn>
    <div class="relative top-1/4 w-full text-center mt-8">
      <ul class="menu m-4">
        <li v-for="navigationLink in navigationLinks" :key="navigationLink.displayedContent">
          <NavigationLink :navigationLink="navigationLink" class="text-xl mt-2 content-center" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  /* The Overlay (background) */
.overlay {
  height: 0;
  transition: .5s cubic-bezier(.694, .0482, .335, 1);
}

</style>