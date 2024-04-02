<script setup>
import {
  IconHeartRateMonitor,
  IconVaccine,
  IconVaccineBottle,
  IconBandage,
  IconFirstAidKit,
  IconEmergencyBed
} from "@tabler/icons-vue"
import {useNursesStore} from "~/store/nurses.js";
import {useAddressesStore} from "~/store/addresses.js";

const route = useRoute()
const router = useRouter()
const nurses = useNursesStore()
const {result} = storeToRefs(nurses);
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
    title: 'Мед-услуги',
    link: '/services/med-services'
  }
])

const filters = ref({
  'filters[category.id]': null
})

const searchDoctors = async (val) => {
  if (val) {
    filters.value['filters[category.id]'] = val
  } else {
    filters.value['filters[category.id]'] = null
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
  await nurses.getNurses(queryParams)
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
  await searchDoctors()
  pending.value = false
})

useHead({
  title: "Мед-услуги | Услуги | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Мед-услуги | Услуги | SaubolMed",
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
        Мед-услуги
      </h1>
      <ServicesNavigation/>
      <div class="bg-white p-5 rounded-lg mb-8" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px;">
        <h1 class="mb-2 text-mainColor text-2xl lg:text-4xl font-semibold">
          Мед-услуги
        </h1>
        <p class="text-sm lg:text-lg mb-5">
          Онлайн консультации и вызов врача: Медицинская помощь у вас дома
        </p>
        <div class="block lg:flex justify-between items-end bg-[#E7F0FF] p-3 rounded-lg gap-2 text-sm">
          <div
              @click="searchDoctors(null)"
              :class="{ 'bg-mainColor text-white ' : filters['filters[category.id]'] === null }"
              class="w-full lg:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center">
            <IconHeartRateMonitor class="w-6 h-6 mr-2"/>
            <p>Все услуги</p>
          </div>
          <div
              @click="searchDoctors(1)"
              :class="{ 'bg-mainColor text-white ' : filters['filters[category.id]'] === 1 }"
              class="w-full lg:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center">
            <IconVaccine class="w-6 h-6 mr-2"/>
            <p>Уколы</p>
          </div>
          <div
              @click="searchDoctors(2)"
              :class="{ 'bg-mainColor text-white ' : filters['filters[category.id]'] === 2 }"
              class="w-full lg:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center">
            <IconVaccineBottle class="w-6 h-6 mr-2"/>
            <p>Капельницы</p>
          </div>
          <div
              @click="searchDoctors(3)"
              :class="{ 'bg-mainColor text-white ' : filters['filters[category.id]'] === 3 }"
              class="w-full lg:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center">
            <IconBandage class="w-6 h-6 mr-2"/>
            <p>Перевязка</p>
          </div>
          <div
              @click="searchDoctors(4)"
              :class="{ 'bg-mainColor text-white ' : filters['filters[category.id]'] === 4 }"
              class="w-full lg:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center">
            <IconFirstAidKit class="w-6 h-6 mr-2"/>
            <p>Пакеты процедур</p>
          </div>
          <div
              @click="searchDoctors(5)"
              :class="{ 'bg-mainColor text-white ' : filters['filters[category.id]'] === 5 }"
              class="w-full lg:w-1/6 flex items-center cursor-pointer transition-all py-3 rounded-lg text-center justify-center">
            <IconEmergencyBed class="w-6 h-6 mr-2"/>
            <p>Дополнительные услуги</p>
          </div>
        </div>
      </div>
      <div v-if="!pending">
        <div class="flex justify-between flex-wrap">
          <div
              class="w-full lg:w-half mb-5"
              v-for="(service, index) in result.data"
              :key="index">
            <MedService :service="service"/>
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