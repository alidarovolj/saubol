<script setup>
import {IconEye, IconEyeClosed} from "@tabler/icons-vue"
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";
import {useCartStore} from "~/store/cart.js";

const passwordFieldType = ref("password");

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore()
const user = useUserStore()
const {result} = storeToRefs(user)
const cart = useCartStore()

const loading = ref(false);

const router = useRouter()

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const switchVisibility = () => {
  passwordFieldType.value =
      passwordFieldType.value === "password" ? "text" : "password";
}

const form = ref({
  login: "",
  password: ""
})

const v$ = useVuelidate({
  login: {required},
  password: {required}
}, form);

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  const {data, error} = await useFetch("/auth/admin-login", {
    method: "POST",
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(form.value),
    lazy: true
  });

  if (data.value) {
    await auth.initCookieAdminToken(data.value.access_token)
    auth.adminToken = data.value.access_token
    await user.getProfile()
    router.push('/admin')
    loading.value = false;
    notify(true, 'Спасибо за авторизацию!')
  } else {
    notify(false, 'An error has occurred')
    loading.value = false;
  }
}
</script>

<template>
  <div class="relative h-screen">
    <div class="flex justify-between h-full">
      <div class="w-full lg:w-2/5 bg-white py-20 lg:py-64 relative h-full flex items-center">
        <img class="w-full h-full absolute left-0 top-0 opacity-10" src="@/assets/img/auth/bg-lines.png" alt="">
        <form
            @submit.prevent="sendForm"
            class="w-full lg:w-3/5 mx-auto px-4 lg:px-0 relative z-20">
            <NuxtLink
            to="/"
            class="flex justify-center items-center gap-2 mr-5 lg:mr-0 mb-10"
        >
          <img
              class="w-auto h-7 lg:h-12"
              src="@/assets/img/logo.png"
              alt=""
          >
          <p class="text-3xl font-bold text-black">
            Saubol
          </p>
        </NuxtLink>
          <div class="mb-5">
            <p class="text-sm mb-1">
              Email
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="text"
                :class="{'border-red-500': v$.login.$error}"
                v-model="form.login"
                placeholder="Введите email"/>
            <p
                v-if="v$.login.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">
              Пароль:
            </p>
            <div class="relative">
              <input
                  class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                  :type="passwordFieldType"
                  v-model="form.password"
                  :class="{'border-red-500': v$.password.$error}"
                  placeholder="Введите пароль"/>
              <IconEyeClosed
                  v-if="passwordFieldType === 'text'"
                  @click="switchVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <IconEye
                  v-if="passwordFieldType === 'password'"
                  @click="switchVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <p
                  v-if="v$.password.$error"
                  class="text-red-500 text-xs">
                Пожалуйста заполните данное поле
              </p>
            </div>
          </div>
          <button class="bg-mainColor py-3 text-white rounded-md w-full">
            Войти
          </button>
        </form>
      </div>
      <div class="hidden lg:flex w-3/5 relative items-center">
        <img class="w-full h-full absolute left-0 top-0 object-cover" src="@/assets/img/auth/bg.jpg" alt="">
        <div class="w-full h-full bg-mainColor opacity-20 z-10 absolute left-0 top-0"></div>
        <div class="relative z-20 pl-11 text-5xl text-white">
          <NuxtLink
              to="/"
              class="flex justify-start items-center gap-2 mr-5 lg:mr-0 mb-10"
          >
            <img
                class="w-auto h-7 lg:h-14"
                src="@/assets/img/logo.png"
                alt=""
            >
            <p class="text-4xl font-bold text-white">
              Saubol
            </p>
          </NuxtLink>
          <p>
            Забота о вашем здоровье с Saubol: Надежно и Качественно!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>