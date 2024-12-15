<script setup>
import {
  IconBandage,
  IconEmergencyBed,
  IconFirstAidKit,
  IconHeartRateMonitor,
  IconVaccine,
  IconVaccineBottle,
} from '@tabler/icons-vue';
import { useNursesStore } from '~/store/nurses.js';
import { useAddressesStore } from '~/store/addresses.js';
import { nextTick } from 'vue';

const route = useRoute();
const nurses = useNursesStore();
const { result } = storeToRefs(nurses);
const addresses = useAddressesStore();

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
    title: 'Мед-услуги',
    link: '/services/med-services',
  },
]);

const category_id = ref()

const categories = ref([
  { id:'', title: 'Все услуги', icon: IconHeartRateMonitor },
  { id: 1, title: 'Уколы', icon: IconVaccine },
  { id: 2, title: 'Капельницы', icon: IconVaccineBottle },
  { id: 3, title: 'Перевязка', icon: IconBandage },
  { id: 4, title: 'Пакеты процедур', icon: IconFirstAidKit },
  { id: 5, title: 'Дополнительные услуги', icon: IconEmergencyBed },
])

watch(
  () => route.query,
  () => nurses.getNurses(),
)

onMounted(async () => {
  await nextTick()

  category_id.value = +route.query['filters[category.id]'] || ''

  await nurses.getNurses()
  await addresses.listAddresses();
  pending.value = false;
})

onBeforeRouteUpdate((to, from, next) => {

 category_id.value = +to.query['filters[category.id]'] || ''

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
  title: 'Мед-услуги | Услуги | SaubolMed',
  meta: [
    {
      property: 'og:title',
      content: 'Мед-услуги | Услуги | SaubolMed',
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
      <div
        class="bg-white p-5 rounded-lg mb-8"
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px">
        <h1 class="mb-2 text-mainColor text-2xl md:text-4xl font-semibold">
          Мед-услуги
        </h1>
        <p class="text-sm md:text-lg mb-5">
          Онлайн консультации и вызов врача: Медицинская помощь у вас дома
        </p>
        <div class="block md:flex justify-between items-end bg-[#ffe7e7] p-3 rounded-lg gap-2 text-sm">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="{'bg-mainColor text-white': category_id === category.id}"
            class="w-full md:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center hover:bg-mainColor hover:bg-opacity-70 hover:text-white"
            @click="() => { navigateTo({
              query:{
                ...$route.query,
                perPage: 10,
                page:1,
                'filters[category.id]': category.id || undefined
              }}); category_id = category.id}">
            <component
              :is="category.icon"
              class="w-6 h-6 mr-2" />
            <span>{{ category.title }}</span>
          </button>
        </div>
      </div>
      <div v-if="!pending">
        <div class="flex justify-between flex-wrap">
          <div
            v-for="(service, index) in result.data"
            :key="index"
            class="w-full md:w-half mb-5">
            <MedService :service="service" />
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
        class="flex justify-between flex-wrap">
        <div
          v-for="(_, index) in 6"
          :key="index"
          class="skeleton w-full md:w-half h-[400px] mb-5"></div>
      </div>
    </div>
  </div>
</template>