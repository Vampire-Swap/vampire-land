<script setup lang="ts">
import WalletNotConnectedPlaceholder from '../components/WalletNotConnectedPlaceholder.vue';
import { ACCOUNT } from '../services/Wallet';
import StakingPoolCard from '../components/StakingPoolCard.vue';
import { PoolEntity } from '../utils/entities/PoolEntity';
import { BOO_TOKEN_ADDRESS, VMP_TOKEN_ADDRESS } from '../utils/Constants';

const POOLS: Array<PoolEntity> = new Array(
    {
      stakeTokenAddress: VMP_TOKEN_ADDRESS,
      poolContractAddress: "0xEe8A641CF7A7e0cF0474a4F27f72e4E9D665C1D7",
      rewardTokenAddress: BOO_TOKEN_ADDRESS,
      stakeTokenName: "Vampire",
      stakeTokenSymbol: "VMP",
      rewardTokenName: "Vampire",
      rewardTokenSymbol: "VMP",
      rewardTokenLogo: "../../assets/vmp.svg"
    }
);
</script>

<template>
    <WalletNotConnectedPlaceholder v-if="ACCOUNT === 'Connect Wallet'" />
    <div v-else class="min-h-screen">
        <section class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 m-2 mt-8">
            <StakingPoolCard v-for="pool in POOLS" :key="pool.poolContractAddress" :pool="pool" />
        </section>
    </div>
</template>

<style scoped>

</style>