<script setup lang="ts">
import {
  IconAddressBook, IconExclamationMark, IconLogout, IconUserCircle,
  IconCamera,
  IconEdit,
  IconRuler3,
  IconScaleOutline,
  IconMathXDivideY
} from "@tabler/icons-vue";
import Spinner from "~/components/general/spinner.vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const {result} = storeToRefs(user)

const loading = ref(false)

const pending = ref(true)

const editMode = ref(false)

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

const form = ref({
  name: '',
  iin: '',
  height: '',
  weight: ''
})

const v$ = useVuelidate({
  name: {required},
  iin: {required},
  height: {required},
  weight: {required}
}, form);

const formattedName = computed(() => {
  if (result.value && result.value.data && result.value.data.name) {
    return result.value.data.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
  }
  return '';
});

const doneIMT = computed(() => {
  if (result.value && result.value.data && result.value.data.user_data) {
    const {height, weight} = result.value.data.user_data
    const imt = weight / ((height / 100) * (height / 100))
    return imt.toFixed(2)
  }
  return ''
})

const updateProfileLocal = async () => {
  loading.value = true
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }
  await user.updateProfile(form.value)
  await user.getProfile()
  loading.value = false
  editMode.value = false
}

onMounted(async () => {
  await user.getProfile()
  if (result.value === false) {
    router.push('/')
    pending.value = false
  } else {
    form.value.name = result.value.data.name
    form.value.iin = result.value.data.iin
    if (result.value.data.user_data) {
      form.value.height = result.value.data.user_data.height
      form.value.weight = result.value.data.user_data.weight
    }
    pending.value = false
  }
})
</script>

<template>
  <div class="block lg:flex justify-between gap-6">
    <div class="w-full lg:w-4/5">
      <div v-if="!pending">
        <div
            v-if="result.data.phone_number && !result.data.is_phone_verified"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="text-sm flex items-center gap-3 bg-white p-3 rounded-lg mb-5 w-full">
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
        <form
            @submit.prevent="updateProfileLocal"
            class="block lg:flex justify-between w-full gap-5 mb-6">
          <div
              style="box-shadow: 0px 4px 20px 0px #0000001A;"
              class="flex mb-4 items-center bg-white w-full gap-3 lg:w-1/3 h-full p-5 rounded-lg">
            <div
                v-if="result.data.img"
                class="relative h-full"
            >
              <img
                  :src="result.data.img"
                  class="min-w-28 w-28 min-h-28 h-28 rounded-full object-cover mx-auto"
                  alt=""
              >
            </div>
            <div
                v-else
                class="relative h-full"
            >
              <img
                  class="min-w-28 w-28 min-h-28 h-28 rounded-full object-cover mx-auto"
                  src="@/assets/img/services/male_doctor.png"
                  alt="">
            </div>
            <div>
              <h1
                  v-if="!editMode"
                  class="text-sm font-bold mb-3">
                {{ result.data.name }}
              </h1>
              <p class="text-xs font-semibold text-mainColor px-5 py-1 rounded bg-[#E7F0FF] w-max">
                {{ result.data.staff.specialization.name }}
              </p>
            </div>
            <div
                v-if="editMode"
                class="w-1/2 mx-auto mt-3"
            >
              <input
                  v-model="form.name"
                  :class="{'border-red-500': v$.name.$error}"
                  class="px-2 py-2 border rounded-lg w-full text-center"
                  type="text"
                  placeholder="Введите имя"
              >
              <p
                  v-if="v$.name.$error && editMode"
                  class="text-red-500 text-xs">
                Пожалуйста заполните данное поле
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/5 mb-4 lg:mb-0">
            <div
                style="box-shadow: 0px 4px 20px 0px #0000001A;"
                class="bg-white p-2 rounded-lg flex overflow-x-auto gap-1 text-sm">
              <NuxtLink
                  class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
                  :class="{ 'bg-mainColor !text-white' : route.fullPath === '/profile/my-data' }"
                  to="/profile/my-data">
                <p>Мои данные</p>
              </NuxtLink>
              <NuxtLink
                  class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
                  :class="{ 'bg-mainColor !text-white' : route.fullPath === '/profile' }"
                  to="/profile">
                <p>Мой профиль</p>
              </NuxtLink>
              <NuxtLink
                  class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
                  :class="{ 'bg-mainColor !text-white' : route.fullPath === '/profile/docs' }"
                  to="/profile/docs">
                <p>Документы</p>
              </NuxtLink>
            </div>
          </div>
        </form>
        <div>
          <slot/>
        </div>
        <VerifyNumber :numPhone="result.data.phone_number"/>
      </div>
      <div v-else class="bg-white px-5 py-6 rounded-lg">
        <Spinner/>
      </div>
    </div>
  </div>
</template>