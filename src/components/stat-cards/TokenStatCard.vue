<script setup lang="ts">
import { inject } from "vue";

const props = defineProps({
    statIcon: String,
    statTitle: {
        trype: String,
        required: true,
    }
});

const filters: any = inject("filters");
const ftmScanStats: any = inject("ftmScanStats");

const totalSupply = await (ftmScanStats.totalSupply as Promise<string>);
const burnedTokens = await (ftmScanStats.burnedTokens as Promise<string>);

const circulatingToken = ((parseInt(totalSupply) - parseInt(burnedTokens)) / Math.pow(10, 18)).toFixed(2);
</script>

<template>
    <div class="stat">
        <div class="stat-figure text-primary">
            <fa-icon :icon="statIcon" size="lg" />
        </div>
        <div class="stat-title">{{ statTitle }}</div>
        <div class="stat-value">{{ filters.usd(filters.kformat(circulatingToken)) }}</div>
        <div class="stat-desc">Burned: {{ filters.usd(filters.kformat(burnedTokens)) }}</div>
    </div>
</template>

<style scoped>

</style>