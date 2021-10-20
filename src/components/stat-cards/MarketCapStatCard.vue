<script setup lang="ts">
import { getTokenPriceInfo } from "../../utils/Constants";
import { Token, TokenResponse } from "../../utils/entities/Token";
import { useQuery, useResult } from "@vue/apollo-composable";
import { computed, inject, Ref } from "vue";
import SkeletonStat from "./SkeletonStat.vue";

const props = defineProps({
    statIcon: String,
    statTitle: {
        trype: String,
        required: true,
    }
});

const filters: any = inject("filters");
const ftmScanStats: any = inject("ftmScanStats");
const price: Ref<string> = ftmScanStats.priceInfo as Ref<string>;

const totalSupply = await (ftmScanStats.totalSupply as Promise<string>);
const burnedTokens = await (ftmScanStats.burnedTokens as Promise<string>);

const marketCap = computed(() => {
    return ((parseFloat(totalSupply) - parseFloat(burnedTokens)) / Math.pow(10,18) * parseFloat(price.value)).toFixed(2);
})
</script>

<template>
    <div class="stat">
        <div class="stat-figure text-info">
            <fa-icon :icon="statIcon" size="lg" />
        </div>
        <div class="stat-title">{{ statTitle }}</div>
        <div class="stat-value">{{ filters.usd(filters.kformat(marketCap)) }}</div>
        <div class="stat-desc">Current price: {{ filters.usd(filters.kformat(price)) }}</div>
    </div>
</template>

<style scoped>

</style>