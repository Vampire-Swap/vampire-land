<script setup lang="ts">import { PropType } from '@vue/runtime-core';
import { PoolEntity } from '../utils/entities/PoolEntity';
import randomColor from 'randomcolor';
import Color from 'color';

defineProps({
    pool: {
        type: Object as PropType<PoolEntity>,
        required: true
    }
})

const hueSeed: string = randomColor();

const randomColor1 = randomColor({
    hue: hueSeed,
    luminosity: 'light',
});

const randomColor2 = Color(randomColor1).lighten(0.5);

const poolTokenColor: string = randomColor({
    hue: hueSeed,
    luminosity: 'dark',
    format: 'hsla',
    alpha: 1
});
</script>

<template>
    <div class="card bordered shadow-lg">
        <div class="flex items-center m-4">
            <h1 :style="{color: poolTokenColor, textShadow: `1px 1px ${poolTokenColor}`, backgroundImage: `linear-gradient(to top right, ${randomColor1}, ${randomColor2})`}" class="px-2 py-6 font-black text-3xl rounded-full">{{ pool.rewardTokenSymbol }}</h1>
            <div>

            </div>
        </div>
        <div class="card-body">
            <h2 class="card-title">Top image
                <div class="badge mx-2 badge-secondary">NEW</div>
            </h2> 
            <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p> 
            <div class="justify-end card-actions">
                <button class="btn btn-secondary">More info</button>
            </div>
        </div>
    </div> 
</template>

<style scoped>

</style>