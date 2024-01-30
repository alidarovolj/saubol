<script setup>
import {IconClipboard, IconCalendar} from "@tabler/icons-vue"

const staff = useStaffStore()
const {resultDetail} = storeToRefs(staff);

const activeTab = ref(0)

const route = useRoute()

const pending = ref(true)

onMounted(async () => {
  await nextTick()
  await staff.getStaffDetail(route.params.id)
  pending.value = false
})
</script>

<template>
  <div class="relative pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <div
          v-if="!pending"
          class="flex items-start justify-between gap-6">
        <div class="w-2/3 flex flex-col gap-5">
          <div class="bg-white p-5 rounded-lg flex gap-5 h-full items-center">
            <img
                class="rounded-md h-full w-auto"
                src="@/assets/img/services/1.png"
                alt=""
            >
            <div class="flex flex-col gap-3">
              <p class="text-sm lg:text-xl font-semibold">
                {{ resultDetail.user.name }}
              </p>
              <p class="text-[#9A9BA4] text-lg">
                75 выполненных вызовов
              </p>
              <p class="text-2xl text-mainColor font-semibold">
                {{ resultDetail.specialization.name }}
              </p>
              <p class="w-max py-1 lg:py-2 px-5 bg-mainColor rounded text-white">
                Стаж {{ resultDetail.experience }} лет
              </p>
            </div>
          </div>
          <div class="flex gap-6">
            <div
                @click="activeTab = 0"
                :class="{ '!bg-mainColor !text-white' : activeTab === 0 }"
                class="bg-white text-mainColor flex items-center gap-2 py-2 px-6 rounded-md transition-all">
              <IconClipboard size="24"/>
              <p class="">
                О враче
              </p>
            </div>
            <div
                @click="activeTab = 1"
                :class="{ '!bg-mainColor !text-white' : activeTab === 1 }"
                class="bg-white text-mainColor flex items-center gap-2 py-2 px-6 rounded-md transition-all">
              <IconCalendar size="24"/>
              <p class="">
                График работы
              </p>
            </div>
          </div>
          <div
              v-if="!pending"
              class="bg-white p-5 rounded-lg h-full">
            <h2 class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5">
              Специализация
            </h2>
            <ul class="list-disc pl-5 mb-5 text-sm">
              <li>Профилактические приёмы детей от 0 до 18 лет</li>
              <li>Перинатальная патология у детей</li>
              <li>Головные боли разной этиологии</li>
              <li>Неврозы, тики</li>
              <li>Задержка речевого развития</li>
              <li>Вегетососудистая дистония</li>
              <li>Остеохондрозы с болевым синдромом</li>
              <li>Сосудистые заболевания головного мозга</li>
              <li>Последствия инсультов и черепно-мозговых травм</li>
              <li>Внутрижелудочковое кровоизлияние (ВЖК)</li>
              <li>Доброкачественная внутричерепная гипертензия</li>
              <li>ДЦП</li>
              <li>Синдром Дауна</li>
            </ul>
            <h2 class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5">
              Опыт работы
            </h2>
            <ul class="list-disc pl-5 text-sm mb-5">
              <li>2022 г. — МЦ РАХАТ, онколог, маммолог</li>
              <li>2021–2022 гг. — Артемовская ГБ№ 1, врач-онколог, заведующий ЦАОП, основал ЦАОП в Аремовской ГБ № 1
              </li>
              <li>2020–2021 гг. — ККЦ СВМП, ковидный госпиталь, врач-специалист</li>
              <li>2017–2020 гг. — КГБУЗ ВП № 6, врач-онколог, основал ПОК в ВП № 6</li>
            </ul>
            <div class="mb-5">
              <p class="bg-[#E7F0FF] p-3 rounded-md text-sm">
                Опытный невролог с выдающимися регалиями приглашает на консультации: высококвалифицированная помощь в
                диагностике и лечении неврологических состояний.
              </p>
            </div>
            <div class="">
              <h2 class="text-mainColor text-2xl font-semibold border-b border-mainColor w-full pb-2 mb-5">
                Сертификаты
              </h2>
              <div class="flex items-center justify-between overflow-x-auto">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
                <img class="w-max rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
          v-else
          class="bg-white p-6 w-max rounded-xl mx-auto my-20">
        <div class="spinner p-3"></div>
      </div>
    </div>
  </div>
</template>