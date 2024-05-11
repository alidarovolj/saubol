<script setup>
import {IconClipboardPlus, IconCopy, IconCalendarCheck, IconPlus} from "@tabler/icons-vue"
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useDomoLabStore} from "~/store/domoLab.js";

const user = useUserStore()
const cart = useCartStore()

const test = useDomoLabStore()

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const addresses = useAddressesStore()

const pickedDay = ref(null)

const props = defineProps({
  service: Object,
  required: true
})

const pickedTest = ref(null)

const form = ref({
  date: null,
  start_time: null,
  end_time: null,
  address_id: null,
  analysis_ids: [],
})

const v$ = useVuelidate({
  date: {required},
  start_time: {required},
  end_time: {required},
  address_id: {required},
}, form.value);

const setTime = (index) => {
  form.value.start_time = props.service.times[index]
  form.value.end_time = props.service.times[index + 1]
}

const setDay = (index) => {
  form.value.date = props.service.dates[index].date
  pickedDay.value = index
}

const sendForm = async () => {
  form.value.analysis_ids = [props.service.id]
  loading.value = true;

  await test.cartTest(form.value)
  if (test.resultTestCart) {
    await cart.cartList()
    notify(true, 'Услуга успешно добавлена в корзину')
    loading.value = false;
  } else {
    notify(false, 'Ошибка при добавлении услуги в корзину')
    loading.value = false;
  }
}

const loading = ref(false)

// const setTest = async () => {
//   await nextTick()
//   let pickTest = props.service
//   pickedTest.value = pickTest
//   await cartTest.showModal()
// }
</script>

<template>
  <div>
    <div
        class="w-full bg-white rounded-lg p-5"
        style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
    >
      <div class="flex items-center gap-5">
        <div class="block w-full">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="mb-2 text-sm text-[#9da2a5]">
                №{{ props.service.vendor_code }}
              </p>
              <p class="text-black font-bold mb-2">
                {{ props.service.name }}
              </p>
              <p class="text-sm mb-3">
                {{ props.service.category.name }}
              </p>
              <div class="mb-3 text-mainColor flex items-center gap-2">
                <IconCalendarCheck size="20"/>
                <p class="text-sm">
                  до {{ props.service.execution_period }} рабочих дней
                </p>
              </div>
              <div class="flex gap-3">
                <div
                    v-if="props.service.quantity"
                    class="flex items-center bg-[#EFD7B2] text-xs gap-1 p-1 rounded">
                  <IconCopy size="14"/>
                  <p>
                    {{ props.service.quantity }} анализов
                  </p>
                </div>
                <div
                    v-if="props.service.has_transcript"
                    class="flex items-center bg-[#CAEFB2] text-xs gap-1 p-1 rounded">
                  <IconClipboardPlus size="14"/>
                  <p>
                    Расшифровка
                  </p>
                </div>
                <div
                    v-if="props.service.palling"
                    class="flex items-center bg-[#ff9393] text-xs gap-1 p-1 rounded">
                  <IconPlus size="14"/>
                  <p>
                    {{ props.service.palling }}
                  </p>
                </div>
              </div>
            </div>
            <p class="px-7 py-2 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor mb-2">
              <span>
                {{ props.service.price }}
              </span> ₸
            </p>
          </div>
          <div class="text-sm">
            <div class="block lg:flex justify-between gap-4 mb-4">
              <div class="w-full lg:w-3/5 mb-3 lg:mb-0">
                <p class="text-sm mb-1">
                  Дни приема:
                </p>
                <div class="flex gap-2 w-full lg:w-1/2">
                  <!--            :class="{ 'bg-gray-200 cursor-not-allowed' : props.doctor.free_time[0].length === 0 }"-->
                  <div
                      v-for="(it, ind) of props.service.dates"
                      :key="ind"
                      @click="setDay(ind)"
                      :class="[{'bg-mainColor text-white': pickedDay === ind}, {'border-red-500': v$.date.$error}]"
                      class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm text-center">
                    <p class="text-xs">{{ it.day_number }}</p>
                    <p>{{ it.day_of_week }}</p>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-2/5">
                <p class="mb-1">
                  Время
                </p>
                <select
                    class="px-3 py-3 border rounded-lg w-full"
                    :class="{'border-red-500': v$.start_time.$error}"
                    name=""
                    id="">
                  <option :value="null">
                    Выберите время
                  </option>
                  <option
                      v-for="(it, ind) of props.service.times"
                      :key="ind"
                      @click="setTime(ind)"
                      value="">
                    {{ it }}
                  </option>
                </select>
              </div>
            </div>
            <div
                v-if="addresses.resultAddresses"
                class="mb-4"
            >
              <p class="text-sm mb-3">
                Адресная книга <span class="text-red-500">*</span>
              </p>
              <div class="block lg:flex justify-between gap-5">
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
          </div>
          <div class="flex flex-col lg:flex-row justify-between text-sm gap-2">
            <div class="w-full lg:w-1/2">
              <p
                  v-if="user.result && !loading"
                  @click="sendForm"
                  class="w-full py-2 rounded-lg text-white bg-mainColor text-center cursor-pointer">
                В корзину
              </p>
              <p
                  v-else-if="user.result && loading"
                  class="w-full py-2 rounded-lg text-white bg-mainColor text-center cursor-pointer">
                <span class="spinner"></span>
              </p>
              <button
                  v-else
                  onclick="loginModal.showModal()"
                  class="w-full py-2 rounded-lg text-white bg-mainColor text-center cursor-pointer">
                В корзину
              </button>
            </div>
            <NuxtLink
                :to="`/services/tests/${props.service.id}`"
                class="w-full lg:w-1/2 py-2 rounded-lg text-mainColor bg-[#ffe7e7] text-center cursor-pointer">
              Подробнее
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoginModal v-if="!user.result"/>
  <CartTest :test="pickedTest"/>
</template>