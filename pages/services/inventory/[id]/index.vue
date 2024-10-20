<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useInventoryStore } from "~/store/inventory.js";
import { IconMinus, IconPlus } from "@tabler/icons-vue";

const inventory = useInventoryStore();
const { resultDetail } = storeToRefs(inventory);

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
    title: "Инвентарь",
    link: "/services/inventory",
  },
]);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const form = ref({
  date: null,
  good_id: null,
  days_quantity: 1,
  price: null,
  address_id: null,
});

const v$ = useVuelidate(
  {
    date: { required },
    days_quantity: { required },
    good_id: { required },
    price: { required },
    address_id: { required },
  },
  form
);

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, "Заполните все поля");
    return;
  }

  await inventory.cartInventory(form.value);
  if (inventory.resultInventoryCart) {
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
  await inventory.getInventoryById(route.params.id);
  await addresses.listAddresses();
  form.value.price = resultDetail.value.price;
  form.value.good_id = resultDetail.value.id;
  links.value.push({
    title: resultDetail.value.name,
    link: "/services/med-services/" + resultDetail.value.id,
  });
  pending.value = false;
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
                {{ resultDetail.name }}
              </p>
              <p class="text-sm md:text-2xl text-mainColor font-semibold">
                {{ resultDetail.category.name }}
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
              <p>
                {{ resultDetail.description }}
              </p>
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
              Аренда
            </p>
            <div class="w-full bg-white rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <p class="text-sm mb-2">Количество дней</p>
                <div class="flex gap-2">
                  <div
                    v-if="form.days_quantity > 1"
                    class="bg-mainColor text-white p-1 rounded-md cursor-pointer"
                  >
                    <IconMinus
                      @click="form.days_quantity = form.days_quantity - 1"
                    />
                  </div>
                  <input
                    v-model="form.days_quantity"
                    type="text"
                    class="bg-[#ffe7e7] rounded-md w-14 text-center"
                  />
                  <div
                    class="bg-mainColor text-white p-1 rounded-md cursor-pointer"
                  >
                    <IconPlus
                      @click="form.days_quantity = form.days_quantity + 1"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3 flex justify-between items-center">
                <p class="text-sm">Цена</p>
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
                <p class="mb-1 text-sm">Дата</p>
                <input
                  v-model="form.date"
                  :class="[{ '!border-red-500': v$.date.$error }]"
                  type="date"
                  class="px-3 py-3 border rounded-lg w-full"
                />
              </div>
              <div v-if="addresses.resultAddresses" class="mb-4">
                <p class="text-sm mb-3">
                  Адресная книга <span class="text-red-500">*</span>
                </p>
                <div class="block md:flex justify-between gap-5 text-sm">
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
