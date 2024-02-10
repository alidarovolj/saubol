<script setup>
import {IconX, IconMinus, IconPlus} from "@tabler/icons-vue"
import {useJobsStore} from "~/store/jobs.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const jobs = useJobsStore()
const {result} = storeToRefs(jobs);

const staff = useStaffStore()
const {resultSpecs} = storeToRefs(staff);

const runtimeConfig = useRuntimeConfig()

const pending = ref(true)
const router = useRouter()
const loading = ref(false)

const fileInput = ref(null);

const form = ref({
  name: "",
  phone_number: "",
  email: "",
  role_id: null,
  iin: "",
  specialization_id: null,
  specialization_details: [
    ""
  ],
  experience: 0,
  job_places: [
    {
      id: 2,
      start: "2024-02-01",
      end: "2024-01-01",
    }
  ],
  schedule: {
    duration: 45,
    days: [
      {
        weekday_number: 1,
        times: [
          {
            start: "",
            end: ""
          }
        ]
      }
    ]
  },
  diplomas: [],
  certificates: []
})

const v$ = useVuelidate({
  name: {required},
  phone_number: {required},
  email: {required},
  role_id: {required},
  iin: {required},
  specialization_id: {required},
  specialization_details: {
    $each: {
      $validator: {required},
    }
  },
  diplomas: {
    $each: {
      $validator: {required},
    }
  },
  certificates: {
    $each: {
      $validator: {required},
    }
  },
  experience: {required},
  job_places: {
    $each: {
      $validator: {
        id: {required},
        start: {required},
        end: {required},
      }
    }
  }
}, form);

const addDay = (val) => {
  if (isWeekdayNumberIncluded(val)) {
    form.value.schedule.days = form.value.schedule.days.filter(day => day.weekday_number !== val);
  } else {
    form.value.schedule.days.push({
      weekday_number: val,
      times: [
        {
          start: "",
          end: ""
        }
      ]
    });
  }
};

const addTime = (weekday_number) => {
  const day = form.value.schedule.days.find(day => day.weekday_number === weekday_number);
  if (day) {
    day.times.push({
      start: "",
      end: ""
    });
  }
};

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
    start: null,
    end: null,
  })
}

const addSpecDetail = () => {
  form.value.specialization_details.push("")
}

const importLocal = async (e) => {
  if (fileInput.value && fileInput.value.files[0]) {
    const file = fileInput.value.files[0];
    await staff.importDoc(file)
  }
}

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const isWeekdayNumberIncluded = (val) => {
  return form.value.schedule.days.some(day => day.weekday_number === val);
};

const getDay = (weekday_number) => {
  return form.value.schedule.days.find(day => day.weekday_number === weekday_number);
};

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  const {data, error} = await useFetch("/staff/", {
    method: "POST",
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(form.value),
    lazy: true
  });

  if (data.value) {
    router.push('/')
    notify(true, 'Спасибо за регистрацию!')
    loading.value = false;
  } else {
    notify(false, error.value.message)
    loading.value = false;
  }
}

onMounted(async () => {
  await nextTick()
  await jobs.jobsList()
  await staff.specializationList()
  pending.value = false
})

const route = useRoute()

