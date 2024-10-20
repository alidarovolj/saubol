<script setup>
import { IconMapPin, IconCopy, IconClipboardPlus } from "@tabler/icons-vue";
import { useUserStore } from "~/store/user.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useCartStore } from "~/store/cart.js";

const user = useUserStore();

const addresses = useAddressesStore();

const lab = useDomoLabStore();

const loading = ref(false);

const cart = useCartStore();

const pickedTest = ref(null);

const props = defineProps(["test"]);

const times = ref([]);
const dates = ref([]);
const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const pickedDay = ref(null);

for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 2; j++) {
    let hour = i < 10 ? "0" + i : i;
    let minute = j === 0 ? "00" : "30";
    times.value.push(hour + ":" + minute);
  }
}

for (let i = 0; i < 7; i++) {
  let date = new Date();
  date.setDate(date.getDate() + i);
  let formattedDate = date.toISOString().split("T")[0];
  let dayOfWeek = daysOfWeek[date.getDay()];
  let dayNumber = String(date.getDate()).padStart(2, "0");
  dates.value.push({
    date: formattedDate,
    day_of_week: dayOfWeek,
    day_number: dayNumber,
  });
}

const form = ref({
  address_id: null,
  analysis_ids: [],
  date: null,
  start_time: null,
  end_time: null,
});

const v$ = useVuelidate(
  {
    address_id: { required },
    analysis_ids: { required },
    date: { required },
    start_time: { required },
    end_time: { required },
  },
  form
);

const setTime = (index) => {
  times.value.forEach((it, ind) => {
    if (it === index.target.value) {
      form.value.start_time = times.value[ind];
      form.value.end_time =
        ind === times.value.length - 1 ? times.value[0] : times.value[ind + 1];
    }
  });
};

const setDay = (index) => {
  form.value.date = dates.value[index].date;
  pickedDay.value = index;
};

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, "Заполните все поля");
    return;
  }

  await lab.createLab(form.value);
  if (lab.resultCreate) {
    notify(true, "Услуга успешно добавлена в корзину");
    cartTest.close();
    loading.value = false;
  } else {
    notify(false, "Ошибка при добавлении услуги в корзину");
    loading.value = false;
  }
  await cart.cartList();
};

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

onMounted(async () => {
  await nextTick();
  pickedTest.value = props.test;
  await addresses.listAddresses();
});

watch(
  () => props.test,
  (newService) => {
    pickedTest.value = newService;
    form.value.analysis_ids.push(props.test.id);
  }
);
</script>

<template>
  <dialog id="cartTest" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-xl mb-5">Зказать услугу</h3>
      <div
        class="w-full bg-white flex items-center justify-center text-regText p-4 md:p-0"
      >
        <div v-if="pickedTest" class="w-full">
          <div class="block md:flex items-start justify-between w-full mb-6">
            <div>
              <p class="text-black font-bold mb-2">
                {{ pickedTest.name }}
              </p>
              <p class="text-sm mb-3">
                {{ pickedTest.category.name }}
              </p>
              <div class="flex gap-3">
                <div
                  class="flex items-center bg-[#EFD7B2] text-xs gap-1 p-1 rounded"
                >
                  <IconCopy size="14" />
                  <p>5 анализов</p>
                </div>
                <div
                  class="flex items-center bg-[#CAEFB2] text-xs gap-1 p-1 rounded"
                >
                  <IconClipboardPlus size="14" />
                  <p>Расшифровка</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-between text-sm">
              <p
                class="px-7 py-2 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor mb-2"
              >
                <span>
                  {{ pickedTest.price }}
                </span>
                ₸
              </p>
            </div>
          </div>
          <div v-if="addresses.resultAddresses" class="mb-3">
            <p class="text-sm mb-3">
              Адресная книга <span class="text-red-500">*</span>
            </p>
            <div class="block">
              <div class="relative w-full mb-2 md:mb-3">
                <IconMapPin
                  class="absolute left-3 top-1/2 -translate-y-1/2"
                  size="24"
                />
                <select
                  v-model="form.address_id"
                  :class="{ 'border-red-500': v$.address_id.$error }"
                  class="px-3 py-3 border rounded-lg w-full pl-10"
                >
                  <option :value="null">Выберите адрес</option>
                  <option
                    v-for="(it, ind) of addresses.resultAddresses.data"
                    :key="ind"
                    :value="it.address.id"
                  >
                    {{ it.address.title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="block mb-3">
            <div class="w-full mb-3">
              <p class="text-sm md:text-base mb-1">Дни приема:</p>
              <div class="flex justify-between">
                <div
                  v-for="(it, ind) of dates"
                  :key="ind"
                  @click="setDay(ind)"
                  :class="[
                    { 'bg-mainColor text-white': pickedDay === ind },
                    { 'border-red-500': v$.date.$error },
                  ]"
                  class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm md:text-base text-center"
                >
                  <p class="text-xs">{{ it.day_number }}</p>
                  <p>{{ it.day_of_week }}</p>
                </div>
              </div>
            </div>
            <div class="w-full">
              <p class="mb-1">Время</p>
              <select
                @change="setTime"
                class="px-3 py-3 border rounded-lg w-full"
                :class="{ 'border-red-500': v$.start_time.$error }"
                name=""
                id=""
              >
                <option :value="null">Выберите время</option>
                <option v-for="(it, ind) of times" :key="ind" :value="it">
                  {{ it }}
                </option>
              </select>
            </div>
          </div>
          <!--          <div class="flex flex-wrap justify-between">-->
          <!--            <label-->
          <!--                class="w-half flex items-center mb-4"-->
          <!--                for="">-->
          <!--              <input-->
          <!--                  type="radio"-->
          <!--                  name="lab"-->
          <!--                  class="w-6 h-6 mr-2">-->
          <!--              <p>-->
          <!--                Вариант 1-->
          <!--              </p>-->
          <!--            </label>-->
          <!--          </div>-->
          <p
            v-if="user.result && !loading"
            @click="sendForm"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer"
          >
            Заказать услугу
          </p>
          <p
            v-else-if="user.result && loading"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer"
          >
            <span class="spinner"></span>
          </p>
          <button
            v-else
            onclick="loginModal.showModal()"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer"
          >
            Заказать услугу
          </button>
        </div>
        <Spinner v-else />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
