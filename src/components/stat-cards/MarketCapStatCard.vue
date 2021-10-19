<script setup lang="ts">
import { getTokenPriceInfo } from "../../utils/Constants";
import { TokenResponse } from "../../utils/entities/Token";
import { useQuery, useResult } from "@vue/apollo-composable";
import { getBurnedTokens, getTotalSupply } from "../../utils/FtmScanStats";
import { computed, inject } from "vue";

const props = defineProps({
    statIcon: String,
    statTitle: {
        trype: String,
        required: true,
    },
    apolloClient: {
        type: String,
        required: true,
    },
    tokenAddress: {
        type: String,
        required: true,
    },
});

const { result, loading } = useQuery<TokenResponse>(getTokenPriceInfo(props.tokenAddress), null, {
    fetchPolicy: 'cache-first',
    pollInterval: 600000,
    clientId: props.apolloClient
});

const price = useResult(result, "0.0", data => data.token.tokenDayData[0].priceUSD);
const totalSupply = await getTotalSupply(props.tokenAddress);
const burnedTokens = await getBurnedTokens(props.tokenAddress);

const marketCap = computed(() => {
    return ((parseFloat(totalSupply) - parseFloat(burnedTokens)) / Math.pow(10,18) * parseFloat(price.value)).toFixed(2);
})

console.log(marketCap)

const filters: any = inject("filters");
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