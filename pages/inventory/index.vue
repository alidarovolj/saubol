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

onMounted(async () => {
  await nextTick()

  await addresses.listAddresses()
  await inventory.listInventoryCategories()
  await inventory.listInventory()
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
      <Breadcrumbs :links="links"/>
      <h1 class="text-4xl lg:text-6xl font-semibold text-mainColor mb-7">
        Аренда инвентаря
      </h1>
      <ServicesNavigation />
      <div class="bg-white p-5 rounded-lg my-8">
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
        <div class="w-full lg:w-1/4 bg-white py-5 px-3 rounded-lg mb-5 lg:mb-0">
          <h2 class="text-lg lg:text-3xl mb-5 text-mainColor">
            Категории
          </h2>
          <NuxtLink
              to="/"
            v-for="(category, index) in resultCategories"
              class="block py-2 px-3 text-sm lg:text-base rounded-lg"
              :class="{ 'bg-[#ECEDFF]' : index === 0 }"
              :key="index"
          >
            {{ category.name }}
          </NuxtLink>
        </div>
        <div class="w-full lg:w-3/4 flex justify-between flex-wrap">
          <div
              class="w-full lg:w-half mb-5"
              v-for="(service, index) in result.data"
              :key="index">
            <InvCard :service="service"/>
          </div>
        </div>
        <!--        <div>-->
        <!--          <Pagination-->
        <!--              :meta="result.meta"-->
        <!--              @navigate="staff.getStaff({perPage: route.query.perPage, page: route.query.page})"-->
        <!--          />-->
        <!--        </div>-->
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