<script setup>
import {IconHome, IconMenu2, IconShoppingCart, IconUser,} from "@tabler/icons-vue";

const route = useRoute();

const auth = useAuthStore();
auth.initCookieToken();
const {token} = storeToRefs(auth);
</script>

<template>
  <div
      v-if="token"
      class="block md:hidden fixed bottom-0 left-0 w-full bg-white z-[100]"
      style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
  >
    <div class="flex justify-between">
      <NuxtLink class="w-1/4 text-center text-xs py-2" to="/">
        <IconHome class="w-6 h-6 mx-auto mb-1" size="24"/>
        <p>Главная</p>
      </NuxtLink>
      <NuxtLink
          :class="{ 'text-mainColor': route.fullPath.includes('/services') }"
          class="w-1/4 text-center text-xs py-2"
          to="/services"
      >
        <IconMenu2 class="w-6 h-6 mx-auto mb-1" size="24"/>
        <p>Услуги</p>
      </NuxtLink>
      <NuxtLink v-if="token" class="w-1/4 text-center text-xs py-2" to="/cart">
        <IconShoppingCart class="w-6 h-6 mx-auto mb-1" size="24"/>
        <p>Корзина</p>
      </NuxtLink>
      <NuxtLink v-else class="w-1/4 text-center text-xs py-2" to="/auth/login">
        <IconShoppingCart class="w-6 h-6 mx-auto mb-1" size="24"/>
        <p>Корзина</p>
      </NuxtLink>
      <NuxtLink
          v-if="token"
          class="w-1/4 text-center text-xs py-2"
          to="/profile"
      >
        <IconUser class="w-6 h-6 mx-auto mb-1" size="24"/>
        <p>Профиль</p>
      </NuxtLink>
      <NuxtLink v-else class="w-1/4 text-center text-xs py-2" to="/auth/login">
        <IconUser class="w-6 h-6 mx-auto mb-1" size="24"/>
        <p>Профиль</p>
      </NuxtLink>
    </div>
  </div>
</template>
