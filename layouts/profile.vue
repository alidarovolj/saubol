<script setup lang="ts">
import {IconAddressBook, IconExclamationMark, IconLogout, IconUserCircle, IconVaccine} from "@tabler/icons-vue";
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
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="block lg:flex justify-between gap-6">
    <div class="w-full lg:w-1/5 mb-5 lg:mb-0">
      <div
          style="box-shadow: 0px 4px 20px 0px #0000001A;"
          class="bg-white p-2 rounded-lg flex flex-col gap-1">
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
    <div class="w-full lg:w-4/5">
      <div v-if="!pending">
        <div
            v-if="result.data.phone_number && !result.data.is_phone_verified"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="text-sm flex items-center gap-3 bg-white p-3 rounded-lg mb-5 w-max">
          <div class="bg-red-500 rounded-full p-1 text-white w-14 h-14 flex items-center justify-center ">
            <IconExclamationMark size="40"/>
          </div>
          <div>
            <p class="mb-2">Необходимо верифицировать номер</p>
            <button
                onclick="verificationModal.showModal()"
                class="bg-mainColor text-white rounded-lg px-10 py-2">
              Отправить код
            </button>
          </div>
        </div>
        <div
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="bg-white px-5 py-6 rounded-lg">
          <slot />
        </div>
        <VerifyNumber :numPhone="result.data.phone_number" />
      </div>
      <div v-else class="bg-white px-5 py-6 rounded-lg">
        <Spinner/>
      </div>
    </div>
  </div>
</template>