<script setup>
import BottomMenu from "~/components/layout/bottomMenu.vue";
import {useAuthStore} from "~/store/auth.js";

const layout = ref("default");

const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)

const route = useRoute()

const cart = useCartStore();

onMounted(async () => {
  await nextTick()
  if (token.value) {
    await cart.cartList()
  }
})

useHead({
  htmlAttrs: {
    "data-theme": "light",
  },
});
</script>

<template>
  <div class="w-full min-h-screen">
    <NuxtLayout v-if="route.fullPath !== '/'" :name="layout">
      <NuxtLoadingIndicator color="#3E46FF"/>
      <DelayHydration>
        <NuxtPage/>
        <BottomMenu/>
      </DelayHydration>
    </NuxtLayout>
    <div
        v-else
        class="w-full h-full flex flex-col justify-center items-center"
    >
      <NuxtLoadingIndicator color="#3E46FF"/>
      <EmptyHeader />
      <DelayHydration>
        <NuxtPage/>
      </DelayHydration>
    </div>
  </div>
</template>