<script setup>
import {IconDisabled, IconMicroscope, IconNurse, IconStethoscope, IconVaccine,} from "@tabler/icons-vue";

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
  link: [{rel: "canonical", href: "https://saubolmed.kz/"}],
});
</script>

<template>
  <div class="pt-4 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" class="mb-5"/>
      <div class="w-full">
        <h2 class="text-xl font-semibold mb-4">Услуги</h2>
        <div
            class="flex flex-wrap justify-between md:flex-nowrap md:gap-4 mb-4"
        >
          <NuxtLink
              class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
              to="/services/med-services"
          >
            <div class="w-max bg-[#0065FF] rounded-lg text-white">
              <IconNurse class="m-3" size="20"/>
            </div>
            <p class="font-semibold">Мед услуги</p>
            <img
                alt=""
                class="absolute right-0 bottom-0"
                src="@/assets/img/servicesVectors/1.png"
            />
          </NuxtLink>
          <NuxtLink
              class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
              to="/services/doctors"
          >
            <div class="w-max bg-[#FEAA48] rounded-lg text-white">
              <IconStethoscope class="m-3" size="20"/>
            </div>
            <p class="font-semibold">Запись к врачу</p>
            <img
                alt=""
                class="absolute right-0 bottom-0"
                src="@/assets/img/servicesVectors/2.png"
            />
          </NuxtLink>
          <NuxtLink
              class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
              to="/services/tests"
          >
            <div class="w-max bg-[#FD586B] rounded-lg text-white">
              <IconMicroscope class="m-3" size="20"/>
            </div>
            <p class="font-semibold">Анализы</p>
            <img
                alt=""
                class="absolute right-0 bottom-0"
                src="@/assets/img/servicesVectors/3.png"
            />
          </NuxtLink>
          <NuxtLink
              class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
              to="/services/inventory"
          >
            <div class="w-max bg-[#CF0CE0] rounded-lg text-white">
              <IconDisabled class="m-3" size="20"/>
            </div>
            <p class="font-semibold">Аренда инвентаря</p>
            <img
                alt=""
                class="absolute right-0 bottom-0"
                src="@/assets/img/servicesVectors/4.png"
            />
          </NuxtLink>
          <NuxtLink
              class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
              to="/services/detox"
          >
            <div class="w-max bg-[#0CE07A] rounded-lg text-white">
              <IconVaccine class="m-3" size="20"/>
            </div>
            <p class="font-semibold">Детокс</p>
            <img
                alt=""
                class="absolute right-0 bottom-0"
                src="@/assets/img/servicesVectors/5.png"
            />
          </NuxtLink>
        </div>
        <BannersCarousel/>
      </div>
    </div>
  </div>
</template>
