<script setup>
import {
  IconClipboard,
  IconUser,
  IconCalendarTime,
  IconSettings
} from "@tabler/icons-vue"

const route = useRoute()

const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)
</script>

<template>
  <div
      class="block lg:hidden fixed bottom-0 left-0 w-full bg-white z-[100]"
      style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);">
    <div class="flex justify-between">
      <NuxtLink
          to="/profile/orders"
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
          to="/profile"
          :class="{ 'text-mainColor' : route.fullPath.includes('/profile') }"
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
      <NuxtLink
          to="/time-settings"
          class="w-1/4 text-center text-xs py-2"
      >
        <IconCalendarTime
            size="24"
            class="w-6 h-6 mx-auto mb-1"
        />
        <p>
          График работы
        </p>
      </NuxtLink>
      <NuxtLink
          to="/settings"
          class="w-1/4 text-center text-xs py-2"
      >
        <IconSettings
            size="24"
            class="w-6 h-6 mx-auto mb-1"
        />
        <p>
          Настройки
        </p>
      </NuxtLink>
    </div>
  </div>
</template>