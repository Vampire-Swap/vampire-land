<script setup lang="ts">
import { BOO_TOKEN_ADDRESS } from '../utils/Constants';
import TvlStatCard from './stat-cards/TvlStatCard.vue';
import MarketCapStatCard from './stat-cards/MarketCapStatCard.vue';
import SkeletonStat from './stat-cards/SkeletonStat.vue';

const tvlIcon: string = "coins";
const marketCapIcon: string = "chart-line";
const spookyswap: string = "spookyswap";
const trackedToken: string = BOO_TOKEN_ADDRESS;
</script>

<template>
    <section class="w-full shadow-xl grid-flow-row sm:grid-flow-col stats mt-8">
        <TvlStatCard 
            :stat-icon="tvlIcon" 
            stat-title="Total Value Locked" 
            stat-description="Accross all products" 
            :apollo-client="spookyswap" 
            :token-address="trackedToken" />

        <Suspense>
            <template #default>
                <MarketCapStatCard
                    :stat-icon="marketCapIcon" 
                    stat-title="Market Cap" 
                    :apollo-client="spookyswap" 
                    :token-address="trackedToken" />
            </template>
            <template #fallback>
                <SkeletonStat />
            </template>
        </Suspense>
    </section>
</template>

<style scoped>
    @media (min-width: 640px) {
        .stats.grid-flow-row .stat+.stat {
            border-left-width: 1px;
            border-top-width: 0;
        }
    }
</style>