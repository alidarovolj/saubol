<script setup>
import Header from "~/components/layout/header.vue";

const route = useRoute()

const user = useUserStore()
const {result} = storeToRefs(user)

const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="relative pt-16">
    <Header/>
    <div class="relative z-30 pb-10">
      <slot/>
    </div>
    <Footer/>
  </div>
</template>
