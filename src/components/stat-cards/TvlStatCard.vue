<script setup lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable';
import { computed, ComputedRef, inject } from 'vue';
import { getTokenLiquidityInfo } from '../../utils/Constants';
import { TokenResponse } from '../../utils/entities/Token';
import SkeletonStat from './SkeletonStat.vue';

const props = defineProps({
    statIcon: String,
    statTitle: {
        trype: String,
        required: true,
    },
    statDescription: String,
    apolloClient: {
        type: String,
        required: true,
    },
    tokenAddress: {
        type: String,
        required: true,
    },
});

const { result, loading } = useQuery<TokenResponse>(getTokenLiquidityInfo(props.tokenAddress), null, {
    fetchPolicy: 'cache-first',
    pollInterval: 600000,
    clientId: props.apolloClient
});

const farmsValueLocked = useResult(result, [], data => data.token.pairQuote);

const tvl: ComputedRef<string> = computed(() => {
    let total: number = 0;

    farmsValueLocked.value.forEach(farmValue => {
        total += parseFloat(farmValue.reserveUSD);
    });

    return total.toFixed(2);
});

const filters: any = inject("filters");

</script>

<template>
    <SkeletonStat v-if="loading" />
    <div v-else class="stat">
        <div class="stat-figure text-secondary">
            <fa-icon :icon="statIcon" size="lg" />
        </div>
        <div class="stat-title">{{ statTitle }}</div>
        <div class="stat-value">{{ filters.usd(filters.kformat(tvl)) }}</div>
        <div class="stat-desc">{{ statDescription }}</div>
    </div>
</template>

<style scoped>

</style>