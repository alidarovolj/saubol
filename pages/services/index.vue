<script setup>
import {
  IconStethoscope,
  IconNurse,
  IconVaccine,
  IconMicroscope,
  IconDisabled,
} from "@tabler/icons-vue";

const route = useRoute();

const links = ref([
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Услуги",
    link: "/services",
  },
]);

useHead({
  title: "Услуги | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Услуги | SaubolMed",
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
      <Breadcrumbs :links="links" class="mb-5" />
      <div class="w-full">
        <h2 class="text-xl font-semibold mb-4">Услуги</h2>
        <div
          class="flex flex-wrap justify-between md:flex-nowrap md:gap-4 mb-4"
        >
          <NuxtLink
            to="/services/med-services"
            class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
          >
            <div class="w-max bg-[#0065FF] rounded-lg text-white">
              <IconNurse size="20" class="m-3" />
            </div>
            <p class="font-semibold">Мед услуги</p>
            <img
              class="absolute right-0 bottom-0"
              src="@/assets/img/servicesVectors/1.png"
              alt=""
            />
          </NuxtLink>
          <NuxtLink
            to="/services/doctors"
            class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
          >
            <div class="w-max bg-[#FEAA48] rounded-lg text-white">
              <IconStethoscope size="20" class="m-3" />
            </div>
            <p class="font-semibold">Запись к врачу</p>
            <img
              class="absolute right-0 bottom-0"
              src="@/assets/img/servicesVectors/2.png"
              alt=""
            />
          </NuxtLink>
          <NuxtLink
            to="/services/tests"
            class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
          >
            <div class="w-max bg-[#FD586B] rounded-lg text-white">
              <IconMicroscope size="20" class="m-3" />
            </div>
            <p class="font-semibold">Анализы</p>
            <img
              class="absolute right-0 bottom-0"
              src="@/assets/img/servicesVectors/3.png"
              alt=""
            />
          </NuxtLink>
          <NuxtLink
            to="/services/inventory"
            class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
          >
            <div class="w-max bg-[#CF0CE0] rounded-lg text-white">
              <IconDisabled size="20" class="m-3" />
            </div>
            <p class="font-semibold">Аренда инвентаря</p>
            <img
              class="absolute right-0 bottom-0"
              src="@/assets/img/servicesVectors/4.png"
              alt=""
            />
          </NuxtLink>
          <NuxtLink
            to="/services/detox"
            class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
          >
            <div class="w-max bg-[#0CE07A] rounded-lg text-white">
              <IconVaccine size="20" class="m-3" />
            </div>
            <p class="font-semibold">Детокс</p>
            <img
              class="absolute right-0 bottom-0"
              src="@/assets/img/servicesVectors/5.png"
              alt=""
            />
          </NuxtLink>
        </div>
        <BannersCarousel />
      </div>
    </div>
  </div>
</template>
