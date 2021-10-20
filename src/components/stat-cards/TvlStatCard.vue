<script setup lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable';
import { computed, ComputedRef, inject, Ref } from 'vue';
import { getTokenLiquidityInfo } from '../../utils/Constants';
import { PairQuote } from '../../utils/entities/PairQuote';
import { Token, TokenResponse } from '../../utils/entities/Token';
import SkeletonStat from './SkeletonStat.vue';

const props = defineProps({
    statIcon: String,
    statTitle: {
        trype: String,
        required: true,
    },
    statDescription: String
});

const filters: any = inject("filters");
const ftmScanStats: any = inject("ftmScanStats");
const farmsValueLocked: Ref<Readonly<Array<PairQuote>>> = ftmScanStats.tvlInfo as Ref<Readonly<Array<PairQuote>>>;

const tvl: ComputedRef<string> = computed(() => {
    let total: number = 0;

    farmsValueLocked.value.forEach(farmValue => {
        total += parseFloat(farmValue.reserveUSD);
    });

    return total.toFixed(2);
});
</script>

<template>
    <div class="stat">
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