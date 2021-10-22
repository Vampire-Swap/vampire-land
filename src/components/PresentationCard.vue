<script setup lang="ts">import { computed } from '@vue/reactivity';

    const props = defineProps({
        imageName: {
            type: String,
            required: true
        },
        cardTitle: {
            type: String,
            required: true
        },
        cardContent: {
            type: String,
            required: true
        },
        cardActionText: {
            type: String,
            required: true
        },
        cardActionRoute: {
            type: String,
            required: true
        }
    })

</script>

<template>
    <div class="card text-center shadow-2xl lg:flex-1 lg:mb-0">
        <figure>
            <img :src="imageName" alt="presentation image" class="rounded-xl" width="256" height="256">
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ cardTitle }}</h2>
            <p>{{ cardContent }}</p>
            <div class="justify-center card-actions">
                <router-link :to="cardActionRoute" class="btn btn-outline btn-accent">{{ cardActionText }}</router-link>
            </div>
        </div>
    </div>    
</template>

<style scoped>
.card figure img {
    width: 256px;
    margin: 0 auto;
}
</style>