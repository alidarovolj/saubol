<script setup>
import {useAddressesStore} from "~/store/addresses.js";
import {useModalsStore} from "~/store/modals.js";

const addresses = useAddressesStore();
const {resultCreate} = storeToRefs(addresses);
const modals = useModalsStore()

const form = ref({
  title: null,
  location: [],
});

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const onEmit = (val) => {
  form.value.location = [val?.latitude, val?.longitude]
}

const sendForm = async () => {
  await nextTick();
  await addresses.createAddress(form.value);
  if (resultCreate !== false) {
    modals.modal.show = false
    notify(true, "Адрес успешно добавлен");
  } else {
    notify(false, "Произошла ошибка");
  }
  await addresses.listAddresses();
};
</script>

<template>
  <form @submit.prevent="sendForm">
    <h3 class="font-bold text-xl mb-5">Добавление адреса</h3>
    <div class="mb-3">
      <label for="title" class="block text-sm font-medium text-gray-700">
        Название
      </label>
      <input
          v-model="form.title"
          type="text"
          name="title"
          id="title"
          placeholder="Название адреса"
          class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
      />
    </div>
    <client-only>
      <YandexMap @send_data="onEmit" />
    </client-only>
    <div class="flex justify-end mt-5">
      <button
          :class="{
            'bg-gray-300 cursor-not-allowed':
              form.location === null || form.title === null,
          }"
          :disabled="form.location === null || form.title === null"
          class="bg-mainColor text-center text-white py-3 px-16 rounded-md"
          type="submit"
      >
        Добавить
      </button>
    </div>
  </form>
</template>

<style>
.yandex-container {
  height: 400px;
}
</style>
