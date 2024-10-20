<script setup>
import { IconTrash } from "@tabler/icons-vue";

const route = useRoute();
const router = useRouter();

const cart = useCartStore();

const auth = useAuthStore();
auth.initCookieToken();
const { token } = storeToRefs(auth);

const loading = ref(false);

const links = [
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Корзина",
    link: "/cart",
  },
];

const form = ref({
  order_number: null,
  common_price: null,
  analyze_order: [],
  doctor_order: [],
  nurse_order: [],
  detox_order: [],
});

const formRemovedOrder = ref({
  type: "",
  order_id: null,
});

const removeOrderLocal = async (id, type) => {
  formRemovedOrder.value.type = type;
  formRemovedOrder.value.order_id = id;
  await cart.removeOrder(formRemovedOrder.value);
  await cart.cartList();
};

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

onMounted(async () => {
  if (!token.value) {
    router.push("/");
    notify(false, "Вы не авторизованы");
  }

  if (!cart.result) {
    await cart.cartList();
  }
  form.value.order_number = String(Math.floor(Math.random() * 100000000));
  form.value.common_price = cart.result.common_price;
  for (let i = 0; i < cart.result.analyze_order.length; i++) {
    form.value.analyze_order.push(cart.result.analyze_order[i].id);
  }
  for (let i = 0; i < cart.result.doctor_order.length; i++) {
    form.value.doctor_order.push(cart.result.doctor_order[i].id);
  }
  for (let i = 0; i < cart.result.nurse_order.length; i++) {
    form.value.nurse_order.push(cart.result.nurse_order[i].id);
  }
  for (let i = 0; i < cart.result.detox_order.length; i++) {
    form.value.detox_order.push(cart.result.detox_order[i].id);
  }
});

const sendForm = async () => {
  loading.value = true;

  await cart.makeOrder(form.value);
  if (cart.resultOrder) {
    await cart.cartList();
    notify(true, "Спасибо за заказ!");
    loading.value = false;
  } else {
    notify(false, "Ошибка при оформлении заказа! Попробуйте позже.");
    loading.value = false;
  }
};

const clearBasketLocal = async () => {
  await cart.clearBasket();
  await cart.cartList();
};

useHead({
  title: "Корзина | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Корзина | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{ rel: "canonical", href: "https://saubolmed.kz/" }],
});
</script>

