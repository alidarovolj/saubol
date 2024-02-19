<script setup>
import {useUserStore} from "~/store/user.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";
import {IconEye, IconEyeClosed} from "@tabler/icons-vue";
import axios from 'axios';

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore()
const user = useUserStore()
const {result} = storeToRefs(user)
const loading = ref(false);
const banners = useBannersStore()

const form = ref({
  text: "",
  img: ""
})

const v$ = useVuelidate({
  text: {required},
  img: {required}
}, form);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const onFileChange = (e) => {
  form.value.img = e.target.files[0];
}

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  const formData = new FormData();
  formData.append('text', form.value.text);
  formData.append('img', form.value.img);

  try {
    const response = await axios({
      method: 'post',
      url: `${runtimeConfig.public.API_LINK}/admin/banners`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data) {
      loading.value = false;
      await banners.adminBanners()
      createBanner.close()
      notify(true, 'Баннер успешно создан')
    } else {
      notify(false, 'An error has occurred')
      loading.value = false;
    }
  } catch (error) {
    console.error('Error:', error);
    loading.value = false;
  }
}
</script>

<template>
  <dialog id="createBanner" class="modal">
    <div class="modal-box">
      <p class="text-2xl font-semibold mb-5">
        Создание баннера
      </p>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form
          @submit.prevent="sendForm"
          class="w-full mx-auto px-4 lg:px-0 relative z-20">
        <div class="mb-5">
          <p class="text-sm mb-1">
            Текст
          </p>
          <input
              class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
              type="text"
              :class="{'border-red-500': v$.text.$error}"
              v-model="form.text"
              placeholder="Введите текст"/>
          <p
              v-if="v$.text.$error"
              class="text-red-500 text-xs">
            Пожалуйста заполните данное поле
          </p>
        </div>
        <div class="mb-5">
          <p class="text-sm mb-1">
            Картинка
          </p>
          <input
              class="file-input file-input-bordered w-full"
              :class="{'border-red-500': v$.img.$error}"
              type="file"
              @change="onFileChange">
          <p
              v-if="v$.img.$error"
              class="text-red-500 text-xs">
            Пожалуйста заполните данное поле
          </p>
        </div>
        <button
            v-if="!loading"
            type="submit"
            class="bg-mainColor py-3 text-white rounded-md w-full">
          Войти
        </button>
        <p
            v-else
            class="bg-mainColor py-3 text-white rounded-md w-full">
          <span class="spinner"></span>
        </p>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>