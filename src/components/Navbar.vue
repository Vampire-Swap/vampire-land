<script setup lang="ts">
import { computed, inject, PropType, Ref, ref } from "vue";
import { ACCOUNT, connect } from "../services/Wallet";
import { NavigationLink as NavigationLinkEntity } from "../utils/entities/NavigationLink";
import NavigationLink from "./NavigationLink.vue"

defineProps({
  navigationLinks: Array as PropType<Array<NavigationLinkEntity>>,
});

defineEmits(['openMobileNavbar']);

const addressFormat: any = inject("addressFormat");
</script>

<template>
  <nav class="sticky top-0 z-10">
    <div class="navbar bg-neutral text-neutral-content rounded-lg sticky top-0">
      <div class="navbar-start flex-1 lg:flex-initial">
          <router-link to="/" class="text-lg font-bold ml-2 text-primary flex justify-center items-center">
            <img src="../assets/Bat.png" alt="VampireSwap bat" width="62" height="62" class="mr-2">
            Vampire Land
          </router-link>
      </div>

      <div class="navbar-center hidden lg:flex">
          <NavigationLink v-for="navigationLink in navigationLinks" :key="navigationLink.displayedContent" :navigationLink="navigationLink" />
      </div>

      <div class="navbar-end w-auto lg:w-1/2">
          <button @click="connect" id="wallet-button" class="btn btn-primary btn-md mr-2 normal-case text-base hidden lg:inline-flex">
            <fa-icon icon="wallet" class="mr-2" />
            {{ ACCOUNT==="Connect Wallet" ? ACCOUNT : addressFormat(ACCOUNT) }}
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