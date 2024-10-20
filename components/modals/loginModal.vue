<script setup>
import { useUserStore } from "~/store/user.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/store/auth.js";
import { IconEye, IconEyeClosed } from "@tabler/icons-vue";
import { vMaska } from "maska/vue";

const passwordFieldType = ref("password");

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore();
const user = useUserStore();
const { result } = storeToRefs(user);
const loading = ref(false);
const addresses = useAddressesStore();

const sentCode = ref(false);

const switchVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

const form = ref({
  login: "",
});

const formCode = ref({
  phone_number: "",
  code: "",
});

const v$ = useVuelidate(
  {
    login: { required },
  },
  form
);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  const { data, error } = await useFetch(
    `/auth/user/send-message?phone_number=${form.value.login}`,
    {
      method: "GET",
      baseURL: runtimeConfig.public.API_LINK,
      lazy: true,
    }
  );

  if (data.value) {
    loading.value = false;
    sentCode.value = true;
    notify(true, "Код на ваш номер успешно отправлен!");
  } else {
    notify(false, "An error has occurred");
    loading.value = false;
  }
};

const sendCode = async () => {
  loading.value = true;
  formCode.value.phone_number = form.value.login;

  const { data, error } = await useFetch(`/auth/login`, {
    method: "POST",
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(formCode.value),
    lazy: true,
  });

  if (data.value) {
    await auth.initCookieToken(data.value.access_token);
    auth.token = data.value.access_token;
    await user.getProfile();
    await addresses.listAddresses();
    loading.value = false;
    sentCode.value = true;
    loginModal.close();
    notify(true, "Вы успешно авторизовались!");
  } else {
    notify(false, "An error has occurred");
    loading.value = false;
  }
};
</script>

<template>
  <dialog id="loginModal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <form
        v-if="!sentCode"
        @submit.prevent="sendForm"
        class="w-full mx-auto px-0 relative z-20"
      >
        <NuxtLink
          to="/"
          class="flex justify-center items-center gap-2 mr-5 md:mr-0 mb-10"
        >
          <img class="w-auto h-7 md:h-12" src="@/assets/img/logo.png" alt="" />
          <p class="text-3xl font-bold text-black">Saubol</p>
        </NuxtLink>
        <div class="mb-5">
          <p class="text-sm mb-1">Телефон</p>
          <input
            class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
            type="text"
            :class="{ 'border-red-500': v$.login.$error }"
            v-model="form.login"
            v-maska
            data-maska="+7 (###) ###-##-##"
            placeholder="Введите телефон"
          />
          <p v-if="v$.login.$error" class="text-red-500 text-xs">
            Пожалуйста заполните данное поле
          </p>
        </div>
        <div class="flex justify-between mb-5">
          <NuxtLink to="/auth/registration" class="text-mainColor text-sm">
            Перейти к регистрации
          </NuxtLink>
          <NuxtLink class="text-mainColor text-sm text-end" to="/auth/login">
            Забыли пароль?
          </NuxtLink>
        </div>
        <button class="bg-mainColor py-3 text-white rounded-md w-full">
          Отправить код
        </button>
      </form>
      <form
        v-else
        @submit.prevent="sendCode"
        class="w-full mx-auto px-4 md:px-0 relative z-20"
      >
        <NuxtLink
          to="/"
          class="flex justify-center items-center gap-2 mr-5 md:mr-0 mb-10"
        >
          <img class="w-auto h-7 md:h-12" src="@/assets/img/logo.png" alt="" />
          <p class="text-3xl font-bold text-black">Saubol</p>
        </NuxtLink>
        <div class="mb-5">
          <p class="text-sm mb-1">Код</p>
          <input
            class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
            type="text"
            v-model="formCode.code"
            placeholder="Введите телефон"
          />
        </div>
        <div class="flex justify-between mb-5">
          <NuxtLink to="/auth/registration" class="text-mainColor text-sm">
            Перейти к регистрации
          </NuxtLink>
          <NuxtLink class="text-mainColor text-sm text-end" to="/auth/login">
            Забыли пароль?
          </NuxtLink>
        </div>
        <button class="bg-mainColor py-3 text-white rounded-md w-full">
          Авторизоваться
        </button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
