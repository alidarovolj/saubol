<script setup>
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconChevronRight, IconChevronLeft} from "@tabler/icons-vue";
import img1 from "@/assets/img/landing/1.png"
import img2 from "@/assets/img/landing/2.png"
import img3 from "@/assets/img/landing/3.png"
import img4 from "@/assets/img/landing/4.png"

const myCarousel = ref(null);

const slides = ref([
  {
    title: "Искусственный интеллект",
    content: "Используется искусственный интеллект для анализа данных и предоставления персонализированных рекомендаций по вашему здоровью.",
    img: img1
  },
  {
    title: "Комфорт и удобство",
    content: "Получайте медицинскую помощь прямо у себя дома или в офисе, минуя неудобные поездки в больницу.",
    img: img2
  },
  {
    title: "Индивидуальный подход",
    content: "Наши специалисты предоставляют персонализированные услуги, учитывая ваши уникальные потребности.",
    img: img3
  },
  {
    title: "Экономия времени",
    content: "Избегайте длительных очередей и ожиданий на приеме, получая услуги на месте, где вам удобно",
    img: img4
  },
]);

const breakpoints = ref({
  700: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
});
</script>

<template>
  <div class="py-10 mb-20">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="bg-[#F7FAFF] p-7 rounded-3xl">
        <div class="block lg:flex items-center">
          <div class="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div class="text-4xl leading-10">
              <p class="mb-2">
                <span class="text-mainColor">Путь к</span> лучшему
              </p>
              <p class="mb-2">
                <span class="text-mainColor">здоровью</span> начинается <br>
              </p>
              <div class="flex gap-2">
                <p class="text-mainColor">здесь</p>
                <img src="@/assets/img/logo.png" alt="">
              </div>
            </div>
            <p class="text-sm my-9">
              Наслаждайтесь уникальными преимуществами нашего персонализированного подхода к вашему здоровью. Мы стремимся к вашему комфорту и благополучию, предлагая индивидуальные решения, которые соответствуют вашим потребностям.
            </p>
            <div class="flex gap-4">
              <a href="#">
                <IconBrandLinkedin class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>
              </a>
              <a href="#">
                <IconBrandFacebook class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>
              </a>
              <a href="#">
                <IconBrandTwitter class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>
              </a>
              <a href="#">
                <IconBrandInstagram class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>
              </a>
            </div>
          </div>
          <div v-if="slides" class="w-full lg:w-1/2">
            <client-only>
              <my-carousel-carousel
                  ref="myCarousel"
                  :mouse-drag="true"
                  :loop="true"
                  :wrap-around="true"
                  :breakpoints="breakpoints">
                <my-carousel-slide v-for="(item, index) in slides" :key="index">
                  <img
                      class="w-1/3 rounded-l-2xl"
                      :src="item.img"
                       alt="">
                  <div class="w-2/3 flex flex-col text-left bg-white rounded-r-2xl">
                    <p
                        class="px-5 py-3 rounded-tr-2xl text-white whitespace-nowrap text-xs font-bold"
                        :class="[
                            { 'bg-[#FD586B]' : index === 0 },
                            { 'bg-[#0065FF]' : index === 1 },
                            { 'bg-[#FEAA48]' : index === 2 },
                            { 'bg-[#0CE07A]' : index === 3 }
                        ]">
                      {{ item.title }}
                    </p>
                    <p class="px-5 pt-5 rounded-br-2xl text-[10px]">
                      {{ item.content }}
                    </p>
                  </div>
                </my-carousel-slide>
                <template #addons="{ currentSlide, slidesCount }">
                  <div class="flex justify-between items-center mt-3">
                    <div class="flex flex-row-reverse py-2">
                      <button
                          class="dark:text-dText p-3 bg-mainColor rounded text-white"
                          :class="{
                    'text-[#CCCCCC]': currentSlide + 1 === slidesCount,
                  }"
                          @click="myCarousel.next"
                      >
                        <IconChevronRight size="20" />
                      </button>
                    </div>
                  </div>
                </template>
              </my-carousel-carousel>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel__slide {
  align-items: normal !important;
}

.carousel__track {
  gap: 10px;
}

.carousel__prev,
.carousel__next {
  display: block !important;
  position: static !important;
  transform: translate(0, 0) !important;
}
</style>