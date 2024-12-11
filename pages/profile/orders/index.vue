<script setup>
import { useOrdersStore } from '~/store/orders.js';
import { IconArrowLeft } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const user = useUserStore();
const { result } = storeToRefs(user);

const orders = useOrdersStore();

const links = ref([
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Профиль',
    link: '/profile',
  },
  {
    title: 'Заказы',
    link: '/profile/orders',
  },
]);

const columns = ref([
  { name: 'Номер заявки', fname: 'order_number' },
  { name: 'Дата', fname: 'date.day' },
  { name: 'Начало', fname: 'date.start' },
  { name: 'Конец', fname: 'date.end' },
  { name: 'Цена', fname: 'price' },
  { name: 'Услуга', fname: 'name' },
  { name: 'Статус', fname: 'status' },
]);

const pending = ref(true);

onMounted(async () => {
  await nextTick();
  await orders.listOrders();
  pending.value = false;
});

useHead({
  title: 'Заказы | SaubolMed',
  meta: [
    {
      property: 'og:title',
      content: 'Заказы | SaubolMed',
    },
    {
      property: 'og:url',
      content: route.fullPath,
    },
  ],
  link: [{ rel: 'canonical', href: 'https://saubolmed.kz/' }],
});
</script>

<template>
  <div
    class="bg-white p-5 rounded-lg flex flex-col gap-1"
    style="box-shadow: 0px 4px 20px 0px #0000001a">
    <NuxtLoadingIndicator color="#3E46FF" />
    <DelayHydration>
      <div v-if="!pending">
        <div class="flex items-center mb-3 gap-2">
          <button
            class="block lg:hidden"
            @click="router.push('/profile')">
            <IconArrowLeft :size="24" />
          </button>
          <p class="text-2xl font-bold">Мои заказы</p>
        </div>
        <p
          v-if="orders.result.length === 0"
          class="text-red-500 text-center my-10">
          У вас нет заказов
        </p>
        <div v-else>
          <TableComponent
            :columns="columns"
            :numbered="true"
            :source="orders.result"
            @refreshTable="orders.listOrders()">
            <template #default="{ row, column }">
              <template v-if="column.name === 'Номер заявки'">
                <div>
                  <NuxtLink
                    :to="'/profile/orders/' + row.id"
                    class="text-primary50 cursor-pointer">
                    {{ row.id }}
                  </NuxtLink>
                </div>
              </template>
              <template v-if="column.fname === 'status'">
                <div class="flex items-center bg-yellow-200 w-max p-2 rounded-md">
                  <p class="flex gap-2 items-center text-sm w-max">
                    {{ row.status }}
                  </p>
                </div>
              </template>
            </template>
          </TableComponent>
        </div>
      </div>
      <Spinner v-else />
    </DelayHydration>
  </div>
</template>
