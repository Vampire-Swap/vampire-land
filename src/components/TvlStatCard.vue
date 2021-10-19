<script setup lang="ts">
    import { useQuery, useResult } from '@vue/apollo-composable';
    import { gql } from 'graphql-tag';
    import { computed, ComputedRef } from 'vue';
    import { TokenResponse } from '../utils/entities/Token';
    
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

    const GET_LIQUIDITY_POOLS = gql`
        query GetLiquidityPools_SPOOKY {
            token(id: "${props.tokenAddress}") {
                pairQuote(orderBy: reserveUSD, first: 10, orderDirection: desc) {
                    reserveUSD
                }
                tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
                    priceUSD
                }
            }
        }
    `;

    const { result, loading } = useQuery<TokenResponse>(GET_LIQUIDITY_POOLS, null, {
        fetchPolicy: 'cache-first',
        pollInterval: 60000,
        clientId: props.apolloClient
    });

    const farmsValueLocked = useResult(result, [], data => data.token.pairQuote);

    const tvl: ComputedRef<string> = computed(() => {
        let total: number = 0;

        farmsValueLocked.value.forEach(farmValue => {
            total += parseFloat(farmValue.reserveUSD);
        });

        console.log(total)

        return total.toFixed(2);
    });

</script>

<template>
    <div class="stat">
        <div class="stat-figure text-secondary">
            <fa-icon :icon="statIcon" size="lg" />
        </div>
        <div class="stat-title">{{ statTitle }}</div>
        <div class="stat-value">{{ $filters.usd($filters.kformat(tvl)) }}</div>
        <div class="stat-desc">{{ statDescription }}</div>
    </div>
</template>

<style scoped>

</style>