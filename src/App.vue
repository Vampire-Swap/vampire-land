<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Drawer from "./components/Drawer.vue";
import { NavigationLink } from "./utils/entities/NavigationLink";

const navigationLinks: Array<NavigationLink> = new Array<NavigationLink>(
    new NavigationLink('Blood Pools', '/blood-pools', 'tint'),
    new NavigationLink('Pumpkin Patches', '/pumpkin-patches', 'jack-o-lantern'),
    new NavigationLink('Roadmap', '/roadmap', 'map-marked-alt'),
);

function openMobileNavbar() {
  document.getElementById('mobile-navbar')!.style.height="100%";
}

function closeMobileNavbar() {
  document.getElementById('mobile-navbar')!.style.height="0";
}
</script>

<template>
  <Drawer :navigationLinks="navigationLinks" @close-mobile-navbar="closeMobileNavbar" />
  <Navbar class="sticky top-0" :navigationLinks="navigationLinks" @open-mobile-navbar="openMobileNavbar" />
  <router-view />
</template>

<style>
</style>
