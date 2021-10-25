<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { AlertType } from '../utils/entities/AlertType';

    defineProps({
        alertType: String as PropType<AlertType>,
        alertMessage: String
    })
</script>

<template>
    <div :class="'alert ' + 'alert-' + alertType">
        <div class="flex-1">
            <svg v-if="alertType === AlertType.ERROR" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#2196f3" class="w-6 h-6 mx-2 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
            </svg>
            <svg v-if="alertType === AlertType.WARNING" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"> 
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>                         
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-2 fill-current" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M11 17.768l-4.884-4.884l1.768-1.768L11 14.232l8.658-8.658A9.98 9.98 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10a9.94 9.94 0 0 0-.966-4.266L11 17.768z" fill="currentColor"/>
            </svg>
            <label>{{alertMessage}}</label>
        </div>
    </div>
</template>

<style scoped>

</style>