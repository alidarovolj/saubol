<script setup>
import {
  IconClipboard,
  IconMenu2,
  IconShoppingCart,
  IconUser
} from "@tabler/icons-vue"

const route = useRoute()
</script>

<template>
  <div
      class="block lg:hidden fixed bottom-0 left-0 w-full bg-white z-[100]"
      style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);">
    <div class="flex justify-between">
      <NuxtLink
          to="/"
          class="w-1/4 text-center text-xs py-2"
      >
        <IconClipboard
            size="24"
            class="w-6 h-6 mx-auto mb-1"
        />
        <p>
          Заказы
        </p>
      </NuxtLink>
      <NuxtLink
          to="/services"
          :class="{ 'text-mainColor' : route.fullPath.includes('/services') }"
          class="w-1/4 text-center text-xs py-2"
      >
        <IconMenu2
            size="24"
            class="w-6 h-6 mx-auto mb-1"
        />
        <p>
          Усулги
        </p>
      </NuxtLink>
      <NuxtLink
          to="/"
          class="w-1/4 text-center text-xs py-2"
      >
        <IconShoppingCart
            size="24"
            class="w-6 h-6 mx-auto mb-1"
        />
        <p>
          Корзина
        </p>
      </NuxtLink>
      <NuxtLink
          to="/"
          class="w-1/4 text-center text-xs py-2"
      >
        <IconUser
            size="24"
            class="w-6 h-6 mx-auto mb-1"
        />
        <p>
          Профиль
        </p>
      </NuxtLink>
    </div>
  </div>
</template>