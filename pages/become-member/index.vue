<script setup>
import { IconX, IconMinus, IconPlus } from "@tabler/icons-vue";
import { useJobsStore } from "~/store/jobs.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const jobs = useJobsStore();
const { result } = storeToRefs(jobs);

const staff = useStaffStore();
const { resultSpecs } = storeToRefs(staff);

const runtimeConfig = useRuntimeConfig();

const pending = ref(true);
const router = useRouter();
const loading = ref(false);

const fileInput = ref(null);
const fileInputSert = ref(null);

const diplomaFiles = ref([]);
const sertificateFiles = ref([]);

const times = ref([]);

const days = ref([
  {
    title: "Понедельник",
    value: 1,
  },
  {
    title: "Вторник",
    value: 2,
  },
  {
    title: "Среда",
    value: 3,
  },
  {
    title: "Четверг",
    value: 4,
  },
  {
    title: "Пятница",
    value: 5,
  },
  {
    title: "Суббота",
    value: 6,
  },
  {
    title: "Воскресенье",
    value: 7,
  },
]);

const form = ref({
  name: "",
  phone_number: "",
  email: "",
  role_id: null,
  iin: "",
  service_ids: [],
  specialization_id: null,
  specialization_details: [""],
  experience: 0,
  job_places: [
    {
      id: null,
      start: "2024-02-01",
      end: "2024-01-01",
    },
  ],
  schedule: {
    duration: 45,
    days: [],
  },
  diplomas: [],
  certificates: [],
});

const v$ = useVuelidate(
  {
    name: { required },
    phone_number: { required },
    email: { required },
    role_id: { required },
    iin: { required },
    specialization_id: { required },
    specialization_details: {
      $each: {
        $validator: { required },
      },
    },
    diplomas: {
      $each: {
        $validator: { required },
      },
    },
    certificates: {
      $each: {
        $validator: { required },
      },
    },
    experience: { required },
    job_places: {
      $each: {
        id: { required },
        start: { required },
        end: { required },
      },
    },
  },
  form
);

function generateTimes(duration) {
  const times = [];
  let hours = 0;
  let minutes = 0;

  while (hours < 24) {
    const start = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    minutes += duration;
    if (minutes >= 60) {
      hours += 1;
      minutes = 0;
    }
    const end = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    times.push({ start, end });
  }

  return times;
}

const periods = ref([]);

const addDay = (val) => {
  if (isWeekdayNumberIncluded(val.value)) {
    form.value.schedule.days = form.value.schedule.days.filter(
      (day) => day.weekday_number !== val.value
    );
  } else {
    form.value.schedule.days.push({
      weekday_number: val.value,
      times: [],
    });
  }
};

const links = ref([
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Стать специалистом",
    link: "/become-member",
  },
]);

const addJobPlace = () => {
  form.value.job_places.push({
    id: null,
    start: null,
    end: null,
  });
};

const addSpecDetail = () => {
  form.value.specialization_details.push("");
};

const importLocal = async (e) => {
  if (fileInput.value && fileInput.value.files[0]) {
    const file = fileInput.value.files[0];
    let formattedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    };
    diplomaFiles.value.push(formattedFile);
    await staff.importDoc(file);
    form.value.diplomas.push(staff.resultDoc.filename);
  }
};

const importLocalSert = async (e) => {
  if (fileInputSert.value && fileInputSert.value.files[0]) {
    const file = fileInputSert.value.files[0];
    let formattedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    };
    sertificateFiles.value.push(formattedFile);
    await staff.importDoc(file);
    form.value.certificates.push(staff.resultDoc.filename);
  }
};

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const isWeekdayNumberIncluded = (val) => {
  return form.value.schedule.days.some((day) => day.weekday_number === val);
};

const getDay = (weekday_number) => {
  return form.value.schedule.days.find(
    (day) => day.weekday_number === weekday_number
  );
};

const setServices = (val) => {
  if (form.value.service_ids.includes(val)) {
    form.value.service_ids = form.value.service_ids.filter(
      (item) => item !== val
    );
  } else {
    form.value.service_ids.push(val);
  }
};

const sendForm = async () => {
  loading.value = true;
  v$.value.$touch();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  form.value.schedule.days = form.value.schedule.days.map((day) => {
    return {
      ...day,
      times: times.value.filter((time) => time.start && time.end),
    };
  });

  const { data, error } = await useFetch("/staff/", {
    method: "POST",
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(form.value),
    lazy: true,
  });

  if (data.value) {
    router.push("/");
    notify(true, "Спасибо за регистрацию!");
    loading.value = false;
  } else {
    notify(false, error.value.message);
    loading.value = false;
  }
};

