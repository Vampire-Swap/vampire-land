<script setup lang="ts">
import { BOO_TOKEN_ADDRESS } from '../utils/Constants';
import TvlStatCard from './TvlStatCard.vue';

const tvlIcon: string = "coins";
const spookyswap: string = "spookyswap";
const trackedToken: string = BOO_TOKEN_ADDRESS;
</script>

<template>
    <section class="w-full shadow-xl stats grid-flow-row mt-8">
        <TvlStatCard 
            :stat-icon="tvlIcon" 
            stat-title="Total Value Locked" 
            stat-description="Accross all products" 
            :apollo-client="spookyswap" 
            :token-address="trackedToken" />
    </section>
</template>

<style scoped>

</style>