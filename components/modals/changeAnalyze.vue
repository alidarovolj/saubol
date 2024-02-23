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
const analyzises = useAnalyzisesStore()
const {resultChange} = storeToRefs(analyzises)

const props = defineProps(['pickedItem'])

const form = ref({
  price: null,
  name: null,
  is_active: null
})

const v$ = useVuelidate({
  price: {required},
  name: {required},
  is_active: {required}
}, form);

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

  await analyzises.changeAnalyzis(props.pickedItem.id, form.value)
  if(resultChange) {
    changeAnalyze.close()
    notify(true, 'Анализ успешно изменен')
    await analyzises.analyzisesList()
    loading.value = false;
  } else {
    notify(false, 'Ошибка при изменении анализа')
    loading.value = false;
  }
}

watch(props, async (newValue) => {
  console.log(newValue)
  if (newValue) {
    form.value.name = newValue.pickedItem.name
    form.value.price = newValue.pickedItem.price
    form.value.is_active = newValue.pickedItem.is_active
  }
})
</script>

<template>
  <dialog id="changeAnalyze" class="modal">
    <div class="modal-box">
      <p class="text-2xl font-semibold mb-5">
        Редактирование анализа
      </p>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form
          @submit.prevent="sendForm"
          class="w-full mx-auto px-4 lg:px-0 relative z-20">
        <div class="mb-5">
          <p class="text-sm mb-1">
            Название
          </p>
          <input
              class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
              type="text"
              :class="{'border-red-500': v$.name.$error}"
              v-model="form.name"
              placeholder="Введите текст"/>
          <p
              v-if="v$.name.$error"
              class="text-red-500 text-xs">
            Пожалуйста заполните данное поле
          </p>
        </div>
        <div class="mb-5">
          <p class="text-sm mb-1">
            Цены
          </p>
          <input
              class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
              type="number"
              :class="{'border-red-500': v$.price.$error}"
              v-model="form.price"
              placeholder="Введите текст"/>
          <p
              v-if="v$.price.$error"
              class="text-red-500 text-xs">
            Пожалуйста заполните данное поле
          </p>
        </div>
        <div class="mb-5">
          <p class="text-sm mb-1">
            Активность
          </p>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <input
                  class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                  type="radio"
                  :value="true"
                  :class="{'border-red-500': v$.is_active.$error}"
                  v-model="form.is_active"
                  placeholder="Введите текст"/>
              <p>Да</p>
            </div>
            <div class="flex gap-2">
              <input
                  class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                  type="radio"
                  :value="false"
                  :class="{'border-red-500': v$.is_active.$error}"
                  v-model="form.is_active"
                  placeholder="Введите текст"/>
              <p>Нет</p>
            </div>
          </div>
          <p
              v-if="v$.is_active.$error"
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