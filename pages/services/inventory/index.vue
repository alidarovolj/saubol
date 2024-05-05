<script setup>
import {
  IconSearch
} from "@tabler/icons-vue"
import {useAddressesStore} from "~/store/addresses.js";
import {useInventoryStore} from "~/store/inventory.js";

const route = useRoute()
const router = useRouter()
const inventory = useInventoryStore()
const {result, resultCategories} = storeToRefs(inventory)
const addresses = useAddressesStore()

const pending = ref(true)

const filters = ref({
  'fields[category.name]': null,
})

const links = ref([
  {
    title: 'Главная',
    link: '/'
  },
  {
    title: 'Услуги',
    link: '/services'
  },
  {
    title: 'Аренда',
    link: '/inventory'
  }
])

const searchInventory = async (val) => {
  if (val) {
    filters.value['fields[category.name]'] = val
  } else {
    filters.value['fields[category.name]'] = null
  }

  const nonNullFilters = Object.entries(filters.value).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const queryParams = {
    ...nonNullFilters,
    perPage: route.query.perPage || 10,
    page: route.query.page || 1
  };

  await router.push({query: {...route.query, ...queryParams}})
  await inventory.listInventory(queryParams)
}

onMounted(async () => {
  await nextTick()

  const nonNullQueries = Object.entries(route.query).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});

  filters.value = {
    ...filters.value,
    ...nonNullQueries
  };

  await addresses.listAddresses()
  await inventory.listInventoryCategories()
  await searchInventory()
  pending.value = false
})

useHead({
  title: "Аренда инвентаря | Услуги | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Аренда инвентаря | Услуги | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{rel: "canonical", href: "https://saubolmed.kz/"}],
});
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links" class="mb-5"/>
<!--      <ServicesNavigation/>-->
      <div class="bg-white p-5 rounded-lg my-8" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px;">
        <h1 class="mb-5 text-mainColor text-2xl lg:text-4xl font-semibold">
          Аренда инвентаря
        </h1>
        <div class="block lg:flex items-end gap-4">
          <div class="w-full mb-3 lg:mb-0">
            <p class="text-sm">
              Поиск инвентаря
            </p>
            <div class="relative w-full">
              <IconSearch class="absolute top-3 left-3 text-mainColor"/>
              <input
                  placeholder="Введите название анализов"
                  class="pl-10 px-3 py-3 border rounded-lg w-full"
                  type="text">
            </div>
          </div>
          <button class="w-full lg:w-max rounded text-white bg-mainColor py-3 px-20">
            Найти
          </button>
        </div>
      </div>
      <div
          v-if="!pending"
          class="block lg:flex items-start gap-4"
      >
        <div class="w-full lg:w-1/4 bg-white py-5 px-3 rounded-lg mb-5 lg:mb-0"
             style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px;">
          <h2 class="text-lg lg:text-3xl mb-5 text-mainColor">
            Категории
          </h2>
          <div
              @click="searchInventory(null)"
              class="block py-2 px-3 text-sm lg:text-base rounded-lg cursor-pointer"
              :class="{ 'bg-[#fe2c3945]' : !filters['fields[category.name]']}"
          >
            Все
          </div>
          <div
              @click="searchInventory(category.name)"
              v-for="(category, index) in resultCategories"
              class="block py-2 px-3 text-sm lg:text-base rounded-lg cursor-pointer"
              :class="{ 'bg-[#fe2c3945]' : category.name === filters['fields[category.name]']}"
              :key="index"
          >
            {{ category.name }}
          </div>
        </div>
        <div class="w-full lg:w-3/4">
          <div
              v-if="result.data.length > 0"
              class="w-full flex justify-between flex-wrap">
            <div
                class="w-full lg:w-half mb-5"
                v-for="(service, index) in result.data"
                :key="index">
              <InvCard :service="service"/>
            </div>
          </div>
          <div
              v-else
              class="my-5"
          >
            <p class="text-red-500 text-xl text-center">
              Ничего не найдено
            </p>
          </div>
          <div class="w-full">
            <Pagination
                :meta="inventory.result.meta"
                @navigate="inventory.listInventory({perPage: route.query.perPage, page: route.query.page})"
            />
          </div>
        </div>
      </div>
      <div
          v-else
          class="flex justify-between flex-wrap"
      >
        <div
            class="skeleton w-full lg:w-half h-[400px] mb-5"
            v-for="(doctor, index) in 6"
            :key="index">
        </div>
      </div>
    </div>
  </div>
</template>