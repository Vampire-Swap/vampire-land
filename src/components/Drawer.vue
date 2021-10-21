<script setup lang="ts">
import { inject, PropType } from "vue";
import { NavigationLink as NavigationLinkEntity } from "../utils/entities/NavigationLink";
import NavigationLink from "./NavigationLink.vue"
import { ACCOUNT, connect } from "../services/Wallet";

defineProps({
  navigationLinks: Array as PropType<Array<NavigationLinkEntity>>,
});

defineEmits(['closeMobileNavbar'])

const addressFormat: any = inject("addressFormat");
</script>

<template>
  <div id="mobile-navbar" class="overlay fixed z-20 right-0 top-0 bg-neutral overflow-x-hidden w-full md:w-96 md:mt-2 md:right-2">
    <button class="btn absolute top-7 right-7 p-2" @click="$emit('closeMobileNavbar')"><fa-icon icon="times" size="lg" /></button>
    <div class="relative top-1/4 w-full text-center mt-8">
      <ul class="menu m-4">
        <li v-for="navigationLink in navigationLinks" :key="navigationLink.displayedContent">
          <NavigationLink @click="$emit('closeMobileNavbar')" :navigationLink="navigationLink" class="text-xl mt-2 content-center" />
        </li>
      </ul>
      <button @click="connect" id="wallet-button" class="btn btn-primary btn-md mt-8 normal-case text-xl">
        <fa-icon icon="wallet" class="mr-2" />
        {{ ACCOUNT==="Connect Wallet" ? ACCOUNT : addressFormat(ACCOUNT) }}
      </button>
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