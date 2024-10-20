<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const nurses = useNursesStore();
const { resultDetail } = storeToRefs(nurses);

const addresses = useAddressesStore();
const user = useUserStore();

const cart = useCartStore();

const route = useRoute();

const loading = ref(false);

const pending = ref(true);

const pickedDay = ref(null);

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
    title: "Мед-услуги",
    link: "/services/med-services",
  },
]);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const form = ref({
  date: {
    day: "",
    start: "",
    end: "",
  },
  staff_id: null,
  service_id: null,
  price: null,
  address_id: null,
});

const v$ = useVuelidate(
  {
    date: {
      day: { required },
      start: { required },
      end: { required },
    },
    staff_id: { required },
    service_id: { required },
    price: { required },
    address_id: { required },
  },
  form
);

const setTime = (index) => {
  form.value.date.start = resultDetail.value.times[index];
  form.value.date.end = resultDetail.value.times[index + 1];
};

const setDay = (index) => {
  form.value.date.day = resultDetail.value.dates[index].date;
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

  await nurses.cartNurses(form.value);
  if (nurses.resultNurseCart) {
    await cart.cartList();
    notify(true, "Услуга успешно добавлена в корзину");
    loading.value = false;
  } else {
    notify(false, "Ошибка при добавлении услуги в корзину");
    loading.value = false;
  }
};

onMounted(async () => {
  await nextTick();
  await nurses.getNurse(route.params.id);
  await addresses.listAddresses();
  form.value.price = resultDetail.value.data.price;
  form.value.service_id = resultDetail.value.data.id;
  form.value.staff_id = resultDetail.value.data.id;
  links.value.push({
    title: resultDetail.value.data.name,
    link: "/services/med-services/" + resultDetail.value.data.id,
  });
  pending.value = false;
});

watch(form.value, (val) => {
  if (val.service_id == resultDetail.value.data.id) {
    form.value.price = resultDetail.value.data.price;
  } else {
    form.value.price = resultDetail.value.data.premium_service.price;
  }
});
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
        <div
          style="box-shadow: 0px 3px 10px 0px #0000000d"
          class="rounded-lg w-full md:w-2/3 flex flex-col gap-5 mb-5 md:mb-0"
        >
          <div class="bg-white p-5 rounded-lg flex gap-5 h-full items-center">
            <img
              v-if="resultDetail.img"
              class="rounded-md h-full w-[130px]"
              :src="resultDetail.img"
              alt=""
            />
            <div v-else>
              <img
                class="rounded-md h-full w-[130px]"
                src="@/assets/img/services/service.png"
                alt=""
              />
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-sm md:text-xl font-semibold">
                {{ resultDetail.data.name }}
              </p>
              <p class="text-sm md:text-2xl text-mainColor font-semibold">
                {{ resultDetail.data.category.name }}
              </p>
              <p
                class="px-7 py-3 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor"
              >
                {{ form.price }} ₸
              </p>
            </div>
          </div>
          <div class="bg-white p-5 rounded-lg h-full">
            <div>
              <h2
                class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5"
              >
                Общая информация
              </h2>
              <p class="mb-5">{{ resultDetail.data.description }}</p>
              <div
                v-if="resultDetail.data.specialization_details.length > 0"
                class="bg-[#ffe7e7] p-3 pl-8 rounded-md text-sm"
              >
                <ul class="list-disc">
                  <li
                    v-for="(item, index) of resultDetail.data
                      .specialization_details"
                    :key="index"
                    class=""
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          style="box-shadow: 0px 3px 10px 0px #0000000d"
          class="w-full md:w-1/3 rounded-lg"
        >
          <div class="bg-white rounded-lg p-5">
            <p
              class="text-mainColor font-semibold pb-2 border-b border-mainColor text-2xl mb-4"
            >
              Запись
            </p>
            <div class="w-full bg-white rounded-lg">
              <div class="flex items-center mb-4 gap-5">
                <img
                  v-if="resultDetail.data.img"
                  class="rounded-md h-full w-[130px]"
                  :src="resultDetail.data.img"
                  alt=""
                />
                <img
                  v-else
                  class="rounded-md h-full w-[130px]"
                  src="@/assets/img/services/male_doctor.png"
                  alt=""
                />
                <div class="block md:flex items-center justify-between w-full">
                  <div>
                    <p class="text-sm md:text-xl font-semibold mb-3">
                      {{ resultDetail.data.category.name }}
                    </p>
                    <p class="text-mainColor font-semibold mb-2">
                      {{ resultDetail.data.name }}
                    </p>
                    <div class="block">
                      <p class="text-sm mb-4">Вид услуги:</p>
                      <div class="flex items-center gap-5">
                        <div class="flex items-center text-sm gap-3">
                          <input
                            name="service"
                            v-model="form.service_id"
                            :value="resultDetail.data.id"
                            type="radio"
                          />
                          <p
                            :class="[{ 'text-red-500': v$.service_id.$error }]"
                          >
                            Стандарт
                          </p>
                        </div>
                        <div class="flex items-center text-sm gap-3">
                          <input
                            name="service"
                            v-model="form.service_id"
                            :value="resultDetail.data.premium_service.id"
                            type="radio"
                          />
                          <p
                            :class="[{ 'text-red-500': v$.service_id.$error }]"
                          >
                            Премиум
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <p class="text-sm mb-2">Цена</p>
                <p
                  class="px-7 py-3 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor"
                >
                  <span>
                    {{ form.price }}
                  </span>
                  ₸
                </p>
              </div>
              <div class="block mb-4">
                <div class="w-full mb-3">
                  <p class="text-sm md:text-base mb-1">Дни приема:</p>
                  <div class="flex justify-between">
                    <!--            :class="{ 'bg-gray-200 cursor-not-allowed' : props.doctor.free_time[0].length === 0 }"-->
                    <div
                      v-for="(it, ind) of resultDetail.dates"
                      :key="ind"
                      @click="setDay(ind)"
                      :class="[
                        { 'bg-mainColor text-white': pickedDay === ind },
                        { 'border-red-500': v$.date.day.$error },
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
                    class="px-3 py-3 border rounded-lg w-full"
                    :class="{ 'border-red-500': v$.date.start.$error }"
                    name=""
                    id=""
                  >
                    <option :value="null">Выберите время</option>
                    <option
                      v-for="(it, ind) of resultDetail.times"
                      :key="ind"
                      @click="setTime(ind)"
                      value=""
                    >
                      {{ it }}
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
        </div>
      </div>
      <Spinner v-else />
    </div>
  </div>
  <LoginModal v-if="!user.result" />
</template>
