<script setup lang="ts">
import {
  IconMicroscope,
  IconNurse,
  IconStethoscope,
  IconWheelchair,
} from "@tabler/icons-vue";

const route = useRoute();
</script>

<template>
  <div class="overflow-x-auto flex justify-between mb-7">
    <NuxtLink
      to="/services/doctors"
      class="flex w-max md:w-fourth relative cursor-pointer mr-5 md:mr-0"
    >
      <div
        class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
        :class="{
          '!bg-white !text-mainColor':
            route.fullPath.includes('/services/doctors'),
        }"
        style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconStethoscope
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
        :class="{
          '!bg-mainColor !text-white':
            route.fullPath.includes('/services/doctors'),
        }"
      >
        <h2
          class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Доктор
        </h2>
      </div>
    </NuxtLink>
    <NuxtLink
      to="/services/med-services"
      class="flex w-max md:w-fourth relative cursor-pointer mr-5 md:mr-0"
    >
      <div
        class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
        :class="{
          '!bg-white !text-mainColor': route.fullPath.includes(
            '/services/med-services'
          ),
        }"
        style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconNurse
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
        :class="{
          '!bg-mainColor !text-white': route.fullPath.includes(
            '/services/med-services'
          ),
        }"
      >
        <h2
          class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Мед-услуги
        </h2>
      </div>
    </NuxtLink>
    <NuxtLink
      to="/services/inventory"
      class="flex w-max md:w-fourth relative cursor-pointer mr-5 md:mr-0"
    >
      <div
        class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
        :class="{
          '!bg-white !text-mainColor': route.fullPath.includes(
            '/services/inventory'
          ),
        }"
        style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconWheelchair
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
        :class="{
          '!bg-mainColor !text-white': route.fullPath.includes(
            '/services/inventory'
          ),
        }"
      >
        <h2
          class="text-sm md:text-2xl font-semibold whitespace-nowrap md:whitespace-normal"
        >
          Аренда
        </h2>
      </div>
    </NuxtLink>
    <NuxtLink
      to="/services/tests"
      class="flex w-max md:w-fourth relative cursor-pointer"
    >
      <div
        class="min-w-8 md:min-w-12 w-8 md:w-12 min-h-8 md:min-h-12 h-8 md:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
        :class="{
          '!bg-white !text-mainColor':
            route.fullPath.includes('/services/tests'),
        }"
        style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15))"
      >
        <IconMicroscope
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 md:h-12 min-h-8 md:min-h-12 text-mainColor px-12 md:px-0"
        :class="{
          '!bg-mainColor !text-white':
            route.fullPath.includes('/services/tests'),
        }"
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
