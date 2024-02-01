<script setup>
import {IconClipboard, IconCalendar} from "@tabler/icons-vue"
import Spinner from "~/components/general/spinner.vue";

const staff = useStaffStore()
const {resultDetail} = storeToRefs(staff);

const activeTab = ref(0)

const route = useRoute()

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
    title: 'Доктора',
    link: '/services/doctors'
  }
])

onMounted(async () => {
  await nextTick()
  await staff.getStaffDetail(route.params.id)
  links.value.push({
    title: resultDetail.value.user.name,
    link: '/services/doctors/' + resultDetail.value.id
  })
  pending.value = false
})
</script>

<template>
  <div class="relative pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links" class="mb-5"/>
      <ServicesNavigation/>
      <div
          v-if="!pending"
          class="block lg:flex items-start justify-between gap-6">
        <div class="w-full lg:w-2/3 flex flex-col gap-5 mb-5 lg:mb-0">
          <div class="bg-white p-5 rounded-lg flex gap-5 h-full items-center">
            <img
                v-if="resultDetail.user.img"
                class="rounded-md h-full w-[130px]"
                :src="resultDetail.user.img"
                alt=""
            >
            <div v-else>
              <img
                  v-if="resultDetail.is_female"
                  class="rounded-md h-full w-[130px]"
                  src="@/assets/img/services/female_doctor.png"
                  alt=""
              >
              <img
                  v-else
                  class="rounded-md h-full w-[130px]"
                  src="@/assets/img/services/male_doctor.png"
                  alt=""
              >
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-sm lg:text-xl font-semibold">
                {{ resultDetail.user.name }}
              </p>
              <p class="text-[#9A9BA4] text-sm lg:text-lg">
                75 выполненных вызовов
              </p>
              <p class="text-sm lg:text-2xl text-mainColor font-semibold">
                {{ resultDetail.specialization.name }}
              </p>
              <p class="w-max py-1 lg:py-2 px-5 bg-mainColor rounded text-white">
                Стаж {{ resultDetail.experience }} лет
              </p>
            </div>
          </div>
          <div class="block lg:flex gap-6">
            <div
                @click="activeTab = 0"
                :class="{ '!bg-mainColor !text-white' : activeTab === 0 }"
                class="cursor-pointer bg-white text-mainColor flex items-center gap-2 py-2 px-6 rounded-md transition-all mb-3 lg:mb-0">
              <IconClipboard size="24"/>
              <p class="">
                О враче
              </p>
            </div>
            <div
                @click="activeTab = 1"
                :class="{ '!bg-mainColor !text-white' : activeTab === 1 }"
                class="cursor-pointer bg-white text-mainColor flex items-center gap-2 py-2 px-6 rounded-md transition-all">
              <IconCalendar size="24"/>
              <p class="">
                График работы
              </p>
            </div>
          </div>
          <div
              v-if="!pending"
              class="bg-white p-5 rounded-lg h-full">
            <div v-if="activeTab === 0">
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
        <div class="w-full lg:w-1/3">
          <div class="bg-white rounded-lg p-5">
            <p class="text-mainColor font-semibold pb-2 border-b border-mainColor text-2xl mb-4">
              Запись
            </p>
            <div class="block mb-4">
              <div class="w-full mb-3">
                <p class="text-sm lg:text-base mb-1">
                  Дни приема:
                </p>
                <div class="flex justify-between">
                  <!--            :class="{ 'bg-gray-200 cursor-not-allowed' : props.doctor.free_time[0].length === 0 }"-->
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">15</p>
                    <p>Пн</p>
                  </div>
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">16</p>
                    <p>Вт</p>
                  </div>
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">17</p>
                    <p>Ср</p>
                  </div>
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">18</p>
                    <p>Чт</p>
                  </div>
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">19</p>
                    <p>Пт</p>
                  </div>
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">20</p>
                    <p>Сб</p>
                  </div>
                  <div class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                    <p class="text-xs">21</p>
                    <p>Вс</p>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <p class="mb-1">
                  Время
                </p>
                <input
                    class="px-3 py-3 border rounded-lg w-full"
                    type="time"
                >
              </div>
            </div>
            <div class="mb-4">
              <p class="text-sm mb-3">
                Вид услуги
              </p>
              <div class="flex justify-between">
                <label class="text-sm lg:text-xl block w-half" for="">
                  <input type="radio" name="service" value="1">
                  Консультация
                </label>
                <label class="text-sm lg:text-xl block w-half" for="">
                  <input type="radio" name="service" value="2">
                  Вызов
                </label>
              </div>
            </div>
            <div class="mb-4">
              <p class="text-sm mb-3">
                Адресная книга <span class="text-red-500">*</span>
              </p>
              <div class="block lg:flex justify-between gap-5">
                <div class="relative w-full lg:w-3/5 mb-2 lg:mb-0">
                  <select class="px-3 py-3 border rounded-lg w-full">
                    <option value="">Казахстан, Алматы, проспект Назарбаева, 187Б, 4 этаж</option>
                  </select>
                </div>
                <button
                    class="border border-mainColor text-sm w-full lg:w-2/5 block rounded-lg text-mainColor py-2 lg:py-0">
                  Добавить новый адрес
                </button>
              </div>
            </div>
            <button class="w-full py-3 rounded-lg text-white bg-mainColor text-center mb-3">
              В корзину
            </button>
          </div>
        </div>
      </div>
      <Spinner v-else/>
    </div>
  </div>
</template>