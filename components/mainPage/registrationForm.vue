<script setup>
import {IconEye, IconEyeClosed} from "@tabler/icons-vue";
import {useVuelidate} from "@vuelidate/core";
import {email, required} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";

const passwordFieldType = ref("password");
const passwordFieldConfirmType = ref("password");

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore();
const user = useUserStore();
const {result} = storeToRefs(user);
const cart = useCartStore();

const loading = ref(false);

const router = useRouter();

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const switchVisibility = () => {
  passwordFieldType.value =
      passwordFieldType.value === "password" ? "text" : "password";
};
const switchVisibilityConfirm = () => {
  passwordFieldConfirmType.value =
      passwordFieldConfirmType.value === "password" ? "text" : "password";
};

const form = ref({
  name: "",
  phone_number: "",
  email: "",
  role_id: 1,
  password: "",
  password_confirmation: "",
  address: null,
});

const v$ = useVuelidate(
    {
      name: {required},
      phone_number: {required},
      email: {required, email},
      password: {required},
      password_confirmation: {required},
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

  if (form.value.password === form.value.password_confirmation) {
    const {data, error} = await useFetch("/auth/register", {
      method: "POST",
      baseURL: runtimeConfig.public.API_LINK,
      body: JSON.stringify(form.value),
      lazy: true,
    });

    if (data.value) {
      await auth.initCookieToken(data.value.access_token);
      auth.token = data.value.access_token;
      await user.getProfile();
      await cart.cartList();
      router.push("/");
      notify(true, "Спасибо за регистрацию!");
      loading.value = false;
    } else {
      notify(false, error.value.message);
      loading.value = false;
    }
  } else {
    notify(false, "Пароли не совпадают");
    loading.value = false;
  }
};
</script>

<template>
  <div class="pt-6 md:pt-40 pb-6 md:pb-64">
    <div class="container mx-auto px-4 md:px-0">
      <div class="relative">
        <div
            class="block md:flex grad-block py-6 md:py-12 px-3 md:px-7 rounded-2xl gap-10"
        >
          <div class="w-full md:w-2/3">
            <div
                class="flex justify-center md:justify-start items-center gap-3 mb-6"
            >
              <img
                  alt=""
                  class="w-16 h-auto"
                  src="@/assets/img/whiteLogo.png"
              />
              <p class="text-3xl font-bold text-white">Saubol</p>
            </div>
            <p class="text-sm md:text-3xl text-white mb-5 md:mb-0">
              Превратите заботу о здоровье в простой шаг - зарегистрируйтесь ,
              чтобы заказать услугу и начать свой путь к здоровому образу жизни!
            </p>
          </div>
          <div class="relative w-full md:w-1/3">
            <form
                class="w-full bg-white text-xs md:text-sm rounded-2xl mx-auto px-5 py-4 z-20 relative md:absolute left-0 top-1/2 translate-y-0 md:-translate-y-1/2"
                style="box-shadow: 0px 0px 15px 0px #00000040"
                @submit.prevent="sendForm"
            >
              <p class="text-center text-2xl font-semibold mb-5">
                Форма регистрации
              </p>
              <div class="mb-5">
                <p class="text-sm mb-1">ФИО:</p>
                <input
                    v-model="form.name"
                    :class="{ 'border-red-500': v$.name.$error }"
                    class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                    placeholder="Введите ФИО"
                    type="text"
                />
                <p v-if="v$.name.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="mb-5">
                <p class="text-sm mb-1">Номер телефона:</p>
                <input
                    v-model="form.phone_number"
                    :class="{ 'border-red-500': v$.phone_number.$error }"
                    class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                    placeholder="Введите номер телефона"
                    type="number"
                />
                <p v-if="v$.phone_number.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="mb-5">
                <p class="text-sm mb-1">Email:</p>
                <input
                    v-model="form.email"
                    :class="{ 'border-red-500': v$.email.$error }"
                    class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                    placeholder="Введите email"
                    type="text"
                />
                <p v-if="v$.email.$error" class="text-red-500 text-xs">
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
                      placeholder="Введите пароль"
                  />
                  <IconEyeClosed
                      v-if="passwordFieldType === 'text'"
                      class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      @click="switchVisibility"
                  />
                  <IconEye
                      v-if="passwordFieldType === 'password'"
                      class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      @click="switchVisibility"
                  />
                  <p v-if="v$.password.$error" class="text-red-500 text-xs">
                    Пожалуйста заполните данное поле
                  </p>
                </div>
              </div>
              <ul class="list-disc pl-5 mb-5 text-sm">
                <li :class="{ 'text-green-400': form.password.length >= 8 }">
                  Длина пароля должна быть не менее 8 символов
                </li>
                <li :class="{ 'text-green-400': /[A-Z]/.test(form.password) }">
                  Латинские заглавные буквы
                </li>
                <li :class="{ 'text-green-400': /[a-z]/.test(form.password) }">
                  Латинские строчные буквы
                </li>
                <li :class="{ 'text-green-400': /[0-9]/.test(form.password) }">
                  Цифры 0-9
                </li>
              </ul>
              <div class="mb-5">
                <p class="text-sm mb-1">Подтверждение пароля:</p>
                <div class="relative">
                  <input
                      v-model="form.password_confirmation"
                      :class="{
                      'border-red-500': v$.password_confirmation.$error,
                    }"
                      :type="passwordFieldConfirmType"
                      class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                      placeholder="Введите подтверждение пароля"
                  />
                  <IconEyeClosed
                      v-if="passwordFieldConfirmType === 'text'"
                      class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      @click="switchVisibilityConfirm"
                  />
                  <IconEye
                      v-if="passwordFieldConfirmType === 'password'"
                      class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      @click="switchVisibilityConfirm"
                  />
                  <p
                      v-if="v$.password_confirmation.$error"
                      class="text-red-500 text-xs"
                  >
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
  background: linear-gradient(
      113.29deg,
      #fe5861 15.67%,
      #fe645b 25.11%,
      #fe6e54 34.55%,
      #fe764f 43.99%,
      #ff7c49 53.44%,
      #ff8044 62.88%,
      #ff8440 72.32%,
      #ff873c 81.76%,
      #ff8a38 91.2%,
      #ff8b35 100.64%,
      #ff8d33 110.08%,
      #ff8e31 119.52%,
      #ff8e30 128.96%,
      #ff8f30 138.4%,
      #ff8f2f 147.84%,
      #ff8f2f 157.28%,
      #ff8f2f 166.72%
  );
}
</style>
