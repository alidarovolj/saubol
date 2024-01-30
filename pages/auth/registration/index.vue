<script setup>
import {IconEye, IconEyeClosed} from "@tabler/icons-vue"
import {useVuelidate} from "@vuelidate/core";
import {required, email} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";

const passwordFieldType = ref("password");
const passwordFieldConfirmType = ref("password");

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore()
const user = useUserStore()
const {result} = storeToRefs(user)

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
const switchVisibilityConfirm = () => {
  passwordFieldConfirmType.value =
      passwordFieldConfirmType.value === "password" ? "text" : "password";
}

const form = ref({
  name: "",
  phone_number: "",
  email: "",
  role_id: 1,
  password: "",
  password_confirmation: "",
  address: null
})

const v$ = useVuelidate({
  name: {required},
  phone_number: {required},
  email: {required, email},
  password: {required},
  password_confirmation: {required}
}, form);

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  if(form.value.password === form.value.password_confirmation) {

    const {data, error} = await useFetch("/auth/register", {
      method: "POST",
      baseURL: runtimeConfig.public.API_LINK,
      body: JSON.stringify(form.value),
      lazy: true
    });

    if (data.value) {
      await auth.initCookieToken(data.value.access_token)
      auth.token = data.value.access_token
      notify(true, 'Спасибо за регистрацию!')
      await user.getProfile()
      router.push('/')
      loading.value = false;
    } else {
      notify(false, error.value.message)
      loading.value = false;
    }
  } else {
    notify(false, 'Пароли не совпадают')
    loading.value = false;
  }
}
</script>

<template>
  <div class="relative">
    <div class="flex justify-between">
      <div class="w-full lg:w-2/5 bg-white py-20 lg:py-64 relative">
        <img class="w-full h-full absolute left-0 top-0 opacity-10" src="@/assets/img/auth/bg-lines.png" alt="">
        <form
            @submit.prevent="sendForm"
            class="w-full lg:w-3/5 mx-auto px-4 lg:px-0 relative z-20">
          <img
              class="mx-auto mb-5"
              src="@/assets/img/main-color-logo.svg"
              alt=""
          >
          <div class="flex justify-between bg-[#F6F6F7] rounded-lg p-1 mb-6">
            <NuxtLink
                to="/auth/login"
                class="w-1/2 text-center bg-none rounded-lg text-black py-3 text-lg font-medium cursor-pointer">
              Вход
            </NuxtLink>
            <h1 class="w-1/2 text-center bg-mainColor rounded-lg !text-white py-3 text-lg font-medium cursor-pointer">
              Регистрация
            </h1>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">
              ФИО:
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="text"
                :class="{'border-red-500': v$.name.$error}"
                v-model="form.name"
                placeholder="Введите ФИО"/>
            <p
                v-if="v$.name.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">
              Номер телефона:
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="number"
                v-model="form.phone_number"
                :class="{'border-red-500': v$.phone_number.$error}"
                placeholder="Введите номер телефона"/>
            <p
                v-if="v$.phone_number.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">
              Email:
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="text"
                v-model="form.email"
                :class="{'border-red-500': v$.email.$error}"
                placeholder="Введите email"/>
            <p
                v-if="v$.email.$error"
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
          <ul class="list-disc pl-5 mb-5">
            <li :class="{ 'text-green-400' : form.password.length >= 8 }">Длина пароля должна быть не менее 8 символов</li>
            <li :class="{ 'text-green-400' : /[A-Z]/.test(form.password) }">Латинские заглавные буквы</li>
            <li :class="{ 'text-green-400' : /[a-z]/.test(form.password) }">Латинские строчные буквы</li>
            <li :class="{ 'text-green-400' : /[0-9]/.test(form.password) }">Цифры 0-9</li>
          </ul>
          <div class="mb-5">
            <p class="text-sm mb-1">
              Подтверждение пароля:
            </p>
            <div class="relative">
              <input
                  class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                  :type="passwordFieldConfirmType"
                  :class="{'border-red-500': v$.password_confirmation.$error}"
                  v-model="form.password_confirmation"
                  placeholder="Введите подтверждение пароля"/>
              <IconEyeClosed
                  v-if="passwordFieldConfirmType === 'text'"
                  @click="switchVisibilityConfirm"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <IconEye
                  v-if="passwordFieldConfirmType === 'password'"
                  @click="switchVisibilityConfirm"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <p
                  v-if="v$.password_confirmation.$error"
                  class="text-red-500 text-xs">
                Пожалуйста заполните данное поле
              </p>
            </div>
          </div>
          <button class="bg-mainColor py-3 text-white rounded-md w-full">
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div class="hidden lg:flex w-3/5 relative items-center">
        <img class="w-full h-full absolute left-0 top-0 object-cover" src="@/assets/img/auth/bg.jpg" alt="">
        <img class="w-full h-full absolute left-0 top-0" src="@/assets/img/auth/bg-fill.png" alt="">
        <div class="relative z-20 pl-11 text-5xl text-white">
          <img
              class="mb-5"
              src="@/assets/img/footer-logo.png"
              alt="">
          <p>
            Забота о вашем здоровье с Saubol: Надежно и Качественно!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>