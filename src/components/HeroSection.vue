<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
    })
</script>

<template>
    <section class="hero">
      <div class="hero-content text-center">
        <div class="flex flex-col justify-center items-center">
          <h1 class="mb-5 sm:text-5xl md:text-7xl text-3xl font-bold text-primary">{{ title }}</h1>
          <p class="mb-1 sm:text-2xl md:text-3xl text-xl font-bold">{{ subtitle }}</p>
          <slot />
        </div>
      </div>
    </section>
</template>

<style scoped>

</style>