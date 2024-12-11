<script setup>
import {
  IconAddressBook,
  IconEdit,
  IconLogout,
  IconMan,
  IconMathXDivideY,
  IconRuler3,
  IconScaleOutline,
  IconUserCircle,
} from '@tabler/icons-vue';
import Spinner from '~/components/general/spinner.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const route = useRoute();
const router = useRouter();

const user = useUserStore();
const { result } = storeToRefs(user);
const modals = useModalsStore()

const loading = ref(false);

const pending = ref(true);

const editMode = ref(false);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const logoutLocal = async () => {
  await user.logoutProfile();
  router.push('/');
  await user.getProfile();
  notify(true, 'Вы успешно вышли из профиля');
};

const form = ref({
  name: '',
  iin: '',
  height: '',
  weight: '',
});

const v$ = useVuelidate(
    {
      name: { required },
      iin: { required },
      height: { required },
      weight: { required },
    },
    form
);

const formattedName = computed(() => {
  if (result.value && result.value.data && result.value.data.name) {
    return result.value.data.name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
  }
  return '';
});

const doneIMT = computed(() => {
  if (result.value && result.value.data && result.value.data.user_data) {
    const { height, weight } = result.value.data.user_data;
    const imt = weight / ((height / 100) * (height / 100));
    return imt.toFixed(2);
  }
  return '';
});

const updateProfileLocal = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }
  await user.updateProfile(form.value);
  await user.getProfile();
  loading.value = false;
  editMode.value = false;
};

onMounted(async () => {
  await user.getProfile();
  if (result.value === false) {
    router.push('/');
    pending.value = false;
  } else {
    form.value.name = result.value.data.name;
    form.value.iin = result.value.data.iin;
    if (result.value.data.user_data) {
      form.value.height = result.value.data.user_data.height;
      form.value.weight = result.value.data.user_data.weight;
    }
    pending.value = false;
  }
});
</script>

