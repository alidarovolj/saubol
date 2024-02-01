<script setup>
import {IconX, IconMinus, IconPlus} from "@tabler/icons-vue"
import {useJobsStore} from "~/store/jobs.js";

const jobs = useJobsStore()
const {result} = storeToRefs(jobs);

const staff = useStaffStore()
const {resultSpecs} = storeToRefs(staff);

const pending = ref(true)

const form = ref({
  name: "",
  phone_number: "",
  email: "",
  role_id: 2,
  iin: "",
  specialization_id: null,
  experience: 0,
  job_places: [
    {
      id: 2,
      start_date: "2024-02-01",
      end_date: "2024-01-01",
    }
  ]
})

const links = ref([
  {
    title: "Главная",
    link: "/"
  },
  {
    title: "Стать специалистом",
    link: "/become-member"
  }
])

const addJobPlace = () => {
  form.value.job_places.push({
    id: null,
    start_date: null,
    end_date: null,
  })
}

const sendForm = () => {
  console.log(form.value)
}

onMounted(async () => {
  await nextTick()
  await jobs.jobsList()
  await staff.specializationList()
  pending.value = false
})
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links"/>
      <h1 class="text-4xl lg:text-6xl font-semibold text-mainColor mb-7">
        Заявка на регистрацию
      </h1>
      <div v-if="!pending">
        <div class="flex gap-5">
          <form
              @submit.prevent="sendForm"
              class="w-full lg:w-3/4">
            <div
                style="box-shadow: 0px 4px 20px 0px #0000001A;"
                class="bg-white rounded-lg py-5 px-4 flex flex-wrap justify-between mb-5">
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  ФИО <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.name"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите ФИО"
                >
              </div>
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  ИИН <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.iin"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите ИИН"
                >
              </div>
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  Телефон <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.phone_number"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите телефон"
                >
              </div>
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  Email <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.email"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите email"
                >
              </div>
              <div class="w-full lg:w-half">
                <p class="text-sm mb-2">
                  Специализация <span class="text-red-500">*</span>
                </p>
                <select
                    v-model="form.specialization_id"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                >
                  <option :value="null">
                    Выберите специализацию
                  </option>
                  <option
                      v-for="(it, ind) of resultSpecs"
                      :key="ind"
                      :value="it.id">
                    {{ it.name }}
                  </option>
                </select>
              </div>
            </div>
            <div
                style="box-shadow: 0px 4px 20px 0px #0000001A;"
                class="bg-white rounded-lg py-5 px-4 mb-5">
              <div class="block lg:flex gap-5 mb-6">
                <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
                  <div class="flex justify-between items-center mb-2">
                    <p>
                      Диплом <span class="text-red-500">*</span>
                    </p>
                    <button class="text-xs lg:text-base text-mainColor border border-mainColor rounded py-1 pr-5 lg:pl-8 pl-5">
                      + Добавить диплом
                    </button>
                  </div>
                  <div class="flex justify-between">
                    <div class="w-full bg-[#E7F0FF] rounded-md px-3 py-2 flex justify-between items-center gap-3">
                      <img class="w-max" src="@/assets/img/attachment.png" alt="">
                      <div class="w-full flex justify-between text-xs">
                        <p>Диплом.pdf</p>
                        <p class="text-[#9A9BA4]">127 KB</p>
                      </div>
                      <IconX
                          class="text-[#9A9BA4] cursor-pointer"
                          size="24"
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
                  <div class="flex justify-between items-center mb-2">
                    <p>
                      Сертификаты <span class="text-red-500">*</span>
                    </p>
                    <button class="text-xs lg:text-base text-mainColor border border-mainColor rounded py-1 pr-5 lg:pl-8 pl-5">
                      + Добавить сертификат
                    </button>
                  </div>
                  <div class="flex justify-between">
                    <div class="w-full bg-[#E7F0FF] rounded-md px-3 py-2 flex justify-between items-center gap-3">
                      <img class="w-max" src="@/assets/img/attachment.png" alt="">
                      <div class="w-full flex justify-between text-xs">
                        <p>Диплом.pdf</p>
                        <p class="text-[#9A9BA4]">127 KB</p>
                      </div>
                      <IconX
                          class="text-[#9A9BA4] cursor-pointer"
                          size="24"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="block lg:flex items-center gap-5 mb-6">
                <p>
                  Стаж работы (лет) <span class="text-red-500">*</span>
                </p>
                <div class="flex gap-2">
                  <div class="bg-mainColor text-white p-1 rounded-md cursor-pointer">
                    <IconMinus @click="form.experience = form.experience - 1"/>
                  </div>
                  <input
                      v-model="form.experience"
                      type="text"
                      class="bg-[#E7F0FF] rounded-md w-14 text-center"
                  >
                  <div class="bg-mainColor text-white p-1 rounded-md cursor-pointer">
                    <IconPlus @click="form.experience = form.experience + 1"/>
                  </div>
                </div>
              </div>
              <div
                  v-for="(item, index) of form.job_places"
                  :key="index"
                  :class="{ 'mb-3' : form.job_places.length - 1 !== index  }"
                  class="block lg:flex gap-3 items-center"
              >
                <div class="w-full lg:w-1/2 mb-3 lg:mb-0">
                  <p class="mb-2">
                    Место работы <span class="text-red-500">*</span>
                  </p>
                  <select
                      v-model="item.id"
                      type="text"
                      class="p-3 border w-full rounded-lg"
                  >
                    <option :value="null">
                      Выберите место работы
                    </option>
                    <option
                        v-for="(it, ind) of result"
                        :key="ind"
                        :value="it.id">
                      {{ it.full_name }}
                    </option>
                  </select>
                </div>
                <div class="w-full lg:w-1/2 mb-3 lg:mb-0 flex gap-3">
                  <div class="w-1/2">
                    <p class="mb-2">
                      Старт работы <span class="text-red-500">*</span>
                    </p>
                    <input
                        v-model="item.start_date"
                        type="date"
                        class="p-3 border w-full rounded-lg"
                    >
                  </div>
                  <div class="w-1/2">
                    <p class="mb-2">
                      Конец работы <span class="text-red-500">*</span>
                    </p>
                    <input
                        v-model="item.end_date"
                        type="date"
                        class="p-3 border w-full rounded-lg"
                    >
                  </div>
                </div>
                <div
                    @click="addJobPlace"
                    class="bg-mainColor text-white py-2 lg:py-1 p-1 rounded-md cursor-pointer flex justify-center">
                  <IconPlus/>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button
                  type="submit"
                  class="bg-mainColor text-white px-10 py-2 rounded-lg">
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
      <Spinner v-else />
    </div>
  </div>
</template>