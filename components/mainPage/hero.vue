<script setup>
import {
  IconStethoscope,
  IconArrowRight,
  IconNurse,
  IconMicroscope,
  IconVaccine,
} from "@tabler/icons-vue";

let intervalId;

const imgClass = ref("w-10 h-10");

onMounted(() => {
  intervalId = setInterval(() => {
    imgClass.value = imgClass.value === "w-10 h-10" ? "w-14 h-14" : "w-14 h-10";
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="relative">
    <div class="container mx-auto px-4 md:px-0 relative z-10">
      <div class="block md:flex justify-between py-9 md:py-36 md:pb-0">
        <div class="w-full md:w-1/2 mb-20 md:mb-0">
          <div
            class="text-3xl md:text-6xl font-semibold md:font-normal mb-7 md:mb-24"
          >
            <div
              class="flex justify-center md:justify-start items-center gap-2"
            >
              <p>Забота</p>
              <div
                class="flex items-center justify-center w-9 md:w-14 h-9 md:h-14"
              >
                <img
                  :class="imgClass"
                  class="transition-all"
                  src="@/assets/img/logo.png"
                  alt=""
                />
              </div>
              <p>о</p>
              <br />
            </div>
            <p class="text-center md:text-start">
              вашем здоровье с <span class="text-mainColor">Saubol</span>
            </p>
          </div>
          <p
            class="mb-6 text-base md:text-2xl w-full md:w-3/4 text-center md:text-start"
          >
            Профессиональные медицинские специалисты привезут заботу о вашем
            здоровье прямо к вам домой
          </p>
          <NuxtLink
            to="/"
            class="bg-mainColor !text-white font-semibold py-3 px-20 w-full md:w-max block rounded-lg text-center"
          >
            Заказать услугу
          </NuxtLink>
        </div>
        <div class="w-full md:w-half flex gap-6 overflow-x-auto">
          <div class="w-full flex flex-row md:flex-col gap-6">
            <div class="w-full">
              <NuxtLink
                to="/services/doctors"
                class="cardHover block w-[164px] md:w-full relative h-[230px] md:h-[350px]"
              >
                <img
                  class="w-full rounded-lg h-full object-cover"
                  src="@/assets/img/mainPage/services/1.png"
                  alt=""
                />
                <div
                  class="cardBlock bg-[#FEAA48] p-2 md:p-4 rounded-lg text-white absolute"
                >
                  <IconStethoscope class="w-5 md:w-8 h-5 md:h-8" />
                  <div class="showOnHover w-full">
                    <p class="text-2xl font-semibold mb-5">Запись к врачу</p>
                    <div class="flex justify-between items-center">
                      <p class="">Подробнее</p>
                      <IconArrowRight size="20" />
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="w-full">
              <NuxtLink
                to="/services/med-services"
                class="cardHover block w-[164px] md:w-full relative h-[230px] md:h-[350px]"
              >
                <img
                  class="w-full rounded-lg h-full object-cover"
                  src="@/assets/img/mainPage/services/2.png"
                  alt=""
                />
                <div
                  class="cardBlock bg-[#0065FF] p-2 md:p-4 rounded-lg text-white absolute"
                >
                  <IconNurse class="w-5 md:w-8 h-5 md:h-8" />
                  <div class="showOnHover w-full">
                    <p class="text-2xl font-semibold mb-5">Мед услуги</p>
                    <div class="flex justify-between items-center">
                      <p class="">Подробнее</p>
                      <IconArrowRight size="20" />
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="w-full flex flex-row md:flex-col gap-6 mt-0">
            <div class="w-full">
              <NuxtLink
                to="/services/tests"
                class="cardHover block w-[164px] md:w-full relative h-[230px] md:h-[350px]"
              >
                <img
                  class="w-full rounded-lg h-full object-cover"
                  src="@/assets/img/mainPage/services/3.png"
                  alt=""
                />
                <div
                  class="cardBlock bg-[#FD586B] p-2 md:p-4 rounded-lg text-white absolute"
                >
                  <IconMicroscope class="w-5 md:w-8 h-5 md:h-8" />
                  <div class="showOnHover w-full">
                    <p class="text-2xl font-semibold mb-5">Анализы</p>
                    <div class="flex justify-between items-center">
                      <p class="">Подробнее</p>
                      <IconArrowRight size="20" />
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="w-full">
              <NuxtLink
                to="/services/detox"
                class="cardHover block w-[164px] md:w-full relative h-[230px] md:h-[350px]"
              >
                <img
                  class="w-full rounded-lg h-full object-cover"
                  src="@/assets/img/mainPage/services/1.png"
                  alt=""
                />
                <div
                  class="cardBlock bg-[#0CE07A] p-2 md:p-4 rounded-lg text-white absolute"
                >
                  <IconVaccine class="w-5 md:w-8 h-5 md:h-8" />
                  <div class="showOnHover w-full">
                    <p class="text-2xl font-semibold mb-5">Детокс</p>
                    <div class="flex justify-between items-center">
                      <p class="">Подробнее</p>
                      <IconArrowRight size="20" />
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardHover {
  transition: all 0.3s;
  cursor: pointer;
}

.cardBlock {
  top: 20px;
  left: 20px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.cardHover:hover .cardBlock {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  top: 0;
  left: 0;
}

.showOnHover {
  display: none;
  opacity: 0;
}

.cardHover:hover .showOnHover {
  display: block;
  opacity: 1;
  transition: all 1s;
}
</style>
