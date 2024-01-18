<script setup>
const layout = ref("default");

useHead({
  htmlAttrs: {
    "data-theme": "light",
  },
});
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtLoadingIndicator color="#3E46FF"/>
      <DelayHydration>
        <NuxtPage/>
      </DelayHydration>
    </NuxtLayout>
  </div>
</template>