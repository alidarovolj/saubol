<script setup lang="ts">
import {IconAddressBook, IconLogout, IconUserCircle, IconVaccine} from "@tabler/icons-vue";
import Spinner from "~/components/general/spinner.vue";

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const {result} = storeToRefs(user)

const pending = ref(true)

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const logoutLocal = async () => {
  await user.logoutProfile()
  router.push('/')
  await user.getProfile()
  notify(true, 'Вы успешно вышли из профиля')
}

onMounted(async () => {
  await user.getProfile()
  if(result.value === false) {
    router.push('/')
  } else {
    pending.value = false
  }
})
</script>

<template>
  <div class="flex justify-between gap-6">
    <div class="w-1/5">
      <div class="bg-white p-2 rounded-lg flex flex-col gap-1">
        <NuxtLink
            class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
            :class="{ 'bg-[#ECEDFF] text-mainColor' : route.fullPath === '/profile' }"
            to="/profile">
          <IconUserCircle size="30"/>
          <p>Мои профиль</p>
        </NuxtLink>
<!--        <NuxtLink-->
<!--            class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"-->
<!--            :class="{ 'bg-[#ECEDFF] text-mainColor' : route.fullPath === '/tests' }"-->
<!--            to="/">-->
<!--          <IconVaccine size="30"/>-->
<!--          <p>Анализы</p>-->
<!--        </NuxtLink>-->
        <NuxtLink
            class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
            :class="{ 'bg-[#ECEDFF] text-mainColor' : route.fullPath === '/addresses' }"
            to="/profile/addresses">
          <IconAddressBook size="30"/>
          <p>Адреса</p>
        </NuxtLink>
        <div
            @click="logoutLocal"
            class="cursor-pointer flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
        >
          <IconLogout size="30"/>
          <span>Выйти</span>
        </div>
      </div>
    </div>
    <div class="w-4/5">
      <div v-if="!pending" class="bg-white px-5 py-6 rounded-lg">
        <slot/>
      </div>
      <div v-else class="bg-white px-5 py-6 rounded-lg">
        <Spinner />
      </div>
    </div>
  </div>
</template>