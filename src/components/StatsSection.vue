<script setup lang="ts">
import { BOO_TOKEN_ADDRESS, getFullTokenInfo } from '../utils/Constants';
import TvlStatCard from './stat-cards/TvlStatCard.vue';
import MarketCapStatCard from './stat-cards/MarketCapStatCard.vue';
import SkeletonStat from './stat-cards/SkeletonStat.vue';
import TokenStatCard from './stat-cards/TokenStatCard.vue';
import { getBurnedTokens, getTotalSupply } from '../utils/FtmScanStats';
import { provide } from '@vue/runtime-core';
import { useQuery, useResult } from '@vue/apollo-composable';
import { TokenResponse } from '../utils/entities/Token';
import { PairQuote } from '../utils/entities/PairQuote';

const tvlIcon: string = "coins";
const marketCapIcon: string = "chart-line";
const supplyIcon: string = "bat";
const spookyswap: string = "spookyswap";
const trackedToken: string = BOO_TOKEN_ADDRESS;

const totalSupply = getTotalSupply(trackedToken);
const burnedTokens = getBurnedTokens(trackedToken);

const { result, loading } = useQuery<TokenResponse>(getFullTokenInfo(trackedToken), null, {
    fetchPolicy: 'cache-first',
    pollInterval: 600000,
    clientId: spookyswap
});

const tvlInfo = useResult(result, new Array<PairQuote>(), data => data.token.pairQuote as Array<PairQuote>)
const priceInfo = useResult(result, "0.0", data => data.token.tokenDayData[0].priceUSD)

provide("ftmScanStats", {
    totalSupply,
    burnedTokens,
    tvlInfo: tvlInfo,
    priceInfo: priceInfo
});
</script>

<template>
    <section class="w-full shadow-xl grid-flow-row sm:grid-flow-col stats mt-8">

        <SkeletonStat v-if="loading" />
        <TvlStatCard v-else
            :stat-icon="tvlIcon" 
            stat-title="Total Value Locked" 
            stat-description="Accross all products" />

        <Suspense>
            <template #default>
                <SkeletonStat v-if="loading" />
                <MarketCapStatCard v-else
                    :stat-icon="marketCapIcon" 
                    stat-title="Market Cap" />
            </template>
            <template #fallback>
                <SkeletonStat />
            </template>
        </Suspense>

        <Suspense>
            <template #default>
                <TokenStatCard
                    :stat-icon="supplyIcon" 
                    stat-title="Circulating supply" />
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