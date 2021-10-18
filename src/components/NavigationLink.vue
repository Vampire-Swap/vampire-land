<script setup lang="ts">
import { NavigationLink } from "../utils/entities/NavigationLink";

const props = defineProps({
    navigationLink: {
        type: NavigationLink,
        required: true,
    }
});

</script>

<template>
    <router-link 
        :to="navigationLink.route" 
        class="btn btn-ghost btn-md rounded-btn normal-case lg:text-base hover:text-primary">
            <fa-icon v-if="navigationLink.icon" :icon="navigationLink.icon" class="mr-2" />
            {{ navigationLink.displayedContent }}
    </router-link>
</template>

<style scoped>

</style>