<template>
  <div class="pt-0 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" class="mb-7" />
      <h1 class="text-lg md:text-2xl mb-7">Корзина</h1>
      <div class="block md:flex items-start justify-between gap-5">
        <div
          style="box-shadow: 0px 3px 10px 0px #0000000d"
          class="w-full md:w-3/4 bg-none md:bg-white p-0 md:p-5 rounded-lg mb-5 md:mb-0"
        >
          <div v-if="cart.result">
            <div v-if="cart.result.count > 0">
              <div
                v-if="cart.result.doctor_order.length > 0"
                class="mb-10 border-b border-[#ffe7e7] pb-5"
                :class="{ 'mb-10': cart.result.nurse_order.length > 0 }"
              >
                <h2 class="text-mainColor font-semibold text-xl mb-5">Врачи</h2>
                <div
                  v-for="(item, index) of cart.result.doctor_order"
                  :key="index"
                  :class="{
                    'mb-10': index !== cart.result.doctor_order.length - 1,
                  }"
                  class="bg-white md:bg-none px-3 md:px-0 py-5 md:py-0 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img
                        class="w-12 h-12"
                        src="@/assets/img/services/female_doctor.png"
                        alt=""
                      />
                      <p class="w-max text-mainColor font-semibold">
                        {{ item.staff.name }}
                      </p>
                    </div>
                    <div class="flex items-center gap-3">
                      <IconTrash
                        @click="removeOrderLocal(item.id, 'doctor_order')"
                        class="text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div class="block md:hidden">
                    <div
                      class="flex items-center justify-between mb-3 pb-1 border-b border-[#F6F6F7]"
                    >
                      <p class="w-max text-sm font-semibold">Цена:</p>
                      <p
                        class="text-sm bg-[#ffe7e7] text-mainColor px-8 py-2 rounded-md"
                      >
                        {{ item.price }} тнг.
                      </p>
                    </div>
                    <div class="border-b border-[#F6F6F7] mb-3">
                      <p class="text-xs font-semibold">Адрес</p>
                      <p>
                        {{ item.address.title }}
                      </p>
                    </div>
                    <div class="flex justify-between border-b border-[#F6F6F7]">
                      <div class="w-half">
                        <p class="text-xs font-semibold">Время</p>
                        <p>{{ item.date.start }} - {{ item.date.end }}</p>
                      </div>
                      <div class="w-half">
                        <p class="text-xs font-semibold">Дата</p>
                        <p>
                          {{ item.date.day }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between mb-1 font-semibold"
                  >
                    <div class="w-1/4">
                      <p class="text-xs">Адрес:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Время:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Дата:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Цена :</p>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between bg-[#ffe7e7] p-3 rounded-lg"
                  >
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.address.title }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">
                        {{ item.date.start }} - {{ item.date.end }}
                      </p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.date.day }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.price }} тнг.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="cart.result.nurse_order.length > 0"
                class="mb-10 border-b border-[#ffe7e7] pb-5"
                :class="{ 'mb-10': cart.result.detox_order.length > 0 }"
              >
                <h2 class="text-mainColor font-semibold text-xl mb-5">
                  Мед-услуги
                </h2>
                <div
                  v-for="(item, index) of cart.result.nurse_order"
                  :key="index"
                  :class="{
                    'mb-10': index !== cart.result.nurse_order.length - 1,
                  }"
                  class="bg-white md:bg-none px-3 md:px-0 py-5 md:py-0 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img
                        class="w-12 h-12"
                        src="@/assets/img/services/female_doctor.png"
                        alt=""
                      />
                      <p class="w-max text-mainColor font-semibold">
                        {{ item.service.name }}
                      </p>
                    </div>
                    <div class="flex items-center gap-3">
                      <IconTrash class="text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <div class="block md:hidden">
                    <div
                      class="flex items-center justify-between mb-3 pb-1 border-b border-[#F6F6F7]"
                    >
                      <p class="w-max text-sm font-semibold">Цена:</p>
                      <p
                        class="text-sm bg-[#ffe7e7] text-mainColor px-8 py-2 rounded-md"
                      >
                        {{ item.price }} тнг.
                      </p>
                    </div>
                    <div class="border-b border-[#F6F6F7] mb-3">
                      <p class="text-xs font-semibold">Адрес</p>
                      <p>
                        {{ item.address.title }}
                      </p>
                    </div>
                    <div class="flex justify-between border-b border-[#F6F6F7]">
                      <div class="w-half">
                        <p class="text-xs font-semibold">Время</p>
                        <p>{{ item.date.start }} - {{ item.date.end }}</p>
                      </div>
                      <div class="w-half">
                        <p class="text-xs font-semibold">Дата</p>
                        <p>
                          {{ item.date.day }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between mb-1 font-semibold"
                  >
                    <div class="w-1/4">
                      <p class="text-xs">Адрес:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Время:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Дата:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Цена :</p>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between bg-[#ffe7e7] p-3 rounded-lg"
                  >
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.address.title }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">
                        {{ item.date.start }} - {{ item.date.end }}
                      </p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.date.day }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.price }} тнг.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="cart.result.detox_order.length > 0"
                class="mb-0 border-b border-[#ffe7e7] pb-5"
                :class="{ 'mb-10': cart.result.analyze_order.length > 0 }"
              >
                <h2 class="text-mainColor font-semibold text-xl mb-5">
                  Услуги детокс
                </h2>
                <div
                  v-for="(item, index) of cart.result.detox_order"
                  :key="index"
                  :class="{
                    'mb-10': index !== cart.result.detox_order.length - 1,
                  }"
                  class="bg-white md:bg-none px-3 md:px-0 py-5 md:py-0 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img
                        class="w-12 h-12"
                        src="@/assets/img/services/female_doctor.png"
                        alt=""
                      />
                      <p class="w-max text-mainColor font-semibold">
                        {{ item.service.name }}
                      </p>
                    </div>
                    <div class="flex items-center gap-3">
                      <IconTrash class="text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <div class="block md:hidden">
                    <div
                      class="flex items-center justify-between mb-3 pb-1 border-b border-[#F6F6F7]"
                    >
                      <p class="w-max text-sm font-semibold">Цена:</p>
                      <p
                        class="text-sm bg-[#ffe7e7] text-mainColor px-8 py-2 rounded-md"
                      >
                        {{ item.price }} тнг.
                      </p>
                    </div>
                    <div class="border-b border-[#F6F6F7] mb-3">
                      <p class="text-xs font-semibold">Адрес</p>
                      <p>
                        {{ item.address.title }}
                      </p>
                    </div>
                    <div class="flex justify-between border-b border-[#F6F6F7]">
                      <div class="w-half">
                        <p class="text-xs font-semibold">Время</p>
                        <p>{{ item.date.start }} - {{ item.date.end }}</p>
                      </div>
                      <div class="w-half">
                        <p class="text-xs font-semibold">Дата</p>
                        <p>
                          {{ item.date.day }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between mb-1 font-semibold"
                  >
                    <div class="w-1/4">
                      <p class="text-xs">Адрес:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Время:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Дата:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Цена :</p>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between bg-[#ffe7e7] p-3 rounded-lg"
                  >
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.address.title }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">
                        {{ item.date.start }} - {{ item.date.end }}
                      </p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.date.day }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.price }} тнг.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="cart.result.analyze_order.length > 0" class="pb-5">
                <h2 class="text-mainColor font-semibold text-xl mb-5">
                  Анализы
                </h2>
                <div
                  v-for="(item, index) of cart.result.analyze_order"
                  :key="index"
                  :class="{
                    'mb-10': index !== cart.result.analyze_order.length - 1,
                  }"
                  class="bg-white md:bg-none px-3 md:px-0 py-5 md:py-0 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img
                        class="w-12 h-12"
                        src="@/assets/img/services/female_doctor.png"
                        alt=""
                      />
                      <div>
                        <p class="w-max text-mainColor font-semibold">
                          {{ item.name }}
                        </p>
                        <div class="flex gap-2">
                          <p class="font-semibold">Анализы:</p>
                          <div>
                            <p
                              v-for="(it, ind) of item.analysis"
                              class="w-max text-black"
                            >
                              {{ it }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <IconTrash class="text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <div class="block md:hidden">
                    <div
                      class="flex items-center justify-between mb-3 pb-1 border-b border-[#F6F6F7]"
                    >
                      <p class="w-max text-sm font-semibold">Цена:</p>
                      <p
                        class="text-sm bg-[#ffe7e7] text-mainColor px-8 py-2 rounded-md"
                      >
                        {{ item.price }} тнг.
                      </p>
                    </div>
                    <div class="border-b border-[#F6F6F7] mb-3">
                      <p class="text-xs font-semibold">Адрес</p>
                      <p>
                        {{ item.address.title }}
                      </p>
                    </div>
                    <div class="flex justify-between border-b border-[#F6F6F7]">
                      <div class="w-half">
                        <p class="text-xs font-semibold">Время</p>
                        <p>{{ item.date.start }} - {{ item.date.end }}</p>
                      </div>
                      <div class="w-half">
                        <p class="text-xs font-semibold">Дата</p>
                        <p>
                          {{ item.date.day }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between mb-1 font-semibold"
                  >
                    <div class="w-1/4">
                      <p class="text-xs">Адрес:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Время:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Дата:</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-xs">Цена :</p>
                    </div>
                  </div>
                  <div
                    class="hidden md:flex justify-between bg-[#ffe7e7] p-3 rounded-lg"
                  >
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.address.title }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">
                        {{ item.date.start }} - {{ item.date.end }}
                      </p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.date.day }}</p>
                    </div>
                    <div class="w-1/4">
                      <p class="text-sm">{{ item.price }} тнг.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-center text-red-500 font-semibold">
                Ваша корзина пуста
              </p>
            </div>
          </div>
          <div v-else>
            <Spinner />
          </div>
        </div>
        <div
          style="box-shadow: 0px 3px 10px 0px #0000000d"
          class="w-full md:w-1/4 p-5 bg-white rounded-lg h-max"
        >
          <div v-if="cart.result">
            <div
              class="flex items-center justify-between mb-5 pb-5 border-b border-[#F6F6F7] w-full"
            >
              <p class="w-max text-sm">Общее количество услуг:</p>
              <p
                class="text-sm bg-[#ffe7e7] text-mainColor px-8 py-2 rounded-md"
              >
                {{ cart.result.count }} шт.
              </p>
            </div>
            <div class="flex items-center justify-between mb-5">
              <p class="w-max text-sm font-semibold">Общая цена :</p>
              <p class="text-sm bg-mainColor text-white px-8 py-2 rounded-md">
                {{ cart.result.common_price }} тнг.
              </p>
            </div>
            <p
              v-if="cart.result.count > 0"
              @click="clearBasketLocal"
              class="bg-red-500 cursor-pointer text-white py-2 rounded-lg text-center mb-3"
            >
              Очистить корзину
            </p>
            <p
              v-if="cart.result.count > 0"
              @click="sendForm"
              class="bg-mainColor cursor-pointer text-white py-2 rounded-lg text-center"
            >
              Оплатить
            </p>
          </div>
          <div v-else>
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
