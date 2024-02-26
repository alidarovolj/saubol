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

  const {data, error} = await useFetch("/auth/staff-login", {
    method: "POST",
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(form.value),
    lazy: true
  });

  if (data.value) {
    await auth.initCookieToken(data.value.access_token)
    auth.token = data.value.access_token
    await user.getProfile()
    await cart.cartList()
    router.push('/')
    loading.value = false;
    notify(true, 'Спасибо за авторизацию!')
  } else {
    notify(false, 'An error has occurred')
    loading.value = false;
  }
}
</script>

<template>
  <div class="relative h-full w-full">
    <div class="flex justify-between h-full items-center">
      <div class="w-full bg-[#F6F6F7] relative h-full flex items-center justify-center">
        <form
            @submit.prevent="sendForm"
            class="w-full lg:w-3/5 mx-auto px-4 lg:px-0 relative z-20">
          <img
              class="mx-auto mb-5"
              src="@/assets/img/main-color-logo.svg"
              alt=""
          >
          <div class="mb-5">
            <p class="text-sm mb-1">
              Номер телефона или Email:
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
      <div class="hidden lg:flex w-full relative items-center">
        <img class="w-full h-full absolute left-0 top-0 object-cover" src="../assets/img/auth/bg.jpg" alt="">
        <img class="w-full h-full absolute left-0 top-0" src="../assets/img/auth/bg-fill.png" alt="">
        <div class="relative z-20 pl-11 text-5xl text-white">
          <img
              class="mb-5"
              src="../assets/img/footer-logo.png"
              alt="">
          <p>
            Забота о вашем здоровье с Saubol: Надежно и Качественно!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>