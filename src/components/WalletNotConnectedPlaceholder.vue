<script setup lang="ts">
    import { connect } from '../services/Wallet';
</script>

<template>
    <section class="w-full m-2 mt-8 p-2 shadow-2xl h-screen text-center flex flex-col space-y-6 items-center">
        <img src="../assets/Ghost.png" alt="Ghost illustration" width="512" height="512">
        <h2 class="text-xl sm:text-3xl lg:text-4xl font-bold">Oh no!</h2>
        <h3 class="text-lg sm:text-xl lg:text-2xl">
            The ghost of 
            <span class="text-primary">
                Fantom
            </span> 
            noticed your wallet is not connected.</h3>
        <button @click="connect" id="wallet-button" class="btn btn-primary btn-md normal-case text-xl">
            <fa-icon icon="wallet" class="mr-2" />
            Connect Wallet
        </button>
    </section>
</template>

<style scoped>

</style>