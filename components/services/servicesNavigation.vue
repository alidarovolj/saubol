<script lang="ts" setup>
import {IconMicroscope, IconNurse, IconStethoscope, IconWheelchair,} from "@tabler/icons-vue";

const route = useRoute();
</script>

<template>
  <div class="overflow-x-auto flex justify-between mb-7">
    <NuxtLink
        class="flex w-max md:w-fourth relative cursor-pointer mr-5 md:mr-0"
        to="/services/doctors"
    >
      <div
          :class="{
          '!bg-white !text-mainColor':
            route.fullPath.includes('/services/doctors'),
        }"
          class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconStethoscope
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
          :class="{
          '!bg-mainColor !text-white':
            route.fullPath.includes('/services/doctors'),
        }"
          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
      >
        <h2
            class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Доктор
        </h2>
      </div>
    </NuxtLink>
    <NuxtLink
        class="flex w-max md:w-fourth relative cursor-pointer mr-5 md:mr-0"
        to="/services/med-services"
    >
      <div
          :class="{
          '!bg-white !text-mainColor': route.fullPath.includes(
            '/services/med-services'
          ),
        }"
          class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconNurse
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
          :class="{
          '!bg-mainColor !text-white': route.fullPath.includes(
            '/services/med-services'
          ),
        }"
          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
      >
        <h2
            class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Мед-услуги
        </h2>
      </div>
    </NuxtLink>
    <NuxtLink
        class="flex w-max md:w-fourth relative cursor-pointer mr-5 md:mr-0"
        to="/services/inventory"
    >
      <div
          :class="{
          '!bg-white !text-mainColor': route.fullPath.includes(
            '/services/inventory'
          ),
        }"
          class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconWheelchair
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
          :class="{
          '!bg-mainColor !text-white': route.fullPath.includes(
            '/services/inventory'
          ),
        }"
          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
      >
        <h2
            class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Аренда
        </h2>
      </div>
    </NuxtLink>
    <NuxtLink
        class="flex w-max md:w-fourth relative cursor-pointer"
        to="/services/tests"
    >
      <div
          :class="{
          '!bg-white !text-mainColor':
            route.fullPath.includes('/services/tests'),
        }"
          class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconMicroscope
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
          :class="{
          '!bg-mainColor !text-white':
            route.fullPath.includes('/services/tests'),
        }"
          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
      >
        <h2
            class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Сдача анализов
        </h2>
      </div>
    </NuxtLink>
  </div>
</template>
