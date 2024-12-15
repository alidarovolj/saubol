<script setup>
import { IconEye, IconEyeClosed } from '@tabler/icons-vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useAuthStore } from '~/store/auth.js';
import { useCartStore } from '~/store/cart.js';

const passwordFieldType = ref('password');

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore();
const user = useUserStore();
const { result } = storeToRefs(user);
const cart = useCartStore();

const loading = ref(false);

const router = useRouter();

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const switchVisibility = () => {
  passwordFieldType.value =
      passwordFieldType.value === 'password' ? 'text' : 'password';
};

const form = ref({
  login: '',
  password: '',
});

const v$ = useVuelidate(
    {
      login: { required },
      password: { required },
    },
    form
);

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  const { data, error } = await useFetch('/auth/login', {
    method: 'POST',
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(form.value),
    lazy: true,
  });

  if (data.value) {
    await auth.initCookieToken(data.value.access_token);
    auth.token = data.value.access_token;
    await user.getProfile();
    await cart.cartList();
    router.push('/');
    loading.value = false;
    notify(true, 'Спасибо за авторизацию!');
  } else {
    notify(false, 'An error has occurred');
    loading.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <div class="flex justify-between">
      <div class="w-full md:w-2/5 bg-white py-20 md:py-64 relative">
        <form
          class="w-full md:w-3/5 mx-auto px-4 md:px-0 relative z-20"
          @submit.prevent="sendForm">
          <NuxtLink
            class="flex justify-center items-center gap-2 mr-5 md:mr-0 mb-10"
            to="/">
            <img
              alt=""
              class="w-auto h-7 md:h-12"
              src="@/assets/img/logo.png" />
            <p class="text-3xl font-bold text-black">Saubol</p>
          </NuxtLink>
          <div class="flex justify-between bg-[#F6F6F7] rounded-lg p-1 mb-6">
            <h1 class="w-1/2 text-center bg-mainColor rounded-lg text-white py-3 text-lg font-medium cursor-pointer">
              Вход
            </h1>
            <NuxtLink
              class="w-1/2 text-center bg-none rounded-lg text-black py-3 text-lg font-medium cursor-pointer"
              to="/auth/registration">
              Регистрация
            </NuxtLink>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">Email</p>
            <input
              v-model="form.login"
              :class="{ 'border-red-500': v$.login.$error }"
              class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
              placeholder="Введите email"
              type="text" />
            <p
              v-if="v$.login.$error"
              class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">Пароль:</p>
            <div class="relative">
              <input
                v-model="form.password"
                :class="{ 'border-red-500': v$.password.$error }"
                :type="passwordFieldType"
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                placeholder="Введите пароль" />
              <IconEyeClosed
                v-if="passwordFieldType === 'text'"
                class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                @click="switchVisibility" />
              <IconEye
                v-if="passwordFieldType === 'password'"
                class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                @click="switchVisibility" />
              <p
                v-if="v$.password.$error"
                class="text-red-500 text-xs">
                Пожалуйста заполните данное поле
              </p>
            </div>
          </div>
          <div class="flex justify-end mb-5">
            <NuxtLink
              class="text-mainColor text-sm text-end"
              to="/auth/login">
              Забыли пароль?
            </NuxtLink>
          </div>
          <button class="bg-mainColor py-3 text-white rounded-md w-full">
            Войти
          </button>
        </form>
      </div>
      <div class="hidden md:flex w-3/5 relative items-center">
        <img
          alt=""
          class="w-full h-full absolute left-0 top-0 object-cover"
          src="@/assets/img/auth/bg.jpg" />
        <div class="w-full h-full bg-mainColor opacity-20 z-10 absolute left-0 top-0"></div>
        <div class="relative z-20 pl-11 text-5xl text-white">
          <NuxtLink
            class="flex justify-start items-center gap-2 mr-5 md:mr-0 mb-10"
            to="/">
            <img
              alt=""
              class="w-auto h-7 md:h-14"
              src="@/assets/img/logo.png" />
            <p class="text-4xl font-bold text-white">Saubol</p>
          </NuxtLink>
          <p>Забота о вашем здоровье с Saubol: Надежно и Качественно!</p>
        </div>
      </div>
    </div>
  </div>
</template>
