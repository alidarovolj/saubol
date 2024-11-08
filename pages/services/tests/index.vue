<script setup>
import {IconSearch,} from "@tabler/icons-vue";
import {useDomoLabStore} from "~/store/domoLab.js";

const route = useRoute();
const router = useRouter();
const lab = useDomoLabStore();
const {result, resultCategories} = storeToRefs(lab);

const pending = ref(true);

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
    title: "Сдача анализов",
    link: "/services/tests",
  },
]);

const searchValue = ref("");

const filters = ref({
  "fields[category.name]": null,
});

const searchTests = async (val) => {
  if (val) {
    filters.value["fields[category.name]"] = val;
  } else {
    filters.value["fields[category.name]"] = null;
  }

  const nonNullFilters = Object.entries(filters.value).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {}
  );

  const queryParams = {
    ...nonNullFilters,
    perPage: route.query.perPage || 10,
    page: route.query.page || 1,
  };

  await router.push({query: {...route.query, ...queryParams}});
  await lab.listDomolab(queryParams);
};

onMounted(async () => {
  await nextTick();

  const queries = {
    ...route.query,
    page: route.query.page || 1,
    perPage: route.query.perPage || 10,
  };

  if (route.query["fields[name]"]) {
    searchValue.value = route.query["fields[name]"];
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
  const newQuery = {
    ...route.query,
    perPage: route.query.perPage,
    page: route.query.page,
    "fields[name]": newVal,
  };
  await lab.listDomolab(newQuery);
});
</script>

<template>
  <div class="pt-4 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" class="mb-5"/>
      <!--      <ServicesNavigation />-->
      <div
          class="bg-white p-5 rounded-lg my-8"
          style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px"
      >
        <h1 class="mb-5 text-mainColor text-2xl md:text-4xl font-semibold">
          Сдача анализов
        </h1>
        <div class="block md:flex items-end gap-4">
          <div class="w-full mb-3 md:mb-0">
            <p class="text-sm">Поиск анализа</p>
            <div class="relative w-full">
              <IconSearch class="absolute top-3 left-3 text-mainColor"/>
              <input
                  v-model="searchValue"
                  class="pl-10 px-3 py-3 border rounded-lg w-full"
                  placeholder="Введите название анализа"
                  type="text"
              />
            </div>
          </div>
          <button
              class="w-full md:w-max rounded !text-white bg-mainColor py-3 px-20"
              @click="
              lab.listDomolab({
                perPage: route.query.perPage,
                page: route.query.page,
                'fields[name]': searchValue,
              })
            "
          >
            Найти
          </button>
        </div>
      </div>
      <div v-if="!pending" class="block md:flex items-start gap-4">
        <div
            class="w-full md:w-1/4 bg-white py-5 px-3 rounded-lg mb-5 md:mb-0"
            style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05)"
        >
          <h2 class="text-lg md:text-3xl mb-5 text-mainColor">Категории</h2>
          <div
              :class="{ 'bg-[#fe2c3945]': !filters['fields[category.name]'] }"
              class="block py-2 px-3 text-sm md:text-base rounded-lg cursor-pointer"
              @click="searchTests(null)"
          >
            Все
          </div>
          <div
              v-for="(category, index) in resultCategories"
              :key="index"
              :class="{
              'bg-[#fe2c3945]':
                category.name === filters['fields[category.name]'],
            }"
              class="cursor-pointer block py-2 px-3 text-sm md:text-base rounded-lg"
              @click="searchTests(category.name)"
          >
            {{ category.name }}
          </div>
        </div>
        <div class="w-full md:w-3/4 flex flex-col gap-2">
          <div v-if="result.data.length > 0" class="w-full">
            <div
                v-for="(service, index) in result.data"
                :key="index"
                class="w-full mb-5"
            >
              <TestCard :service="service"/>
            </div>
            <Pagination
                :meta="result.meta"
                @navigate="
                async () => {
                  const newQuery = {
                    ...route.query,
                    perPage: route.query.perPage,
                    page: route.query.page,
                  };
                  await lab.listDomolab(newQuery);
                }
              "
            />
          </div>
          <div
              v-else
              class="bg-white p-5 rounded-lg w-full text-center"
              style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05)"
          >
            <p class="text-red-500 font-semibold">Ничего не найдено</p>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-between flex-wrap">
        <div
            v-for="(doctor, index) in 6"
            :key="index"
            class="skeleton w-full md:w-half h-[400px] mb-5"
        ></div>
      </div>
    </div>
  </div>
</template>
