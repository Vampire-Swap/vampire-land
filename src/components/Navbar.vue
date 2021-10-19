<script setup lang="ts">
import { PropType } from "vue";
import { NavigationLink as NavigationLinkEntity } from "../utils/entities/NavigationLink";
import NavigationLink from "./NavigationLink.vue"

defineProps({
  navigationLinks: Array as PropType<Array<NavigationLinkEntity>>,
});

defineEmits(['openMobileNavbar']);
</script>

<template>
  <nav class="sticky top-0 z-10">
    <div class="navbar bg-neutral text-neutral-content rounded-lg sticky top-0">
      <div class="navbar-start">
          <router-link to="/" class="text-lg font-bold ml-2 text-primary flex justify-center items-center">
            <img src="../assets/Bat.png" alt="VampireSwap bat" width="62" height="62" class="mr-2">
            VampireSwap
          </router-link>
      </div>

      <div class="navbar-center hidden lg:flex">
          <NavigationLink v-for="navigationLink in navigationLinks" :key="navigationLink.displayedContent" :navigationLink="navigationLink" />
      </div>

      <div class="navbar-end">
          <button id="wallet-button" class="btn btn-primary btn-md mr-2 normal-case text-base hidden lg:inline-flex">
            <fa-icon icon="wallet" class="mr-2" />
            Connect Wallet
          </button>

          <button @click="$emit('openMobileNavbar')" class="btn lg:hidden">
            <fa-icon icon="bars" size="lg" />
          </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>