onMounted(async () => {
  await nextTick();
  await jobs.jobsList();
  await staff.specializationList();
  periods.value = generateTimes(form.value.schedule.duration);
  pending.value = false;
});

const route = useRoute();

watch(
  () => form.value.schedule.duration,
  () => {
    times.value = [];
    periods.value = [];
    periods.value = [...generateTimes(form.value.schedule.duration)];
    form.value.schedule.days = [];
  }
);

watch(
  () => form.value.role_id,
  () => {
    times.value = [];
    periods.value = [];
    periods.value = [...generateTimes(form.value.schedule.duration)];
    form.value.schedule.days = [];
  }
);

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
  link: [{ rel: "canonical", href: "https://saubolmed.kz/" }],
});
</script>

<template>
  <div class="pt-0 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" />
      <h1 class="text-4xl md:text-6xl font-semibold text-mainColor mb-7">
        Заявка на регистрацию
      </h1>
      <div v-if="!pending">
        <div class="flex gap-5">
          <form @submit.prevent="sendForm" class="w-full md:w-3/4">
            <div
              style="box-shadow: 0px 4px 20px 0px #0000001a"
              class="bg-white rounded-lg py-5 px-4 flex flex-wrap justify-between mb-5"
            >
              <div class="w-full md:w-half mb-5">
                <p class="text-sm mb-2">
                  ФИО <span class="text-red-500">*</span>
                </p>
                <input
                  v-model="form.name"
                  :class="{ 'border-red-500': v$.name.$error }"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите ФИО"
                />
                <p v-if="v$.name.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full md:w-half mb-5">
                <p class="text-sm mb-2">
                  ИИН <span class="text-red-500">*</span>
                </p>
                <input
                  v-model="form.iin"
                  :class="{ 'border-red-500': v$.iin.$error }"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите ИИН"
                />
                <p v-if="v$.iin.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full md:w-half mb-5">
                <p class="text-sm mb-2">
                  Телефон <span class="text-red-500">*</span>
                </p>
                <input
                  v-model="form.phone_number"
                  data-maska="+7 (###) ###-##-##"
                  v-maska
                  :class="{ 'border-red-500': v$.phone_number.$error }"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите телефон"
                />
                <p v-if="v$.phone_number.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full md:w-half mb-5">
                <p class="text-sm mb-2">
                  Email <span class="text-red-500">*</span>
                </p>
                <input
                  v-model="form.email"
                  :class="{ 'border-red-500': v$.email.$error }"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите email"
                />
                <p v-if="v$.email.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full mb-5">
                <p class="text-sm mb-2">
                  Профиль работы <span class="text-red-500">*</span>
                </p>
                <div class="flex">
                  <div class="w-full md:w-1/4 flex gap-3">
                    <input
                      value="2"
                      v-model="form.role_id"
                      :class="{ 'border border-red-500': v$.role_id.$error }"
                      type="radio"
                      name="role"
                      class="w-6 h-6"
                    />
                    <p>Врач</p>
                  </div>
                  <div class="w-full md:w-1/4 flex gap-3">
                    <input
                      v-model="form.role_id"
                      :class="{ 'border border-red-500': v$.role_id.$error }"
                      value="3"
                      type="radio"
                      name="role"
                      class="w-6 h-6"
                    />
                    <p>Медсестра</p>
                  </div>
                  <p v-if="v$.role_id.$error" class="text-red-500 text-xs">
                    Пожалуйста заполните данное поле
                  </p>
                </div>
              </div>
              <div class="w-full mb-5">
                <p class="text-sm mb-2">
                  Доступные услуги <span class="text-red-500">*</span>
                </p>
                <div class="flex">
                  <div class="w-full md:w-1/4 flex gap-3">
                    <input
                      @change="setServices(1)"
                      :class="{ 'border border-red-500': v$.role_id.$error }"
                      type="checkbox"
                      name="services"
                      class="w-6 h-6"
                    />
                    <p>Консультация</p>
                  </div>
                  <div class="w-full md:w-1/4 flex gap-3">
                    <input
                      @change="setServices(2)"
                      :class="{ 'border border-red-500': v$.role_id.$error }"
                      type="checkbox"
                      name="services"
                      class="w-6 h-6"
                    />
                    <p>Выезд на дом</p>
                  </div>
                  <p v-if="v$.role_id.$error" class="text-red-500 text-xs">
                    Пожалуйста заполните данное поле
                  </p>
                </div>
              </div>
              <div v-if="form.role_id === '2'" class="mb-5 w-full">
                <div class="mb-5 flex items-center justify-between">
                  <p class="text-xl font-bold">
                    График работы <span class="text-red-500">*</span>
                  </p>
                  <select
                    v-model="form.schedule.duration"
                    class="p-3 border w-max rounded-lg"
                    name=""
                    id=""
                  >
                    <option :value="15">15 мин</option>
                    <option :value="30">30 мин</option>
                    <option :value="45">45 мин</option>
                  </select>
                </div>
                <p class="font-medium bg-[#ffe7e7] py-1 px-4 mb-5 rounded">
                  Дни приема
                </p>
                <div class="flex flex-col md:flex-row gap-3 mb-5">
                  <div
                    v-for="(day, index) of days"
                    :key="index"
                    @click="addDay(day)"
                    :class="{
                      'bg-mainColor text-white': form.schedule.days.some(
                        (scheduleDay) =>
                          scheduleDay.weekday_number === day.value
                      ),
                    }"
                    class="w-full py-3 border border-[#ECECEC] rounded text-center cursor-pointer transition-all"
                  >
                    {{ day.title }}
                  </div>
                </div>
                <p class="font-medium bg-[#ffe7e7] py-1 px-4 mb-5 rounded">
                  Время приема
                </p>
                <div class="flex flex-wrap gap-1 md:gap-2">
                  <p
                    v-for="(item, index) of periods"
                    :key="index"
                    @click="times.push(item)"
                    :class="{
                      'bg-mainColor text-white': times.some(
                        (time) =>
                          time.start === item.start && time.end === item.end
                      ),
                    }"
                    class="cursor-pointer w-third md:w-fifth transition-all border border-[#ECECEC] rounded text-center py-2 bg-[#F6F6F7] text-[#9A9BA4]"
                  >
                    {{ item.start }} - {{ item.end }}
                  </p>
                </div>
              </div>
              <div class="w-full mb-6">
                <p class="text-sm mb-2">
                  Специализация <span class="text-red-500">*</span>
                </p>
                <select
                  v-model="form.specialization_id"
                  :class="{ 'border-red-500': v$.specialization_id.$error }"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                >
                  <option :value="null">Выберите специализацию</option>
                  <option
                    v-for="(it, ind) of resultSpecs"
                    :key="ind"
                    :value="it.id"
                  >
                    {{ it.name }}
                  </option>
                </select>
                <p
                  v-if="v$.specialization_id.$error"
                  class="text-red-500 text-xs"
                >
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="w-full md:w-half mb-6">
                <div class="flex justify-between items-center w-full mb-3">
                  <p class="text-sm">
                    Детали специализации <span class="text-red-500">*</span>
                  </p>
                  <div
                    @click="addSpecDetail"
                    class="bg-mainColor text-white py-2 md:py-1 p-1 rounded-md cursor-pointer flex justify-center"
                  >
                    <IconPlus />
                  </div>
                </div>
                <div
                  v-for="(item, index) of form.specialization_details"
                  :key="index"
                  :class="{
                    'mb-3': form.specialization_details.length - 1 !== index,
                  }"
                  class="block md:flex gap-3 items-center"
                >
                  <div class="w-full mb-3 md:mb-0">
                    <input
                      type="text"
                      v-model="form.specialization_details[index]"
                      class="p-3 border w-full rounded-lg"
                      placeholder="Введите деталь"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style="box-shadow: 0px 4px 20px 0px #0000001a"
              class="bg-white rounded-lg py-5 px-4 mb-5"
            >
              <div class="block md:flex gap-5 mb-6">
                <div class="w-full md:w-1/2 mb-8 md:mb-0">
                  <div class="flex justify-between items-center mb-2">
                    <p>Диплом <span class="text-red-500">*</span></p>
                  </div>
                  <div v-if="diplomaFiles.length > 0">
                    <div
                      v-for="(item, index) of diplomaFiles"
                      :key="index"
                      class="flex justify-between"
                    >
                      <div
                        class="w-full bg-[#ffe7e7] rounded-md px-3 py-2 flex justify-between items-center gap-3"
                      >
                        <img
                          class="w-max"
                          src="@/assets/img/attachment.png"
                          alt=""
                        />
                        <div class="w-full flex justify-between text-xs">
                          <p>{{ item.name }}</p>
                          <p class="text-[#9A9BA4]">{{ item.size }} KB</p>
                        </div>
                        <IconX
                          class="text-[#9A9BA4] cursor-pointer"
                          size="24"
                        />
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-red-500 text-sm">
                    В данный момент файлов нет
                  </p>
                  <input
                    ref="fileInput"
                    class="mt-5"
                    @change="importLocal"
                    type="file"
                  />
                </div>
                <div class="w-full md:w-1/2 mb-8 md:mb-0">
                  <div class="flex justify-between items-center mb-2">
                    <p>Сертификаты <span class="text-red-500">*</span></p>
                  </div>
                  <div v-if="sertificateFiles.length > 0">
                    <div
                      v-for="(item, index) of sertificateFiles"
                      :key="index"
                      class="flex justify-between"
                    >
                      <div
                        class="w-full bg-[#ffe7e7] rounded-md px-3 py-2 flex justify-between items-center gap-3"
                      >
                        <img
                          class="w-max"
                          src="@/assets/img/attachment.png"
                          alt=""
                        />
                        <div class="w-full flex justify-between text-xs">
                          <p>{{ item.name }}</p>
                          <p class="text-[#9A9BA4]">{{ item.size }} KB</p>
                        </div>
                        <IconX
                          class="text-[#9A9BA4] cursor-pointer"
                          size="24"
                        />
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-red-500 text-sm">
                    В данный момент файлов нет
                  </p>
                  <input
                    ref="fileInputSert"
                    class="mt-5"
                    @change="importLocalSert"
                    type="file"
                  />
                </div>
              </div>
              <div class="block md:flex items-center gap-5 mb-6">
                <p>Стаж работы (лет) <span class="text-red-500">*</span></p>
                <div class="flex gap-2">
                  <div
                    class="bg-mainColor text-white p-1 rounded-md cursor-pointer"
                  >
                    <IconMinus @click="form.experience = form.experience - 1" />
                  </div>
                  <input
                    v-model="form.experience"
                    :class="{ 'border-red-500': v$.experience.$error }"
                    type="text"
                    class="bg-[#ffe7e7] rounded-md w-14 text-center"
                  />
                  <div
                    class="bg-mainColor text-white p-1 rounded-md cursor-pointer"
                  >
                    <IconPlus @click="form.experience = form.experience + 1" />
                  </div>
                </div>
                <p v-if="v$.experience.$error" class="text-red-500 text-xs">
                  Пожалуйста заполните данное поле
                </p>
              </div>
              <div class="mb-6">
                <div class="flex items-center justify-end mb-5">
                  <div
                    @click="addJobPlace"
                    class="cursor-pointer flex justify-center gap-3"
                  >
                    <p class="text-mainColor">Добавить место работы</p>
                    <IconPlus
                      class="bg-mainColor text-white py-2 md:py-1 p-1 rounded-md"
                    />
                  </div>
                </div>
                <div
                  v-for="(item, index) of form.job_places"
                  :key="index"
                  :class="{ 'mb-3': form.job_places.length - 1 !== index }"
                  class="block md:flex gap-3 items-end"
                >
                  <div class="w-full md:w-1/2 mb-3 md:mb-0">
                    <p class="mb-2">
                      Место работы <span class="text-red-500">*</span>
                    </p>
                    <select
                      v-model="item.id"
                      type="text"
                      class="p-3 border w-full rounded-lg"
                    >
                      <option :value="null">Выберите место работы</option>
                      <option
                        v-for="(it, ind) of result"
                        :key="ind"
                        :value="it.id"
                      >
                        {{ it.full_name }}
                      </option>
                    </select>
                  </div>
                  <div class="w-full md:w-1/2 mb-3 md:mb-0 flex gap-3">
                    <div class="w-1/2">
                      <p class="mb-2">
                        Старт работы <span class="text-red-500">*</span>
                      </p>
                      <input
                        v-model="item.start"
                        type="date"
                        class="p-3 border w-full rounded-lg"
                      />
                    </div>
                    <div class="w-1/2">
                      <p class="mb-2">
                        Конец работы <span class="text-red-500">*</span>
                      </p>
                      <input
                        v-model="item.end"
                        type="date"
                        class="p-3 border w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="bg-mainColor text-white px-10 py-2 rounded-lg"
              >
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
