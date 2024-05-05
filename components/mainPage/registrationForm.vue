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
      await user.getProfile()
      await cart.cartList()
      router.push('/')
      notify(true, 'Спасибо за регистрацию!')
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
  <div class="pt-10 lg:pt-40 pb-10 lg:pb-64">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="relative">
        <div class="block lg:flex grad-block py-12 px-7 rounded-2xl gap-10">
          <div class="w-full lg:w-2/3">
            <div class="flex items-center gap-3 mb-6">
              <img class="w-16 h-auto" src="@/assets/img/whiteLogo.png" alt="">
              <p class="text-3xl font-bold text-white">
                Saubol
              </p>
            </div>
            <p class="text-xl lg:text-3xl text-white mb-5 lg:mb-0">
              Превратите заботу о здоровье в простой шаг - зарегистрируйтесь , чтобы заказать услугу и начать свой путь к здоровому образу жизни!
            </p>
          </div>
          <div class="relative w-full lg:w-1/3">
            <form
                @submit.prevent="sendForm"
                style="box-shadow: 0px 0px 15px 0px #00000040;"
                class="w-full bg-white text-xs lg:text-sm rounded-2xl mx-auto px-5 py-4 z-20 relative lg:absolute left-0 top-1/2 translate-y-0 lg:-translate-y-1/2">
              <p class="text-center text-2xl font-semibold mb-5">
                Форма регистрации
              </p>
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
              <ul class="list-disc pl-5 mb-5 text-sm">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.grad-block {
  background: linear-gradient(113.29deg,
  #FE5861 15.67%,
  #FE645B 25.11%,
  #FE6E54 34.55%,
  #FE764F 43.99%,
  #FF7C49 53.44%,
  #FF8044 62.88%,
  #FF8440 72.32%,
  #FF873C 81.76%,
  #FF8A38 91.2%,
  #FF8B35 100.64%,
  #FF8D33 110.08%,
  #FF8E31 119.52%,
  #FF8E30 128.96%,
  #FF8F30 138.4%,
  #FF8F2F 147.84%,
  #FF8F2F 157.28%,
  #FF8F2F 166.72%
  );
}
</style>