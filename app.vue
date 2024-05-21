<script setup>
const layout = ref("default");
const route = useRoute()

onMounted(async () => {
  await nextTick()
})

useHead({
  htmlAttrs: {
    "data-theme": "light",
  },
});
</script>

<template>
  <div v-if="route.fullPath !== '/'">
    <NuxtLayout :name="layout">
      <NuxtLoadingIndicator color="#3E46FF"/>
      <DelayHydration>
        <NuxtPage/>
      </DelayHydration>
    </NuxtLayout>
  </div>
  <div v-else>
    <DelayHydration>
      <NuxtPage/>
    </DelayHydration>
  </div>
</template>