useHead({
  title: "Регистрация доктора | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Регистрация доктора | SaubolMed",
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
                    :class="{'border-red-500': v$.name.$error}"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите ФИО"
                >
                <p
                    v-if="v$.name.$error"
                    class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  ИИН <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.iin"
                    :class="{'border-red-500': v$.iin.$error}"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите ИИН"
                >
                <p
                    v-if="v$.iin.$error"
                    class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  Телефон <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.phone_number"
                    :class="{'border-red-500': v$.phone_number.$error}"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите телефон"
                >
                <p
                    v-if="v$.phone_number.$error"
                    class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full lg:w-half mb-5">
                <p class="text-sm mb-2">
                  Email <span class="text-red-500">*</span>
                </p>
                <input
                    v-model="form.email"
                    :class="{'border-red-500': v$.email.$error}"
                    type="text"
                    class="p-3 border w-full rounded-lg"
                    placeholder="Введите email"
                >
                <p
                    v-if="v$.email.$error"
                    class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full mb-5">
                <p class="text-sm mb-2">
                  Профиль работы <span class="text-red-500">*</span>
                </p>
                <div class="flex">
                  <div class="w-full lg:w-1/4 flex gap-3">
                    <input
                        value="2"
                        v-model="form.role_id"
                        :class="{'border border-red-500': v$.role_id.$error}"
                        type="radio"
                        name="role"
                        class="w-6 h-6"
                    >
                    <p>
                      Врач
                    </p>
                  </div>
                  <div class="w-full lg:w-1/4 flex gap-3">
                    <input
                        v-model="form.role_id"
                        :class="{'border border-red-500': v$.role_id.$error}"
                        value="3"
                        type="radio"
                        name="role"
                        class="w-6 h-6"
                    >
                    <p>
                      Медсестра
                    </p>
                  </div>
                  <p
                      v-if="v$.role_id.$error"
                      class="text-red-500 text-xs">
                    Пожалуйста заполните данное поле
                  </p>
                </div>
              </div>
              <div class="w-full mb-6">
                <p class="text-sm mb-2">
                  Специализация <span class="text-red-500">*</span>
                </p>
                <select
                    v-model="form.specialization_id"
                    :class="{'border-red-500': v$.specialization_id.$error}"
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
                <p
                    v-if="v$.specialization_id.$error"
                    class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full lg:w-half mb-6">
                <div class="flex justify-between items-center w-full mb-3">
                  <p class="text-sm mb-2">
                    Детали специализации <span class="text-red-500">*</span>
                  </p>
                  <div
                      @click="addSpecDetail"
                      class="bg-mainColor text-white py-2 lg:py-1 p-1 rounded-md cursor-pointer flex justify-center">
                    <IconPlus/>
                  </div>
                </div>
                <div
                    v-for="(item, index) of form.specialization_details"
                    :key="index"
                    :class="{ 'mb-3' : form.specialization_details.length - 1 !== index  }"
                    class="block lg:flex gap-3 items-center"
                >
                  <div class="w-full mb-3 lg:mb-0">
                    <input
                        type="text"
                        v-model="form.specialization_details[index]"
                        class="p-3 border w-full rounded-lg"
                        placeholder="Введите деталь"
                    >
                  </div>
                </div>
              </div>
              <div class="w-full">
                <p class="text-sm lg:text-base mb-1">
                  Дни приема:
                </p>
                <div class="flex flex-col gap-3">
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(1)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(1) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">15</p>
                      <p>Пн</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(1)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(1).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(addTime(getDay(1).weekday_number))"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(2)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(2) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">16</p>
                      <p>Вт</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(2)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(2).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(getDay(2).weekday_number)"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(3)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(3) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">17</p>
                      <p>Ср</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(3)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(3).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(getDay(3).weekday_number)"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(4)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(4) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">18</p>
                      <p>Чт</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(4)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(4).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(addTime(getDay(4).weekday_number))"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(5)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(5) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">19</p>
                      <p>Пт</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(5)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(5).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(addTime(getDay(5).weekday_number))"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(6)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(6) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">20</p>
                      <p>Сб</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(6)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(6).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(getDay(6).weekday_number)"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-5">
                    <div
                        @click="addDay(7)"
                        :class="{ 'bg-mainColor text-white' : isWeekdayNumberIncluded(7) }"
                        class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center flex flex-col justify-center">
                      <p class="text-xs">21</p>
                      <p>Вс</p>
                    </div>
                    <div class="w-1/2" v-if="getDay(7)">
                      <p class="text-[10px] mb-1">
                        Выберите время для окошка
                      </p>
                      <div class="flex flex-col gap-2">
                        <div
                            v-for="(time, index) in getDay(7).times"
                            :key="index"
                            class="block"
                        >
                          <div class="flex gap-3">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.start">
                            <input
                                class="p-2 border w-full rounded-lg"
                                type="time"
                                v-model="time.end">
                            <div
                                @click="addTime(addTime(getDay(7).weekday_number))"
                                class="bg-mainColor p-2 rounded-lg text-white cursor-pointer">
                              <IconPlus/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <button
                        class="text-xs lg:text-base text-mainColor border border-mainColor rounded py-1 pr-5 lg:pl-8 pl-5">
                      + Добавить диплом
                    </button>
                  </div>
                  <div
                      v-for="(item, index) of form.diplomas"
                      :key="index"
                      class="flex justify-between">
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
                  <input
                      ref="fileInput"
                      @change="importLocal"
                      type="file"
                  >
                </div>
                <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
                  <div class="flex justify-between items-center mb-2">
                    <p>
                      Сертификаты <span class="text-red-500">*</span>
                    </p>
                    <button
                        class="text-xs lg:text-base text-mainColor border border-mainColor rounded py-1 pr-5 lg:pl-8 pl-5">
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
                      :class="{'border-red-500': v$.experience.$error}"
                      type="text"
                      class="bg-[#E7F0FF] rounded-md w-14 text-center"
                  >
                  <div class="bg-mainColor text-white p-1 rounded-md cursor-pointer">
                    <IconPlus @click="form.experience = form.experience + 1"/>
                  </div>
                </div>
                <p
                    v-if="v$.experience.$error"
                    class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="mb-6">
                <div class="flex items-center justify-between">
                  <p class="mb-2">
                    Место работы <span class="text-red-500">*</span>
                  </p>
                  <div
                      @click="addJobPlace"
                      class="bg-mainColor text-white py-2 lg:py-1 p-1 rounded-md cursor-pointer flex justify-center">
                    <IconPlus/>
                  </div>
                </div>
                <div
                    v-for="(item, index) of form.job_places"
                    :key="index"
                    :class="{ 'mb-3' : form.job_places.length - 1 !== index  }"
                    class="block lg:flex gap-3 items-end"
                >
                  <div class="w-full lg:w-1/2 mb-3 lg:mb-0">
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
                          v-model="item.start"
                          type="date"
                          class="p-3 border w-full rounded-lg"
                      >
                    </div>
                    <div class="w-1/2">
                      <p class="mb-2">
                        Конец работы <span class="text-red-500">*</span>
                      </p>
                      <input
                          v-model="item.end"
                          type="date"
                          class="p-3 border w-full rounded-lg"
                      >
                    </div>
                  </div>
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
      <Spinner v-else/>
    </div>
  </div>
</template>