<script setup>
import { IconSearch } from '@tabler/icons-vue';
import { useDomoLabStore } from '~/store/domoLab.js';

const route = useRoute();
const lab = useDomoLabStore();
const { result, resultCategories } = storeToRefs(lab);

const pending = ref(true);

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
    title: 'Сдача анализов',
    link: '/services/tests',
  },
]);

const category_name = ref()
const searchKeyword = ref()

watch(
  () => route.query,
  () => lab.listDomolab(),
)

onMounted(async () => {
  await nextTick();

  category_name.value = route.query['fields[category.name]'] || ''
  searchKeyword.value = route.query['fields[name]'] || ''

  await lab.listDomolabCategories()
  await lab.listDomolab()

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
  title: 'Сдача анализов | Услуги | SaubolMed',
  meta: [
    {
      property: 'og:title',
      content: 'Сдача анализов | Услуги | SaubolMed',
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
      <!--      <ServicesNavigation />-->
      <div
        class="bg-white p-5 rounded-lg my-8"
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px">
        <h1 class="mb-5 text-mainColor text-2xl md:text-4xl font-semibold">
          Сдача анализов
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
            <p class="text-sm">Поиск анализа</p>
            <div class="relative w-full">
              <IconSearch class="absolute top-3 left-3 text-mainColor" />
              <input
                v-model="searchKeyword"
                class="pl-10 px-3 py-3 border rounded-lg w-full"
                placeholder="Введите название анализа"
                type="text" />
            </div>
          </div>
          <button
            type="submit"
            class="w-full md:w-max rounded !text-white bg-mainColor py-3 px-20">
            Найти
          </button>
        </form>
      </div>
      <div
        v-if="!pending"
        class="block md:flex items-start gap-4">
        <div
          class="w-full md:w-1/4 bg-white py-5 px-3 rounded-lg mb-5 md:mb-0"
          style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05)">
          <h2 class="text-lg md:text-3xl mb-5 text-mainColor">Категории</h2>
          <button
            :class="{'bg-[#fe2c3945]': !category_name }"
            class="block w-full py-2 px-3 text-sm md:text-base text-start rounded-lg cursor-pointer"
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
            class="cursor-pointer block w-full py-2 px-3 text-sm md:text-base rounded-lg text-start"
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
        <div class="w-full md:w-3/4 flex flex-col gap-2">
          <div
            v-if="result.data.length > 0"
            class="w-full">
            <div
              v-for="(service, index) in result.data"
              :key="index"
              class="w-full mb-5">
              <TestCard :service="service" />
            </div>
            <Pagination :pagination="result.meta" />
          </div>
          <div
            v-else
            class="bg-white p-5 rounded-lg w-full text-center"
            style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05)">
            <p class="text-red-500 font-semibold">Ничего не найдено</p>
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