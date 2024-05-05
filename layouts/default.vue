<script setup>
import Header from "~/components/layout/header.vue";

const route = useRoute()

const user = useUserStore()

const auth = useAuthStore()
auth.initCookieToken()

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="relative pt-16">
    <Header/>
    <div
        :class="{ '!pb-0' : route.fullPath === '/auth/login' || route.fullPath === '/auth/registration' }"
        class="relative z-30 pb-10">
      <slot/>
    </div>
    <Footer/>
  </div>
</template>