<template>
  <!--  <div></div>-->
  <div class="flex flex-col-reverse md:flex-row justify-between gap-6">
    <div class="w-full md:w-1/5 mb-5 md:mb-0">
      <div
        class="bg-white p-2 rounded-lg flex flex-col gap-1"
        style="box-shadow: 0px 4px 20px 0px #0000001a">
        <NuxtLink
          :class="{
            'bg-[#fe2c3945] text-mainColor': route.fullPath === '/profile',
          }"
          class="text-sm md:text-base flex items-center hover:bg-[#fe2c3945] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
          to="/profile">
          <IconUserCircle class="size-5 md:size-7" />
          <p>Мои профиль</p>
        </NuxtLink>
        <NuxtLink
          :class="{
            'bg-[#fe2c3945] text-mainColor':
              route.fullPath === '/profile/orders',
          }"
          class="text-sm md:text-base flex items-center hover:bg-[#fe2c3945] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
          to="/profile/orders">
          <IconUserCircle class="size-5 md:size-7" />
          <p>Мои заказы</p>
        </NuxtLink>
        <NuxtLink
          :class="{
            'bg-[#fe2c3945] text-mainColor':
              route.fullPath === '/profile/addresses',
          }"
          class="text-sm md:text-base flex items-center hover:bg-[#fe2c3945] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
          to="/profile/addresses">
          <IconAddressBook class="size-5 md:size-7" />
          <p>Мои адреса</p>
        </NuxtLink>
        <div
          class="text-sm md:text-base cursor-pointer flex items-center hover:bg-[#fe2c3945] hover:text-mainColor gap-3 p-3 rounded-lg transition-all"
          @click="logoutLocal">
          <IconLogout class="size-5 md:size-7" />
          <span>Выйти</span>
        </div>
      </div>
    </div>
    <div class="w-full md:w-4/5">
      <div v-if="!pending">
        <form
          class="block md:flex justify-between w-full gap-5 mb-6"
          @submit.prevent="updateProfileLocal">
          <div
            class="bg-white w-full md:w-1/3 h-full p-5 rounded-lg"
            style="box-shadow: 0px 4px 20px 0px #0000001a">
            <div class="flex justify-end text-mainColor">
              <button @click="modals.showModal('setImage')">
                <IconEdit />
              </button>
            </div>
            <div class="mb-3">
              <div
                v-if="result.data.img"
                class="relative h-full">
                <img
                  :src="result.data.img"
                  alt=""
                  class="w-36 h-36 rounded-full object-cover mx-auto" />
              </div>
              <div
                v-if="!result.data.img"
                class="relative w-36 h-36 mx-auto bg-mainColor bg-opacity-20 rounded-lg min-w-20">
                <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-mainColor text-xl">
                  {{ formattedName }}
                </p>
              </div>
            </div>
            <h1
              v-if="!editMode"
              class="text-xl font-bold text-center my-3">
              {{ result.data.name }}
            </h1>
            <div class="block">
              <div class="flex items-center justify-between mb-3 md:mb-5">
                <p class="text-[#9A9BA4] mb-1">ИИН</p>
                <div class="w-full md:w-1/2">
                  <input
                    v-if="editMode"
                    v-model="form.iin"
                    :class="{ 'border-red-500': v$.iin.$error }"
                    class="px-2 py-2 border rounded-lg w-full"
                    placeholder="Введите ИИН"
                    type="text" />
                  <p
                    v-if="v$.iin.$error && editMode"
                    class="text-red-500 text-xs">
                    Пожалуйста заполните данное поле
                  </p>
                </div>
                <div v-if="!editMode">
                  <p v-if="result.data.iin">
                    {{ result.data.iin }}
                  </p>
                  <p
                    v-else
                    class="text-red-500">Необходимо заполнить</p>
                </div>
              </div>
              <div class="flex items-center justify-between mb-3 md:mb-5">
                <p class="text-[#9A9BA4] mb-1">Email</p>
                <p v-if="result.data.email">
                  {{ result.data.email }}
                </p>
                <p
                  v-else
                  class="text-red-500">Необходимо заполнить</p>
              </div>
              <div class="flex items-center justify-between mb-3 md:mb-0">
                <p class="text-[#9A9BA4] mb-1">Телефон</p>
                <div>
                  <p v-if="result.data.phone_number">
                    {{ result.data.phone_number }}
                  </p>
                  <p
                    v-else
                    class="text-red-500">Необходимо заполнить</p>
                </div>
              </div>
              <!--                    <div class="flex flex-col">-->
              <!--                      <p class="text-[#9A9BA4] mb-1">-->
              <!--                        Адрес-->
              <!--                      </p>-->
              <!--                      <p v-if="result.data.address">-->
              <!--                        {{ result.data.address }}-->
              <!--                      </p>-->
              <!--                      <p-->
              <!--                          v-else-->
              <!--                          class="text-red-500">-->
              <!--                        Необходимо заполнить-->
              <!--                      </p>-->
              <!--                    </div>-->
            </div>
            <div
              v-if="editMode"
              class="w-1/2 mx-auto mt-3">
              <input
                v-model="form.name"
                :class="{ 'border-red-500': v$.name.$error }"
                class="px-2 py-2 border rounded-lg w-full text-center"
                placeholder="Введите имя"
                type="text" />
              <p
                v-if="v$.name.$error && editMode"
                class="text-red-500 text-xs">
                Пожалуйста заполните данное поле
              </p>
            </div>
          </div>
          <div
            class="mt-5 rounded-lg md:mt-0 w-full md:w-2/3 flex flex-col justify-between gap-5 bg-white p-5"
            style="box-shadow: 0px 4px 20px 0px #0000001a">
            <div class="flex items-center justify-between text-mainColor w-full">
              <h1 class="text-black text-xl font-bold">Мои данные</h1>
              <div class="flex items-center gap-5">
                <div
                  v-if="editMode"
                  class="w-max">
                  <button
                    v-if="!loading"
                    class="bg-mainColor text-center text-white px-5 py-2 rounded-lg"
                    type="submit">
                    Обновить
                  </button>
                  <p
                    v-else
                    class="w-max bg-mainColor text-center text-white px-5 py-2 rounded-lg">
                    <span class="spinner"></span>
                  </p>
                </div>
                <IconEdit
                  class="cursor-pointer"
                  size="24"
                  @click="editMode = !editMode" />
              </div>
            </div>
            <div class="block md:flex justify-between gap-5">
              <img
                v-if="!doneIMT"
                alt=""
                class="md:w-1/2 w-full h-[300px] object-contain mb-5 md:mb-0"
                src="@/assets/img/bodies/1.png" />
              <img
                v-if="doneIMT && doneIMT < 18.5"
                alt=""
                class="md:w-1/2 w-full h-[300px] object-contain mb-5 md:mb-0"
                src="@/assets/img/bodies/1.png" />
              <img
                v-else-if="doneIMT && doneIMT > 18.5 && doneIMT < 24.9"
                alt=""
                class="md:w-1/2 w-full h-[300px] object-contain mb-5 md:mb-0"
                src="@/assets/img/bodies/2.png" />
              <img
                v-else-if="doneIMT && doneIMT > 24.9 && doneIMT < 29.9"
                alt=""
                class="md:w-1/2 w-full h-[300px] object-contain mb-5 md:mb-0"
                src="@/assets/img/bodies/3.png" />
              <img
                v-else-if="doneIMT && doneIMT > 29.9 && doneIMT < 34.9"
                alt=""
                class="md:w-1/2 w-full h-[300px] object-contain mb-5 md:mb-0"
                src="@/assets/img/bodies/4.png" />
              <img
                v-else-if="doneIMT && doneIMT > 34.9"
                alt=""
                class="md:w-1/2 w-full h-[300px] object-contain mb-5 md:mb-0"
                src="@/assets/img/bodies/5.png" />
              <div class="md:w-1/2 w-full flex flex-col justify-between gap-3">
                <div
                  :class="[
                    { '!bg-emerald-300': doneIMT < 18.5 },
                    { '!bg-green-400': doneIMT > 18.5 && doneIMT < 24.9 },
                    {
                      '!bg-blue-400 text-white':
                        doneIMT > 24.9 && doneIMT < 29.9,
                    },
                    {
                      '!bg-purple-500 text-white':
                        doneIMT > 29.9 && doneIMT < 34.9,
                    },
                    { '!bg-red-700 text-white': doneIMT > 34.9 },
                  ]"
                  class="w-full bg-[#fe2c3945] p-3 rounded-lg flex items-center gap-3">
                  <IconMan
                    class="text-mainColor"
                    size="40" />
                  <div>
                    <p
                      :class="[
                        { 'text-white': doneIMT < 18.5 },
                        { 'text-white': doneIMT > 18.5 && doneIMT < 24.9 },
                        { 'text-white': doneIMT > 24.9 && doneIMT < 29.9 },
                        { 'text-white': doneIMT > 29.9 && doneIMT < 34.9 },
                        { 'text-white': doneIMT > 34.9 },
                      ]"
                      class="text-[#9A9BA4] text-sm">
                      Тип тела
                    </p>
                    <div
                      v-if="doneIMT"
                      class="font-medium">
                      <p v-if="doneIMT < 18.5">Недостаточная масса тела</p>
                      <p v-else-if="doneIMT > 18.5 && doneIMT < 24.9">
                        Нормальная масса тела
                      </p>
                      <p v-else-if="doneIMT > 24.9 && doneIMT < 29.9">
                        Избыточная масса тела
                      </p>
                      <p v-else-if="doneIMT > 29.9 && doneIMT < 34.9">
                        Ожирение
                      </p>
                      <p v-else-if="doneIMT > 34.9">Резкое ожирение</p>
                    </div>
                    <p
                      v-else
                      class="text-red-500">Заполните вес и рост</p>
                  </div>
                </div>
                <div class="block md:flex justify-between gap-5">
                  <div class="mb-3 md:mb-0 w-full bg-[#fe2c3945] p-3 rounded-lg flex items-center gap-3">
                    <IconRuler3
                      class="text-mainColor"
                      size="40" />
                    <div>
                      <p class="text-[#9A9BA4] text-sm">Рост</p>
                      <input
                        v-if="editMode"
                        v-model="form.height"
                        :class="{ 'border-red-500': v$.height.$error }"
                        class="px-2 py-2 border rounded-lg w-full"
                        placeholder="Введите телефон"
                        type="text" />
                      <p
                        v-if="v$.height.$error && editMode"
                        class="text-red-500 text-xs">
                        Пожалуйста заполните данное поле
                      </p>
                      <div v-if="result.data.user_data">
                        <p
                          v-if="!editMode"
                          class="font-medium">
                          {{ result.data.user_data.height }} см
                        </p>
                      </div>
                      <div
                        v-else
                        class="text-red-500">
                        Необходимо заполнить
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 md:mb-0 w-full bg-[#fe2c3945] p-3 rounded-lg flex items-center gap-3">
                  <IconScaleOutline
                    class="text-mainColor"
                    size="40" />
                  <div>
                    <p class="text-[#9A9BA4] text-sm">Вес</p>
                    <input
                      v-if="editMode"
                      v-model="form.weight"
                      :class="{ 'border-red-500': v$.weight.$error }"
                      class="px-2 py-2 border rounded-lg w-full"
                      placeholder="Введите телефон"
                      type="text" />
                    <p
                      v-if="v$.weight.$error && editMode"
                      class="text-red-500 text-xs">
                      Пожалуйста заполните данное поле
                    </p>
                    <div v-if="result.data.user_data">
                      <p
                        v-if="!editMode"
                        class="font-medium">
                        {{ result.data.user_data.weight }} кг
                      </p>
                    </div>
                    <div
                      v-else
                      class="text-red-500">Необходимо заполнить</div>
                  </div>
                </div>
                <div class="w-full bg-[#fe2c3945] p-3 rounded-lg flex items-center gap-3">
                  <IconMathXDivideY
                    class="text-mainColor"
                    size="40" />
                  <div>
                    <p class="text-[#9A9BA4] text-sm">ИМТ</p>
                    <p
                      v-if="doneIMT"
                      class="font-medium">
                      {{ doneIMT }}
                    </p>
                    <p
                      v-else
                      class="text-red-500">Заполните вес и рост</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div
          v-if="route.fullPath !== '/profile'"
          class="bg-white px-5 py-6 rounded-lg"
          style="box-shadow: 0px 4px 20px 0px #0000001a">
          <slot />
        </div>
      </div>
      <div
        v-else
        class="bg-white px-5 py-6 rounded-lg">
        <Spinner />
      </div>
    </div>
  </div>
</template>
