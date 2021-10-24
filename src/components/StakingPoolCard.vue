<script setup lang="ts">import { PropType, Ref } from '@vue/runtime-core';
import { PoolEntity } from '../utils/entities/PoolEntity';
import randomColor from 'randomcolor';
import Color from 'color';
import { v4 as uuid_v4 } from 'uuid';
import { computed, inject, ref } from 'vue';
import { loadPoolData } from '../services/PoolDataLoader';
import { useQuery, useResult } from '@vue/apollo-composable';
import { BigNumber } from 'ethers';
import { getTokenPriceInfo } from '../utils/Constants';
import { TokenResponse } from '../utils/entities/Token';
import { approvePool, depositPool } from '../services/PoolOps';

const props = defineProps({
    pool: {
        type: Object as PropType<PoolEntity>,
        required: true
    },
    apolloProvider: {
        type: String,
        required: true
    }
})

const hueSeed: string = randomColor();

const randomColor1 = randomColor({
    hue: hueSeed,
    luminosity: 'light',
});

const randomColor2 = Color(randomColor1).lighten(0.5);

const modalId = uuid_v4();

const approvedNow: Ref<boolean> = ref(false);
let depositAmount  = ref(0);
let withdrawAmount = ref(0);

const filters: any = inject("filters");
const ethFormat: any = inject("ethFormat");

function toggleModal() {
    const modal: HTMLElement | null = document.getElementById(modalId);

    if (modal) {
        if (modal.classList.contains('modal-open')) {
            modal.classList.remove('modal-open');
        }
        else {
            modal.classList.add('modal-open');
        }
    }
}

function computeAPR(rewardPerSecond: BigNumber, totalStaked: BigNumber, rewardPrice: number, stakePrice: number): string {
    const dailyDistribution: number = rewardPerSecond.mul(Math.pow(10, 5)).div(Math.pow(10, 18).toString()).mul(86_400).toNumber() / Math.pow(10, 5);

    const annualizedRewards = dailyDistribution * 365 * rewardPrice;
    const valueStaked = totalStaked.div(Math.pow(10, 18).toString()).toNumber() * stakePrice;

    if (valueStaked === 0) {
        return "inf"
    }
    else {
        return (annualizedRewards / valueStaked * 100).toString();
    }
}

function approve() {
    approvePool(props.pool)
    .then((value) => {
        if (value) {
            approvedNow.value = true;
        }
    });
}

function deposit() {
    depositPool(props.pool, depositAmount.value.toFixed(15))
    .then((result) => {
        if (result) {
            loadPoolData(props.pool, props.apolloProvider).then((loaded) => loadedPool.value = loaded)
        }
    })
}

const { result, loading } = useQuery<TokenResponse>(getTokenPriceInfo(props.pool.rewardTokenAddress), null, {
    fetchPolicy: 'cache-first',
    pollInterval: 600000,
    clientId: props.apolloProvider
});

const price = useResult(result, "0.0", data => data.token.tokenDayData[0].priceUSD)

const loadedPool: Ref<PoolEntity> = ref(await loadPoolData(props.pool, props.apolloProvider));

const apr = computed(() => {return computeAPR(loadedPool.value.rewardPerSecond!, loadedPool.value.totalStaked!, parseFloat(price.value), parseFloat(price.value))})
</script>

<template>
    <div class="card shadow-xl bordered">
        <div class="flex justify-center items-center px-4 py-2">
            <img src="../assets/Bat.png" alt="vampire land logo" height="112" width="112" class="rounded-full p-1" :style="{backgroundImage: `linear-gradient(to top right, ${randomColor1}, ${randomColor2})`}" >
        </div>
        <div class="card-body p-4">
            <h2 class="card-title">{{ pool.rewardTokenName }} pool</h2>
            <div class="flex space-x-2 mb-2">
                <span v-if="pool.new" class="badge badge-secondary">New</span>
            </div>
             <p>Deposit {{ pool.stakeTokenSymbol }} - Earn {{ pool.rewardTokenSymbol }}</p>
            <div class="justify-end  card-actions">
                <button @click="toggleModal" class="btn btn-secondary">Manage</button>
            </div>
        </div>
    </div>

    <div class="modal" :id="modalId">
        <div class="modal-box flex flex-col justify-center items-center">

            <div class="shadow-xl stats flex w-full overflow-x-scroll">
                <div class="stat place-items-center place-content-center">
                    <div class="stat-desc text-primary opacity-100">
                        <fa-icon icon="chart-area" size="lg"></fa-icon>
                    </div>
                    <div class="stat-title">APR</div>
                    <div v-if="loading" class="card-title rounded w-1/1 h-8 animate-pulse bg-gray-200"></div>
                    <div v-else class="stat-value">{{ filters.kformat(apr) }}%</div>
                </div>
                <div class="stat place-items-center place-content-center">
                    <div class="stat-desc text-primary opacity-100">
                        <fa-icon icon="wallet" size="lg"></fa-icon>
                    </div>
                    <div class="stat-title">Tokens in your wallet</div>
                    <div class="stat-value">{{ filters.kformat(ethFormat(loadedPool.walletTokens)) }}</div>
                </div>
                <div class="stat place-items-center place-content-center">
                    <div class="stat-desc text-primary opacity-100">
                        <fa-icon icon="piggy-bank" size="lg"></fa-icon>
                    </div>
                    <div class="stat-title">Tokens deposited</div>
                    <div class="stat-value">{{ filters.kformat(ethFormat(loadedPool.depositedTokens)) }}</div>
                </div>
                <div class="stat place-items-center place-content-center">
                    <div class="stat-desc text-primary opacity-100">
                        <fa-icon icon="wheat" size="lg"></fa-icon>
                    </div>
                    <div class="stat-title">Tokens to harvest</div>
                    <div class="stat-value">{{ filters.kformat(ethFormat(loadedPool.pendingReward)) }}</div>
                </div>
            </div>

            <div v-if="loadedPool.approved || approvedNow" class="flex flex-col justify-center items-center">
                <div class="form-control w-full">
                    <label class="label flex justify-between">
                        <span class="label-text">Deposit VMP</span>
                        <div>
                            <button class="btn btn-link">MAX</button>
                        </div>
                    </label>
                    <div class="flex space-x-2">
                        <input v-model="depositAmount" type="number" placeholder="0.00" class="w-full input input-primary input-bordered">
                        <button @click="deposit" class="btn btn-primary">Deposit</button>
                    </div>
                </div>

                <div class="form-control mt-2 w-full">
                    <label class="label flex justify-between">
                        <span class="label-text">Withdraw VMP</span>
                        <div>
                            <button class="btn btn-link">MAX</button>
                        </div>
                    </label>
                    <div class="flex space-x-2">
                        <input v-model="withdrawAmount" type="number" placeholder="0.00" class="w-full input input-primary input-bordered">
                        <button class="btn btn-primary">Withdraw</button>
                    </div>
                </div>

                <div class="flex justify-center mt-5">
                    <button class="btn btn-outline btn-accent">Just Harvest</button>
                </div>
            </div>
            <div v-else class="flex flex-col justify-center items-center">
                <div class="flex justify-center mt-5">
                    <button @click="approve" class="btn btn-outline btn-accent">Approve Contract</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar{
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-thumb{
    background: #ff5555;
    border-radius: 2rem;
}
::-webkit-scrollbar-thumb:hover{
    background: #ff3b3b;
}
::-webkit-scrollbar-track{
    background: #F0F0F0;
    border-radius: 2rem;
    box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}
</style>