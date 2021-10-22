<script setup lang="ts">
import WalletNotConnectedPlaceholder from '../components/WalletNotConnectedPlaceholder.vue';
    import { ACCOUNT } from '../services/Wallet';
</script>

<template>
    <WalletNotConnectedPlaceholder v-if="ACCOUNT === 'Connect Wallet'" />
</template>

<style scoped>

</style>