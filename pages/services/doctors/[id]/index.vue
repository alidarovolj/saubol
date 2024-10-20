<script setup>
import { IconFileFilled } from "@tabler/icons-vue";
import Spinner from "~/components/general/spinner.vue";
import { useUserStore } from "~/store/user.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useCartStore } from "~/store/cart.js";

const staff = useStaffStore();
const { resultDetail } = storeToRefs(staff);
const user = useUserStore();
const { result } = storeToRefs(user);
const addresses = useAddressesStore();
const cart = useCartStore();

const route = useRoute();

const loading = ref(false);

const pending = ref(true);
const pickedDay = ref("");

const pickedTime = ref([]);

const sertificates = ref([]);
const diplomas = ref([]);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const form = ref({
  user_id: null,
  time_id: null,
  staff_id: null,
  service_id: null,
  price: null,
  address_id: null,
});

const v$ = useVuelidate(
  {
    user_id: { required },
    time_id: { required },
    staff_id: { required },
    service_id: { required },
    price: { required },
    address_id: { required },
  },
  form
);

const changeService = (val) => {
  form.value.service_id = val.service_id;
  form.value.price = val.price;
};

const links = ref([
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Услуги",
    link: "/services",
  },
  {
    title: "Доктора",
    link: "/services/doctors",
  },
]);

const sliceNumber = ref(5);

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, "Заполните все поля");
    return;
  }

  await staff.setOrderDoctor(form.value);
  if (staff.resultOrderDoc) {
    await cart.cartList();
    notify(true, "Услуга успешно добавлена в корзину");
    loading.value = false;
  } else {
    notify(false, "Ошибка при добавлении услуги в корзину");
    loading.value = false;
  }
};

const setPickDay = (day) => {
  pickedDay.value = day;
  form.value.date.day = day.day;
  for (let i = 0; i < pickedDay.value.times.length; i++) {
    for (let j = 0; j < pickedDay.value.times[i].timePeriods.length; j++) {
      pickedTime.value.push(pickedDay.value.times[i].timePeriods[j]);
    }
  }
};

onMounted(async () => {
  await nextTick();
  await staff.getStaffDetail(route.params.id);
  await addresses.listAddresses();
  form.value.staff_id = resultDetail.value.id;
  if (user.result) {
    form.value.user_id = user.result.data.id;
  }
  links.value.push({
    title: resultDetail.value.user.name,
    link: "/services/doctors/" + resultDetail.value.id,
  });
  form.value.price = resultDetail.value.services[0].price;
  form.value.service_id = resultDetail.value.services[0].service_id;
  resultDetail.value.documents.forEach((item) => {
    if (item.type === "diploma") {
      diplomas.value.push(item);
    } else {
      sertificates.value.push(item);
    }
  });
  pending.value = false;
});

watch(
  () => user.result,
  () => {
    if (user.result) {
      form.value.user_id = user.result.data.id;
    }
  }
);
</script>

