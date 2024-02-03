<script setup>
const props = defineProps({
  doctor: Object,
  required: true
})
</script>

<template>
  <div>
    <div
        class="w-full bg-white rounded-lg p-5"
        style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
    >
      <div class="flex items-center mb-4 gap-5">
        <img
            v-if="props.doctor.user.img"
            class="rounded-md h-full w-[130px]"
            :src="props.doctor.user.img"
            alt=""
        >
        <div v-else>
          <img
              v-if="props.doctor.is_female"
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
        <div>
          <p class="text-sm lg:text-xl font-semibold mb-3">
            {{ props.doctor.user.name }}
          </p>
          <p class="text-mainColor font-semibold mb-2">
            {{ props.doctor.specialization.name }}
          </p>
          <!--          <p class="text-mainColor font-semibold mb-3 text-xs">-->
          <!--            {{ props.doctor.job.name }}-->
          <!--          </p>-->
          <p class="w-max py-1 lg:py-2 px-5 bg-mainColor rounded text-white">
            Стаж {{ props.doctor.experience }} лет
          </p>
        </div>
      </div>
      <div class="block lg:flex justify-between gap-4 mb-4">
        <div class="w-full lg:w-3/5 mb-3 lg:mb-0">
          <p class="text-sm lg:text-base mb-1">
            Дни приема:
          </p>
          <div class="flex justify-between">
            <div
                @click=""
                v-for="(it, ind) of props.doctor.schedule"
                :key="ind"
                class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
              <p class="text-xs">
                {{ it.date }}
              </p>
              <p class="uppercase">
                {{ it.dayOfWeek }}
              </p>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-2/5">
          <p class="mb-1">
            Время
          </p>
          <select class="px-3 py-3 border rounded-lg w-full">
            <option value=""></option>
          </select>
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
          <button class="border border-mainColor text-sm w-full lg:w-2/5 block rounded-lg text-mainColor py-2 lg:py-0">
            Добавить новый адрес
          </button>
        </div>
      </div>
      <button class="w-full py-3 rounded-lg text-white bg-mainColor text-center mb-3">
        В корзину
      </button>
      <NuxtLink
          :to="'/services/doctors/' + props.doctor.id"
          class="block w-full py-3 rounded-lg text-mainColor bg-white text-center border-mainColor border">
        Перейти к доктору
      </NuxtLink>
    </div>
  </div>
</template>