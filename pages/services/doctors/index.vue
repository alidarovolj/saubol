<script setup>
import Doctor from "~/components/services/doctor.vue";
import {useStaffStore} from "~/store/staff.js";
import ServicesNavigation from "~/components/services/servicesNavigation.vue";
import {useAddressesStore} from "~/store/addresses.js";
import {useUserStore} from "~/store/user.js";

const route = useRoute()
const router = useRouter()
const staff = useStaffStore()
const {resultSearch, resultSpecs} = storeToRefs(staff);
const addresses = useAddressesStore()
const user = useUserStore()
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)

const pending = ref(true)

const filters = ref({
  'filters[specialization_id]': null,
  'fields[user.name]': null,
  'filters[is_female]': null,
  // 'start_time': null,
  'filters[schedule.day]': null,
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
    title: 'Доктора',
    link: '/services/doctors'
  }
])

const searchDoctors = async () => {
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
  await staff.searchStaff(queryParams)
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

  if(token.value) {
    await addresses.listAddresses()
  }
  await searchDoctors()
  await staff.specializationList()
  pending.value = false
})

useHead({
  title: "Доктора | Услуги | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Доктора | Услуги | SaubolMed",
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
        Доктора
      </h1>
      <ServicesNavigation/>
      <div class="bg-white p-5 rounded-lg mb-8">
        <h1 class="mb-2 text-mainColor text-2xl lg:text-4xl font-semibold">
          Врач
        </h1>
        <p class="text-sm lg:text-lg mb-5">
          Онлайн консультации и вызов врача: Медицинская помощь у вас дома
        </p>
        <form @submit.prevent="searchDoctors" class="block lg:flex justify-between items-end">
          <div class="w-full lg:w-fourth mb-3 lg:mb-0">
            <p class="text-sm mb-2">
              Специализация
            </p>
            <div class="relative">
              <select
                  class="px-3 py-3 border  rounded-lg w-full"
                  v-model="filters['filters[specialization_id]']">
                <option :value="null">
                  Все
                </option>
                <option
                    v-for="(item, index) of resultSpecs"
                    :key="index"
                    :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-full lg:w-fourth mb-3 lg:mb-0">
            <p class="text-sm mb-2">
              Дата
            </p>
            <div class="relative">
              <input
                  v-model="filters['filters[schedule.day]']"
                  class="px-3 py-3 border  rounded-lg w-full"
                  type="date"
              >
            </div>
          </div>
          <!--          <div class="w-full lg:w-fourth mb-4 lg:mb-0">-->
          <!--            <p class="text-sm mb-2">-->
          <!--              Время-->
          <!--            </p>-->
          <!--            <div class="relative">-->
          <!--              <input-->
          <!--                  v-model="filters.start_time"-->
          <!--                  class="px-3 py-3 border  rounded-lg w-full"-->
          <!--                  type="time"-->
          <!--              >-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="w-full lg:w-fourth mb-4 lg:mb-0">
            <p class="text-sm mb-2">
              Пол
            </p>
            <div class="relative flex h-[50px] gap-3">
              <div class="flex items-center gap-2">
                <input
                    v-model="filters['filters[is_female]']"
                    :value="true"
                    name="sex"
                    class="px-3 py-3 border  rounded-lg w-full"
                    type="radio"
                >
                <p>
                  Женский
                </p>
              </div>
              <div class="flex items-center gap-2">
                <input
                    v-model="filters['filters[is_female]']"
                    :value="false"
                    name="sex"
                    class="px-3 py-3 border  rounded-lg w-full"
                    type="radio"
                >
                <p>
                  Мужской
                </p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-fourth">
            <button
                type="submit"
                class="py-[14px] bg-mainColor text-white rounded-lg w-full cursor-pointer">
              Применить фильтр
            </button>
          </div>
        </form>
      </div>
      <div v-if="!pending">
        <div
            v-if="resultSearch.data.length > 0"
            class="flex justify-between flex-wrap">
          <div
              class="w-full lg:w-half mb-5"
              v-for="(doctor, index) in resultSearch.data"
              :key="index">
            <Doctor :doctor="doctor"/>
          </div>
        </div>
        <div
            v-else
            class="text-center mb-8"
        >
          <p class="text-red-500 font-semibold">
            Ничего не найдено
          </p>
        </div>
        <div>
          <Pagination
              :meta="resultSearch.meta"
              @navigate="staff.getStaff({perPage: route.query.perPage, page: route.query.page})"
          />
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
  <LoginModal v-if="!user.result"/>
  <CreateAddress />
</template>