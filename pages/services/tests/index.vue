<script setup>
import {IconStethoscope, IconNurse, IconVaccine, IconMicroscope} from "@tabler/icons-vue"
import jsonData from '@/assets/json/data.json'
import Doctor from "~/components/services/doctor.vue";
import {useStaffStore} from "~/store/staff.js";

const route = useRoute()
const router = useRouter()
const staff = useStaffStore()
const {result} = storeToRefs(staff);

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
    title: 'Сдать анализы',
    link: '/services/tests'
  }
])

onMounted(async () => {
  await nextTick()
  if (route.query.page) {
    await router.push({query: {...route.query, page: route.query.page}})
  } else {
    await router.push({query: {...route.query, page: 1}})
  }
  if (route.query.perPage) {
    await router.push({query: {...route.query, perPage: route.query.perPage}})
  } else {
    await router.push({query: {...route.query, perPage: 10}})
  }
  await staff.getStaff({perPage: route.query.perPage, page: route.query.page})
  pending.value = false
})
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links"/>
      <h1 class="text-4xl lg:text-6xl font-semibold text-mainColor mb-7">
        Анализы
      </h1>
      <ServicesNavigation />
      <div class="bg-white p-5 rounded-lg mb-8">
        <h1 class="mb-2 text-mainColor text-2xl lg:text-4xl font-semibold">
          Врач
        </h1>
        <p class="text-sm lg:text-lg mb-5">
          Онлайн консультации и вызов врача: Медицинская помощь у вас дома
        </p>
        <form @submit.prevent="setFilters" class="block lg:flex justify-between items-end">
          <div class="w-full lg:w-fourth mb-3 lg:mb-0">
            <p class="text-sm mb-2">
              Врач
            </p>
            <div class="relative">
              <select class="px-3 py-3 border  rounded-lg w-full">
                <option value="">Выберите анализ</option>
              </select>
            </div>
          </div>
          <div class="w-full lg:w-fourth mb-3 lg:mb-0">
            <p class="text-sm mb-2">
              Дата
            </p>
            <div class="relative">
              <input
                  class="px-3 py-3 border  rounded-lg w-full"
                  type="date"
              >
            </div>
          </div>
          <div class="w-full lg:w-fourth mb-4 lg:mb-0">
            <p class="text-sm mb-2">
              Время
            </p>
            <div class="relative">
              <input
                  class="px-3 py-3 border  rounded-lg w-full"
                  type="time"
              >
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
        <div class="flex justify-between flex-wrap">
          <div
              class="w-full lg:w-half mb-5"
              v-for="(doctor, index) in result.data"
              :key="index">
            <Doctor :doctor="doctor"/>
          </div>
        </div>
        <div>
          <Pagination
              :meta="result.meta"
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
</template>