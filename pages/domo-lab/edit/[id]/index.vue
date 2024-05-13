<script setup>
import {useAnalyzisesStore} from "~/store/analyzises.js";
import {useRoute} from "vue-router";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const analyzises = useAnalyzisesStore()
const {resultDetail} = storeToRefs(analyzises)

const loading = ref(false)

const route = useRoute()

const form = ref({
  price: null,
  name: null,
  is_active: null,
  description: "",
  palling: "",
  prepare: "",
  indications: "",
  interpretations: "",
  has_transcript: false,
  execution_period: null,
  quantity: null
})

const v$ = useVuelidate({
  price: {required},
  name: {required},
  is_active: {required},
  description: {required},
  palling: {required},
  prepare: {required},
  indications: {required},
  interpretations: {required},
  has_transcript: {required},
  execution_period: {required},
  quantity: {required}
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

  await analyzises.changeAnalyzis(route.params.id, form.value)
  if (analyzises.resultChange) {
    notify(true, 'Анализ успешно изменен')
    await analyzises.analyzisesList()
    loading.value = false;
  } else {
    notify(false, 'Ошибка при изменении анализа')
    loading.value = false;
  }
}

onMounted(async () => {
  await nextTick()
  await analyzises.analyziseDetail(route.params.id)
  form.value.name = resultDetail.value.name
  form.value.price = parseInt(resultDetail.value.price)
  form.value.is_active = resultDetail.value.is_active
  form.value.description = resultDetail.value.description
  form.value.palling = resultDetail.value.palling
  form.value.prepare = resultDetail.value.prepare
  form.value.indications = resultDetail.value.indications
  form.value.interpretations = resultDetail.value.interpretations
  form.value.has_transcript = resultDetail.value.has_transcript
  form.value.execution_period = resultDetail.value.execution_period
  form.value.quantity = resultDetail.value.quantity
})
</script>

<template>
  <div
      v-if="resultDetail"
      class="w-full">
    <h1 class="text-4xl font-semibold mb-5">
      {{ resultDetail.name }}
    </h1>
    <form
        @submit.prevent="sendForm"
        class="w-full lg:w-1/2 px-4 lg:px-0 relative z-20">
      <div class="flex flex-col items-start gap-5">
        <div class="w-full">
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
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
            <p class="text-sm mb-1 font-semibold">
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
            <p class="text-sm mb-1 font-semibold">
              Срок исполнения
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="number"
                :class="{'border-red-500': v$.execution_period.$error}"
                v-model="form.execution_period"
                placeholder="Введите текст"/>
            <p
                v-if="v$.execution_period.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
              Кол-во анализов
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="number"
                :class="{'border-red-500': v$.quantity.$error}"
                v-model="form.quantity"
                placeholder="Введите текст"/>
            <p
                v-if="v$.quantity.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
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
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
              Дополнительно
            </p>
            <input
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
                type="text"
                :class="{'border-red-500': v$.palling.$error}"
                v-model="form.palling"
                placeholder="Введите текст"/>
            <p
                v-if="v$.palling.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
        </div>
        <div class="w-full">

          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
              Описание
            </p>
            <quill-editor
                contentType="html"
                v-model:content="form.description"
                theme="snow"></quill-editor>
            <p
                v-if="v$.description.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
              Подготовка
            </p>
            <quill-editor
                contentType="html"
                v-model:content="form.prepare"
                theme="snow"></quill-editor>
            <p
                v-if="v$.prepare.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
              Показания
            </p>
            <quill-editor
                contentType="html"
                v-model:content="form.indications"
                theme="snow"></quill-editor>
            <p
                v-if="v$.indications.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1 font-semibold">
              Интерпретация
            </p>
            <quill-editor
                contentType="html"
                v-model:content="form.interpretations"
                theme="snow"></quill-editor>
            <p
                v-if="v$.interpretations.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
        </div>
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
</template>