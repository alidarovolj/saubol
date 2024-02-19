<script setup>
import AdminSidebar from "~/components/layout/adminSidebar.vue";

const user = useUserStore()
const {result} = storeToRefs(user)

const auth = useAuthStore()
auth.initCookieAdminToken()
const {adminToken} = storeToRefs(auth)

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="h-screen">
    <div class="flex h-full gap-5">
      <AdminSidebar class="hidden lg:block w-[260px] min-w-[260px] h-screen"/>
      <div class="relative pt-10 overflow-y-auto w-full">
        <div class="relative z-30">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>