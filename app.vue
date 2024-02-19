<script setup>
import {useAuthStore} from "~/store/auth.js";

const layout = ref("default");

const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)

const route = useRoute()

const cart = useCartStore();

onMounted(async () => {
  await nextTick()
  if(token.value) {
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