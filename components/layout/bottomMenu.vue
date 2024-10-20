<script setup>
import {
  IconHome,
  IconMenu2,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-vue";

const route = useRoute();

const auth = useAuthStore();
auth.initCookieToken();
const { token } = storeToRefs(auth);
</script>

<template>
  <div
    class="block md:hidden fixed bottom-0 left-0 w-full bg-white z-[100]"
    style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
  >
    <div class="flex justify-between">
      <NuxtLink to="/" class="w-1/4 text-center text-xs py-2">
        <IconHome size="24" class="w-6 h-6 mx-auto mb-1" />
        <p>Главная</p>
      </NuxtLink>
      <NuxtLink
        to="/services"
        :class="{ 'text-mainColor': route.fullPath.includes('/services') }"
        class="w-1/4 text-center text-xs py-2"
      >
        <IconMenu2 size="24" class="w-6 h-6 mx-auto mb-1" />
        <p>Услуги</p>
      </NuxtLink>
      <NuxtLink v-if="token" to="/cart" class="w-1/4 text-center text-xs py-2">
        <IconShoppingCart size="24" class="w-6 h-6 mx-auto mb-1" />
        <p>Корзина</p>
      </NuxtLink>
      <NuxtLink v-else to="/auth/login" class="w-1/4 text-center text-xs py-2">
        <IconShoppingCart size="24" class="w-6 h-6 mx-auto mb-1" />
        <p>Корзина</p>
      </NuxtLink>
      <NuxtLink
        v-if="token"
        to="/profile"
        class="w-1/4 text-center text-xs py-2"
      >
        <IconUser size="24" class="w-6 h-6 mx-auto mb-1" />
        <p>Профиль</p>
      </NuxtLink>
      <NuxtLink v-else to="/auth/login" class="w-1/4 text-center text-xs py-2">
        <IconUser size="24" class="w-6 h-6 mx-auto mb-1" />
        <p>Профиль</p>
      </NuxtLink>
    </div>
  </div>
</template>
