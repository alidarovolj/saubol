<script setup>

import { IconEdit, IconMan, IconMathXDivideY, IconRuler3, IconScaleOutline, IconArrowLeft, IconPhotoUp, IconCheck, IconX } from '@tabler/icons-vue';
import Spinner from '~/components/general/spinner.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useUserStore } from '~/store/user.js';

const router = useRouter();

const notify = (type, text) => {
 const toast = useNuxtApp().$toast;
 type ? toast.success(text) : toast.error(text);
};

const user = useUserStore();
const { result } = storeToRefs(user);

const loading = ref(false);

const pending = ref(true);

const editMode = ref(false);

const isImageHovered = ref(false)
const isImageUploaded = ref(true)

const fileInput = ref(null);

const form = ref({
 name: '',
 height: '',
 weight: '',
});

const v$ = useVuelidate(
  {
   name: { required },
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

const uploadImage = async () => {

 isImageUploaded.value = false

 if (fileInput.value && fileInput.value.files[0]) {

  const file = fileInput.value.files[0];

  const { error } = await user.setImage(file);

  if(error.value ) notify(false, 'Ошибка загрузки фотографии')
  else {
   await user.getProfile()
   notify(true, 'Фотография загружена')
  }

  isImageUploaded.value = true
 }
}

const updateProfileLocal = async () => {
 loading.value = true;
 await v$.value.$validate();

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
  await router.push('/');
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
  <div>
    <div v-if="!pending">
      <form
        class="flex xl:flex-row flex-col justify-between w-full gap-5"
        @submit.prevent="updateProfileLocal">
        <div
          class="bg-white w-full xl:w-1/3 h-full p-5 rounded-lg"
          style="box-shadow: 0px 4px 20px 0px #0000001a">
          <div class="flex justify-between">
            <button
              type="button"
              class="block lg:hidden"
              @click="router.push('/profile')">
              <IconArrowLeft :size="24" />
            </button>
          </div>

          <div
            class="mb-3 bg-red-50 w-max mx-auto rounded-full relative"
            @mouseover="isImageHovered = true"
            @touchstart="isImageHovered = true"
            @touchemove="isImageHovered = false"
            @mouseleave="isImageHovered = false">
            <div
              v-show="isImageHovered"
              class="bg-white w-36 h-36 transition-all opacity-70 rounded-full absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <label
                for="user_image"
                class="cursor-pointer text-black">
                <IconPhotoUp size="36" />
              </label>
              <input
                id="user_image"
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="uploadImage" />
            </div>
            <img
              v-if="result.data.img"
              :src="result.data.img"
              alt=""
              class="w-36 h-36 rounded-full object-cover mx-auto" />
            <div
              v-if="!result.data.img"
              class="relative w-36 h-36 mx-auto bg-mainColor bg-opacity-20 rounded-lg min-w-20">
              <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-mainColor text-xl">
                {{ formattedName }}
              </p>
            </div>
          </div>

          <p
            v-if="!editMode"
            style="margin: 20px 0"
            class="text-xl font-bold text-center">
            {{ result.data.name }}
          </p>
          <div
            v-if="editMode"
            class="my-3">
            <input
              v-model.trim="form.name"
              :class="{'border-red-500': v$.name.$error }"
              class="text-xl font-bold text-center w-full border py-2"
              placeholder="Введите имя"
              type="text" />
            <p
              v-if="v$.name.$error && editMode"
              class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>


          <div class="block">
            <div class="flex items-center justify-between mb-3 md:mb-5">
              <p class="text-[#9A9BA4] mb-1">ИИН</p>
              <div>
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
          </div>
        </div>

        <div
          class="mt-5 rounded-lg lg:mt-0 w-full xl:w-2/3 flex flex-col justify-between gap-5 bg-white p-5"
          style="box-shadow: 0px 4px 20px 0px #0000001a">
          <div class="flex items-center justify-between text-mainColor w-full">
            <h1 class="text-black text-xl font-bold">Мои данные</h1>
            <div class="flex items-center gap-5">
              <!--                <button-->
              <!--                  v-if="!loading"-->
              <!--                  class="bg-mainColor text-center text-white px-5 py-2 rounded-lg"-->
              <!--                  type="submit">-->
              <!--                  Обновить-->
              <!--                </button>-->
              <!--               <p-->
              <!--                 v-else-->
              <!--                 class="w-6 h-6 bg-mainColor text-center text-white rounded-lg">-->
              <!--                <span class="spinner" />-->
              <!--               </p>-->
              <button
                v-if="editMode"
                type="submit">
                <IconCheck
                  class="cursor-pointer"
                  size="24" />
              </button>
              <IconEdit
                v-if="!editMode"
                class="cursor-pointer"
                size="24"
                @click="editMode = !editMode" />
              <IconX
                v-else
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
                      v-model.number="form.height"
                      :class="{ 'border-red-500': v$.height.$error }"
                      class="border w-full"
                      placeholder="Введите свой рост"
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
                    v-model.number="form.weight"
                    :class="{ 'border-red-500': v$.weight.$error }"
                    class="w-full"
                    placeholder="Введите свой вес"
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
    </div>
    <div
      v-else
      class="bg-white p-5 rounded-lg"
      style="box-shadow: 0px 4px 20px 0px #0000001a">
      <Spinner />
    </div>
  </div>
</template>