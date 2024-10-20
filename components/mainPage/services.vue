<script setup>
import {
  IconStethoscope,
  IconNurse,
  IconVaccine,
  IconMicroscope,
} from "@tabler/icons-vue";
import img1 from "~/assets/img/mainPage/services/1.png";
import img2 from "~/assets/img/mainPage/services/2.png";
import img3 from "~/assets/img/mainPage/services/3.png";
import img4 from "~/assets/img/mainPage/services/4.png";
import img5 from "~/assets/img/mainPage/services/5.png";

const services = ref([
  {
    title: "Доктор",
    link: "/services/doctors",
    image: img1,
    icon: IconStethoscope,
  },
  {
    title: "Медсестра",
    link: "/services/med-services",
    image: img2,
    icon: IconNurse,
  },
  {
    title: "Процедуры детокс",
    link: "/services/detox",
    image: img3,
    icon: IconVaccine,
  },
  {
    title: "Сдать анализы",
    link: "/services/tests",
    image: img4,
    icon: IconMicroscope,
  },
  {
    title: "Посмотреть все Услуги",
    link: "/services",
    image: img5,
    icon: null,
  },
]);
</script>

<template>
  <div class="container mx-auto px-4 md:px-0">
    <div class="flex flex-wrap justify-between relative z-10 mb-5">
      <NuxtLink
        :to="item.link"
        v-for="(item, index) of services"
        :key="index"
        class="w-half md:w-fifth flex flex-col md:flex-row justify-between rounded-2xl mb-3 hover:!shadow-2xl transition-all cursor-pointer"
        :class="{ '!w-full md:!w-fifth': services.length - 1 === index }"
        style="box-shadow: 0px 4px 10px 0px rgba(57, 121, 245, 0.25)"
      >
        <div
          class="hidden md:flex bg-mainColor text-white rounded-tl-2xl rounded-bl-2xl py-4 pl-7 pr-4 w-max"
        >
          <p class="vertical-text">{{ item.title }}</p>
        </div>
        <div
          class="w-full relative rounded-tr-2xl md:rounded-br-2xl rounded-tl-2xl md:rounded-tl-none h-full max-h-40 md:max-h-none"
        >
          <img
            class="w-full object-cover h-full rounded-tr-2xl md:rounded-br-2xl rounded-tl-2xl md:rounded-tl-none"
            :src="item.image"
            alt=""
          />
          <div
            class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          >
            <component
              :is="item.icon"
              class="text-white w-8 md:w-12 h-8 md:h-12 bg-mainColor rounded-full absolute top-2 md:top-auto md:bottom-4 left-2 md:left-auto md:right-7 p-1"
              style="filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.25))"
            />
          </div>
        </div>
        <div
          class="block md:hidden bg-mainColor text-white rounded-bl-2xl rounded-br-2xl py-4 pl-7 pr-4 w-full text-xs"
        >
          <p class="mb-2">{{ item.title }}</p>
          <p v-if="services.length - 1 === index">
            Ваше здоровье на первом месте! Saubol предоставляет все медицинские
            услуги прямо у вас дома. Просто позвоните, и наши профессионалы
            обеспечат вас качественным медицинским обслуживанием без лишних
            хлопот. Заботьтесь о себе, не выходя из дома с Saubol
          </p>
        </div>
      </NuxtLink>
    </div>
    <div class="set-bg text-white rounded-xl relative">
      <img
        class="w-full h-full absolute left-0 top-0 object-cover rounded-xl z-20"
        src="@/assets/img/mainPage/tip-bg.png"
        alt=""
      />
      <div
        class="w-full h-full absolute left-0 top-0 bg-mainColor rounded-xl z-10"
      ></div>
      <p class="hidden md:block text-xl py-7 relative z-30 px-14 text-2xs">
        Ваше здоровье на первом месте! Saubol предоставляет все медицинские
        услуги прямо у вас дома. Просто позвоните, и наши профессионалы
        обеспечат вас качественным медицинским обслуживанием без лишних хлопот.
        Заботьтесь о себе, не выходя из дома с Saubol
      </p>
    </div>
  </div>
</template>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