<template>
  <div class="relative pt-0 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" class="mb-5" />
      <!--      <ServicesNavigation/>-->
      <div
        v-if="!pending"
        class="block md:flex items-start justify-between gap-6"
      >
        <div class="w-full md:w-2/3 flex flex-col gap-5 mb-5 md:mb-0">
          <div
            style="box-shadow: 0px 3px 10px 0px #0000000d"
            class="bg-white p-5 rounded-lg flex gap-5 h-full items-center"
          >
            <img
              v-if="resultDetail.user.img"
              class="rounded-md h-full w-[130px]"
              :src="resultDetail.user.img"
              alt=""
            />
            <div v-else>
              <img
                v-if="resultDetail.is_female"
                class="rounded-md h-full w-[130px]"
                src="@/assets/img/services/female_doctor.png"
                alt=""
              />
              <img
                v-else
                class="rounded-md h-full w-[130px]"
                src="@/assets/img/services/male_doctor.png"
                alt=""
              />
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-sm md:text-xl font-semibold">
                {{ resultDetail.user.name }}
              </p>
              <p class="text-[#9A9BA4] text-sm md:text-lg">
                75 выполненных вызовов
              </p>
              <p class="text-sm md:text-2xl text-mainColor font-semibold">
                {{ resultDetail.specialization.name }}
              </p>
              <p
                class="w-max py-1 md:py-2 px-5 bg-mainColor rounded text-white"
              >
                Стаж {{ resultDetail.experience }} лет
              </p>
            </div>
          </div>
          <div
            v-if="!pending"
            class="bg-white p-5 rounded-lg h-full"
            style="box-shadow: 0px 3px 10px 0px #0000000d"
          >
            <div>
              <h2
                class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5"
              >
                Специализация
              </h2>
              <div class="mb-5">
                <ul class="list-disc pl-5 mb-2 text-sm">
                  <li
                    v-for="(
                      item, index
                    ) of resultDetail.specialization_details.slice(
                      0,
                      sliceNumber
                    )"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>
                <p
                  v-if="
                    resultDetail.specialization_details.length > sliceNumber
                  "
                  @click="sliceNumber += 5"
                  class="text-mainColor text-sm underline cursor-pointer"
                >
                  Показать еще
                </p>
              </div>
              <h2
                class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5"
              >
                Опыт работы
              </h2>
              <ul class="list-disc pl-5 text-sm mb-5">
                <li
                  v-for="(item, index) of resultDetail.job_places"
                  :key="index"
                >
                  <p>
                    {{ item.start_date }} / {{ item.end_date }} -
                    {{ item.job_place }}
                  </p>
                </li>
              </ul>
              <div v-if="resultDetail.additional_info" class="mb-5">
                <p class="bg-[#ffe7e7] p-3 rounded-md text-sm">
                  {{ resultDetail.additional_info }}
                </p>
              </div>
              <div v-if="sertificates.length > 0" class="mb-5">
                <h2
                  class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5"
                >
                  Сертификаты
                </h2>
                <div class="flex flex-col gap-3">
                  <div v-for="(item, index) of sertificates" :key="index">
                    <a
                      :href="item.path"
                      target="_blank"
                      :class="{ 'mb-3': sertificates.length - 1 !== index }"
                      class="flex items-center cursor-pointer justify-between bg-[#ffe7e7] p-2 rounded text-xs"
                    >
                      <div class="flex items-center gap-3">
                        <IconFileFilled class="w-7 h-7 text-mainColor" />
                        <p>
                          {{ item.filename }}
                        </p>
                      </div>
                      <p class="text-mainColor">
                        Нажмите чтобы ознакомится с файлом
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div v-if="diplomas.length > 0" class="">
                <h2
                  class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5"
                >
                  Дипломы
                </h2>
                <div class="flex flex-col gap-3">
                  <div v-for="(item, index) of diplomas" :key="index">
                    <a
                      :href="item.path"
                      target="_blank"
                      :class="{ 'mb-3': diplomas.length - 1 !== index }"
                      class="flex items-center cursor-pointer justify-between bg-[#ffe7e7] p-2 rounded text-xs"
                    >
                      <div class="flex items-center gap-3">
                        <IconFileFilled class="w-7 h-7 text-mainColor" />
                        <p>
                          {{ item.filename }}
                        </p>
                      </div>
                      <p class="text-mainColor">
                        Нажмите чтобы ознакомится с файлом
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 flex flex-col gap-5">
          <div
            style="box-shadow: 0px 3px 10px 0px #0000000d"
            class="bg-white rounded-lg p-5"
          >
            <p
              class="text-mainColor font-semibold pb-2 border-b border-mainColor text-2xl mb-4"
            >
              Запись
            </p>
            <div class="mb-4">
              <p class="text-xs md:text-sm mb-1">Цена</p>
              <p
                class="px-7 py-3 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor"
              >
                {{ form.price }} тг
              </p>
            </div>
            <div class="mb-4">
              <p class="text-sm mb-3">Вид услуги</p>
              <div class="flex gap-5">
                <label
                  @click="changeService(it)"
                  v-for="(it, ind) of resultDetail.services"
                  :key="ind"
                  :class="{ 'border-red-500': v$.service_id.$error }"
                  class="text-sm md:text-base w-max flex items-center gap-2 cursor-pointer"
                  for=""
                >
                  <input
                    v-model="form.service_id"
                    type="radio"
                    class="w-5 h-5"
                    name="service"
                    :value="it.service_id"
                  />
                  <p class="w-max">
                    {{ it.name }}
                  </p>
                </label>
              </div>
            </div>
            <div class="block mb-4">
              <div class="w-full mb-3">
                <p class="text-sm md:text-base mb-1">Дни приема:</p>
                <div class="flex gap-2">
                  <div
                    @click="setPickDay(it)"
                    v-for="(it, ind) of resultDetail.schedule"
                    :key="ind"
                    :class="[
                      { 'bg-mainColor text-white': pickedDay.id === it.id },
                    ]"
                    class="cursor-pointer py-1 px-3 border w-max rounded text-sm md:text-base text-center leading-none"
                  >
                    <p class="text-xs">
                      {{ it.weekday }}
                    </p>
                    <div>
                      <p class="text-xs">
                        {{ it.dayNumber }}
                      </p>
                      <p class="uppercase">
                        {{ it.dayOfWeek }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <p class="mb-1">Время</p>
                <select
                  :disabled="!pickedDay"
                  v-model="form.time_id"
                  :class="{
                    'border-red-500': v$.time_id.$error || v$.time_id.$error,
                  }"
                  class="px-3 py-3 border rounded-lg w-full"
                >
                  <option :value="null">Выберите время</option>
                  <option
                    v-for="(it, ind) of pickedDay.times"
                    :key="ind"
                    :value="it.id"
                  >
                    {{ it.start }} - {{ it.end }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="addresses.resultAddresses" class="mb-4">
              <p class="text-sm mb-3">
                Адресная книга <span class="text-red-500">*</span>
              </p>
              <div class="block md:flex justify-between gap-5">
                <div class="relative w-full md:w-3/5 mb-2 md:mb-0">
                  <select
                    v-model="form.address_id"
                    :class="{ 'border-red-500': v$.address_id.$error }"
                    class="px-3 py-3 border rounded-lg w-full"
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
                <button
                  onclick="create_address.showModal()"
                  class="border border-mainColor text-sm w-full md:w-2/5 block rounded-lg text-mainColor py-2 md:py-0"
                >
                  Добавить новый адрес
                </button>
              </div>
            </div>
          </div>
          <!--          <Schedule />-->
          <div class="flex gap-6 border-t border-[#ffe7e7] pt-4">
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
        </div>
      </div>
      <Spinner v-else />
    </div>
  </div>
  <LoginModal v-if="!user.result" />
  <CreateAddress />
</template>
