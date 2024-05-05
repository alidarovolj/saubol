<script setup>
import {IconNurse, IconStethoscope, IconMicroscope, IconDisabled, IconVaccine, IconFileSearch} from "@tabler/icons-vue"
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="block lg:flex items-start gap-6">
        <div class="w-full lg:w-3/4">
          <h2 class="text-xl font-semibold mb-4">
            Услуги
          </h2>
          <div class="flex flex-wrap justify-between lg:flex-nowrap lg:gap-4 mb-4">
            <NuxtLink
                to="/services/med-services"
                class="mb-1 lg:mb-0 relative h-[228px] w-half lg:w-full border rounded-lg p-5 flex flex-col justify-between">
              <div class="w-max bg-[#0065FF] rounded-lg text-white">
                <IconNurse size="20" class="m-3"/>
              </div>
              <p class="font-semibold">
                Мед услуги
              </p>
              <img
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/1.png"
                  alt="">
            </NuxtLink>
            <NuxtLink
                to="/services/doctors"
                class="mb-1 lg:mb-0 relative h-[228px] w-half lg:w-full border rounded-lg p-5 flex flex-col justify-between">
              <div class="w-max bg-[#FEAA48] rounded-lg text-white">
                <IconStethoscope size="20" class="m-3"/>
              </div>
              <p class="font-semibold">
                Запись к врачу
              </p>
              <img
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/2.png"
                  alt="">
            </NuxtLink>
            <NuxtLink
                to="/services/tests"
                class="mb-1 lg:mb-0 relative h-[228px] w-half lg:w-full border rounded-lg p-5 flex flex-col justify-between">
              <div class="w-max bg-[#FD586B] rounded-lg text-white">
                <IconMicroscope size="20" class="m-3"/>
              </div>
              <p class="font-semibold">
                Анализы
              </p>
              <img
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/3.png"
                  alt="">
            </NuxtLink>
            <NuxtLink
                to="/services/inventory"
                class="mb-1 lg:mb-0 relative h-[228px] w-half lg:w-full border rounded-lg p-5 flex flex-col justify-between">
              <div class="w-max bg-[#CF0CE0] rounded-lg text-white">
                <IconDisabled size="20" class="m-3"/>
              </div>
              <p class="font-semibold">
                Аренда инвентаря
              </p>
              <img
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/4.png"
                  alt="">
            </NuxtLink>
            <NuxtLink
                to="/services/detox"
                class="mb-1 lg:mb-0 relative h-[228px] w-half lg:w-full border rounded-lg p-5 flex flex-col justify-between">
              <div class="w-max bg-[#0CE07A] rounded-lg text-white">
                <IconVaccine size="20" class="m-3"/>
              </div>
              <p class="font-semibold">
                Детокс
              </p>
              <img
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/5.png"
                  alt="">
            </NuxtLink>
          </div>
          <BannersCarousel/>
        </div>
        <div class="w-full lg:w-1/4">
          <div class="p-5 border rounded-lg mb-6">
            <p class="text-2xl font-bold text-mainColor mb-5">
              Записи к услугам
            </p>
            <div class="py-16">
              <IconFileSearch
                  size="140"
                  class="text-[#DFDFDF] mx-auto"
              />
              <p class="text-[#DFDFDF] text-center">
                У вас пока нет записей
              </p>
            </div>
          </div>
          <div class="p-5 border rounded-lg">
            <p class="text-2xl font-bold text-mainColor mb-5">
              Результаты анализов
            </p>
            <div class="py-16">
              <IconMicroscope
                  size="140"
                  class="text-[#DFDFDF] mx-auto"
              />
              <p class="text-[#DFDFDF] text-center">
                У вас пока нет результатов
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>