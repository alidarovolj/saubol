<script setup>
import BottomMenu from "~/components/layout/bottomMenu.vue";

const layout = ref("default");

const cart = useCartStore();

onMounted(async () => {
  await nextTick()
  await cart.cartList()
})

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
        <BottomMenu />
      </DelayHydration>
    </NuxtLayout>
  </div>
</template>