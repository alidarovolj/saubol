<script setup>
import { IconSearch } from '@tabler/icons-vue';
import { useAddressesStore } from '~/store/addresses.js';
import { useInventoryStore } from '~/store/inventory.js';

const route = useRoute();
const router = useRouter();
const inventory = useInventoryStore();
const { result, resultCategories } = storeToRefs(inventory);
const addresses = useAddressesStore();

const links = ref([
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Услуги',
    link: '/services',
  },
  {
    title: 'Аренда',
    link: '/services/inventory',
  },
]);

const pending = ref(true);

const category_name = ref()
const searchKeyword = ref()

watch(
  () => route.query,
  () => inventory.listInventory(),
)

onMounted(async () => {
  await nextTick();

  category_name.value = route.query['fields[category.name]'] || ''
  searchKeyword.value = route.query['fields[name]'] || ''

  await inventory.listInventoryCategories();
  await inventory.listInventory();

  pending.value = false;
});

onBeforeRouteUpdate((to, from, next) => {

  category_name.value = to.query['fields[category.name]'] || ''
  searchKeyword.value = to.query['fields[name]'] || ''

  if (!Object.keys(to.query).length) {
    return next({
      query: {
        perPage: 10,
        page: 1,
      }
    })
  }
  next()
})

useHead({
  title: 'Аренда инвентаря | Услуги | SaubolMed',
  meta: [
    {
      property: 'og:title',
      content: 'Аренда инвентаря | Услуги | SaubolMed',
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
  <div class="pt-4 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs
        :links="links"
        class="mb-5" />
      <!--      <ServicesNavigation/>-->
      <div
        class="bg-white p-5 rounded-lg my-8"
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px">
        <h1 class="mb-5 text-mainColor text-2xl md:text-4xl font-semibold">
          Аренда инвентаря
        </h1>
        <form
          class="block md:flex items-end gap-4"
          @submit.prevent="() => {navigateTo({
            query: {
              ...$route.query,
              perPage:10,
              page:1,
              'fields[name]': searchKeyword || undefined
            }})}">
          <div class="w-full mb-3 md:mb-0">
            <p class="text-sm">Поиск инвентаря</p>
            <div class="relative w-full">
              <IconSearch class="absolute top-3 left-3 text-mainColor" />
              <input
                v-model="searchKeyword"
                class="pl-10 px-3 py-3 border rounded-lg w-full"
                placeholder="Введите название анализов"
                type="text" />
            </div>
          </div>
          <button
            type="submit"
            class="w-full md:w-max rounded text-white bg-mainColor py-3 px-20">
            Найти
          </button>
        </form>
      </div>
      <div
        v-if="!pending"
        class="block md:flex items-start gap-4">
        <div
          class="w-full md:w-1/4 bg-white py-5 px-3 rounded-lg mb-5 md:mb-0"
          style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px">
          <h2 class="text-lg md:text-3xl mb-5 text-mainColor">Категории</h2>
          <button
            :class="{'bg-[#fe2c3945]': !category_name }"
            class="block w-full py-2 px-3 text-sm md:text-base rounded-lg cursor-pointer text-start"
            @click="() => {navigateTo({
              query: {
                ...$route.query,
                perPage:10,
                page:1,
                'fields[category.name]': undefined
              }}); category_name = ''}">
            Все
          </button>
          <button
            v-for="(category, index) in resultCategories"
            :key="index"
            :class="{ 'bg-[#fe2c3945]': category.name === category_name }"
            class="block w-full py-2 px-3 text-sm md:text-base rounded-lg cursor-pointer text-start"
            @click="() => { navigateTo({
              query:{
                ...$route.query,
                perPage:10,
                page:1,
                'fields[category.name]': category.name
              }
            }); category_name = category.name}">
            {{ category.name }}
          </button>
        </div>
        <div class="w-full md:w-3/4">
          <div
            v-if="result.data.length > 0"
            class="w-full flex justify-between flex-wrap">
            <div
              v-for="(service, index) in result.data"
              :key="index"
              class="w-full md:w-half mb-5">
              <InvCard :service="service" />
            </div>
          </div>
          <div
            v-else
            class="my-5">
            <p class="text-red-500 text-xl text-center">Ничего не найдено</p>
          </div>
          <div class="w-full">
            <Pagination :pagination="inventory.result.meta" />
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex justify-between flex-wrap">
        <div
          v-for="(_, index) in 6"
          :key="index"
          class="skeleton w-full md:w-half h-[400px] mb-5"></div>
      </div>
    </div>
  </div>
</template>
