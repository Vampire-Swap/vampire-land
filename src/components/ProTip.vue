<script setup lang="ts">
    const tips: Array<string> = new Array(
        "If depositing/withdrawing doesn't seem to work, try manually deleting a couple of decimals.",
        "APR is influenced by the price of the staked token, the price of the reward token and the total staked amount.",
        "APR represents the estimated returns over a year, without compounding."
    );

    const randomTip: string = tips[Math.floor(Math.random() * tips.length)];
</script>

<template>
    <div>
        <h3 class="font-bold text-sm">💡 PRO Tip: {{randomTip}}<span class="font-normal text-sm"></span></h3>
    </div>
</template>

<style scoped>

</style>