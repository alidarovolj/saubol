<script setup>
import {IconStethoscope, IconNurse, IconVaccine, IconMicroscope, IconSearch} from "@tabler/icons-vue"
import jsonData from '@/assets/json/data.json'
import Doctor from "~/components/services/doctor.vue";
import {useStaffStore} from "~/store/staff.js";
import {useDomoLabStore} from "~/store/domoLab.js";

const route = useRoute()
const router = useRouter()
const lab = useDomoLabStore()
const {result, resultCategories} = storeToRefs(lab);

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
    title: 'Сдача анализов',
    link: '/services/tests'
  }
])

const searchValue = ref('')

const filters = ref({
  'fields[category.name]': null,
})

const searchTests = async (val) => {
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
  await lab.listDomolab(queryParams)
}

onMounted(async () => {
  await nextTick()

  const queries = {
    ...route.query,
    page: route.query.page || 1,
    perPage: route.query.perPage || 10,
  };

  if (route.query['fields[name]']) {
    searchValue.value = route.query['fields[name]'];
  }

  await router.push({query: queries});
  await lab.listDomolabCategories();
  await searchTests();

  pending.value = false;
});

useHead({
  title: "Сдача анализов | Услуги | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Сдача анализов | Услуги | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{rel: "canonical", href: "https://saubolmed.kz/"}],
});

watch(route.query, async (newVal) => {
  const newQuery = {...route.query, perPage: route.query.perPage, page: route.query.page, 'fields[name]': newVal};
  await lab.listDomolab(newQuery);
})
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links" class="mb-5"/>
      <!--      <ServicesNavigation />-->
      <div class="bg-white p-5 rounded-lg my-8" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px;">
        <h1 class="mb-5 text-mainColor text-2xl lg:text-4xl font-semibold">
          Сдача анализов
        </h1>
        <div class="block lg:flex items-end gap-4">
          <div class="w-full mb-3 lg:mb-0">
            <p class="text-sm">
              Поиск анализа
            </p>
            <div class="relative w-full">
              <IconSearch class="absolute top-3 left-3 text-mainColor"/>
              <input
                  v-model="searchValue"
                  placeholder="Введите название анализа"
                  class="pl-10 px-3 py-3 border rounded-lg w-full"
                  type="text">
            </div>
          </div>
          <button
              @click="lab.listDomolab({perPage: route.query.perPage, page: route.query.page, 'fields[name]': searchValue})"
              class="w-full lg:w-max rounded !text-white bg-mainColor py-3 px-20">
            Найти
          </button>
        </div>
      </div>
      <div
          v-if="!pending"
          class="block lg:flex items-start gap-4"
      >
        <div
            style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
            class="w-full lg:w-1/4 bg-white py-5 px-3 rounded-lg mb-5 lg:mb-0">
          <h2 class="text-lg lg:text-3xl mb-5 text-mainColor">
            Категории
          </h2>
          <div
              @click="searchTests(null)"
              class="block py-2 px-3 text-sm lg:text-base rounded-lg cursor-pointer"
              :class="{ 'bg-[#fe2c3945]' : !filters['fields[category.name]']}"
          >
            Все
          </div>
          <div
              @click="searchTests(category.name)"
              v-for="(category, index) in resultCategories"
              class="cursor-pointer block py-2 px-3 text-sm lg:text-base rounded-lg"
              :class="{ 'bg-[#fe2c3945]' : category.name === filters['fields[category.name]']}"
              :key="index"
          >
            {{ category.name }}
          </div>
        </div>
        <div class="w-full lg:w-3/4 flex flex-col gap-2">
          <div
              v-if="result.data.length > 0"
              class="w-full">
            <div
                class="w-full mb-5"
                v-for="(service, index) in result.data"
                :key="index">
              <TestCard :service="service"/>
            </div>
            <Pagination
                :meta="result.meta"
                @navigate="async () => {
      const newQuery = {...route.query, perPage: route.query.perPage, page: route.query.page};
      await lab.listDomolab(newQuery);
    }"
            />

          </div>
          <div
              v-else
              style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
              class="bg-white p-5 rounded-lg w-full text-center"
          >
            <p class="text-red-500 font-semibold">
              Ничего не найдено
            </p>
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