<script setup>
import AdminSidebar from "~/components/layout/adminSidebar.vue";

const user = useUserStore()

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="h-screen">
    <div class="flex h-full">
      <AdminSidebar class="hidden lg:block w-[260px] min-w-[260px] h-screen"/>
      <AdminMobSiderbar class="block lg:hidden" />
      <div class="relative py-10 overflow-y-auto w-full px-5 mt-10 lg:mt-0">
        <div class="relative z-30">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>