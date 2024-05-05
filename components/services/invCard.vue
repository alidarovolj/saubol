<script setup>
import {useAddressesStore} from "~/store/addresses.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useNursesStore} from "~/store/nurses.js";
import {IconMinus, IconPlus} from "@tabler/icons-vue";

const addresses = useAddressesStore()

const user = useUserStore()

const nurse = useNursesStore()
const cart = useCartStore()

const props = defineProps({
  service: Object,
  required: true
})

const loading = ref(false)

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const form = ref({
  date: null,
  service_id: null,
  days: 1,
  price: null,
  address_id: null
})

const v$ = useVuelidate({
  date: {
    day: {required},
    start: {required},
    end: {required}
  },
  days: {required},
  service_id: {required},
  price: {required},
  address_id: {required}
}, form);

onMounted(async () => {
  form.value.price = props.service.price
  form.value.service_id = props.service.id
})

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, 'Заполните все поля')
    return;
  }

  await nurse.cartNurses(form.value)
  if (nurse.resultNurseCart) {
    await cart.cartList()
    notify(true, 'Услуга успешно добавлена в корзину')
    loading.value = false;
  } else {
    notify(false, 'Ошибка при добавлении услуги в корзину')
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div
        class="w-full bg-white rounded-lg p-5"
        style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
    >
      <div class="block mb-4">
        <p class="text-mainColor font-semibold text-base mb-2">
          {{ props.service.name }}
        </p>
        <p class="text-xs font-semibold mb-3">
          {{ props.service.category.name }}
        </p>
        <img
            v-if="props.service.img"
            class="rounded-md h-full w-1/2 mx-auto mb-3"
            :src="props.service.img"
            alt=""
        >
        <img
            v-else
            class="rounded-md h-full w-1/2 mx-auto mb-3"
            src="@/assets/img/services/male_doctor.png"
            alt=""
        >
        <div class="block w-full">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm mb-2">
              Цена
            </p>
            <p class="px-7 py-3 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor">
              <span>
                {{ form.price }}
              </span> ₸
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between mb-3">
          <p class="text-sm mb-2">
            Количество дней
          </p>
          <div class="flex gap-2">
            <div class="bg-mainColor text-white p-1 rounded-md cursor-pointer">
              <IconMinus @click="form.days = form.days - 1"/>
            </div>
            <input
                v-model="form.days"
                type="text"
                class="bg-[#ffe7e7] rounded-md w-14 text-center"
            >
            <div class="bg-mainColor text-white p-1 rounded-md cursor-pointer">
              <IconPlus @click="form.days = form.days + 1"/>
            </div>
          </div>
        </div>
      </div>
      <div class="block mb-4">
        <p class="mb-1 text-sm">
          Дата
        </p>
        <input type="date" class="px-3 py-3 border rounded-lg w-full">
      </div>
      <div
          v-if="addresses.resultAddresses"
          class="mb-4"
      >
        <p class="text-sm mb-3">
          Адресная книга <span class="text-red-500">*</span>
        </p>
        <div class="block lg:flex justify-between gap-5 text-sm">
          <div class="relative w-full lg:w-3/5 mb-2 lg:mb-0">
            <select
                v-model="form.address_id"
                :class="{'border-red-500': v$.address_id.$error}"
                class="px-3 py-3 border rounded-lg w-full">
              <option :value="null">
                Выберите адрес
              </option>
              <option
                  v-for="(it, ind) of addresses.resultAddresses.data"
                  :key="ind"
                  :value="it.address.id">
                {{ it.address.title }}
              </option>
            </select>
          </div>
          <button
              onclick="create_address.showModal()"
              class="border border-mainColor text-sm w-full lg:w-2/5 block rounded-lg text-mainColor py-2 lg:py-0">
            Добавить новый адрес
          </button>
        </div>
      </div>
      <div class="flex gap-3 border-t border-[#ffe7e7] pt-4 text-sm">
        <NuxtLink
            :to="'/services/inventory/' + props.service.id"
            class="block w-full py-3 rounded-lg text-mainColor bg-[#ffe7e7] text-center">
          Подробнее
        </NuxtLink>
        <p
            v-if="user.result && !loading"
            @click="sendForm"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer">
          Заказать услугу
        </p>
        <p
            v-else-if="user.result && loading"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer">
          <span class="spinner"></span>
        </p>
        <button
            v-else
            onclick="loginModal.showModal()"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer">
          Заказать услугу
        </button>
      </div>
    </div>
  </div>
  <LoginModal v-if="!user.result"/>
</template>