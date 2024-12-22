<script setup>
import ContactsBlock from '~/components/contacts/contactsBlock.vue';

import keyFeatures1 from '@/assets/img/about/keys/1.png'
import keyFeatures2 from '@/assets/img/about/keys/2.png'
import keyFeatures3 from '@/assets/img/about/keys/3.png'
import keyFeatures4 from '@/assets/img/about/keys/4.png'

const links = ref([
 {
  title: 'Главная',
  link: '/',
 },
 {
  title: 'О нас',
  link: '/about',
 },
]);


const features = [
 {
  title:'Удобство',
  desc: 'Мы делаем медицинские услуги более доступными, предоставляя их прямо в домашней обстановке.',
  img: keyFeatures1
 },
 {
  title:'Профессионализм',
  desc: 'Наша команда состоит из опытных медицинских специалистов, готовых обеспечить высокий уровень медицинского обслуживания.',
  img: keyFeatures2
 },
 {
  title:'Персонализация',
  desc: 'Мы адаптируем наши услуги к индивидуальным потребностям каждого пациента, обеспечивая персонализированный уход.',
  img: keyFeatures3
 },
 {
  title:'Инновации',
  desc: 'Мы постоянно внедряем новые технологии и методики, чтобы обеспечить нашим пациентам лучший медицинский уход.',
  img: keyFeatures4
 }
]

const counters = ref()

const statistics = [
 {
  count: 25,
  desc: 'Врачей',
 },
 {
  count: 65,
  desc: 'Мед персонала',
 },
 {
  count: 12,
  desc: 'Услуг',
 },
]

onMounted(() => {

 const observerOptions = {
  root: null,
  threshold: 0.1
 }

 const animationDuration = 2000 // Общая продолжительность анимации в миллисекундах

 const handleCounter = (entries, observer) => {

  entries.forEach(entry => {

   if (entry.isIntersecting) {

    const { target } = entry

    const count = +target.dataset.count

    const startTime = performance.now()

    const updateCount = () => {
     const elapsedTime = performance.now() - startTime
     const progress = elapsedTime / animationDuration

     // Рассчитываем текущее значение на основе прогресса
     if (progress < 1) {
      target.innerText = Math.ceil(progress * count)
      requestAnimationFrame(updateCount) // Обновляем каждую анимационную кадр (60 раз в секунду)
     } else {
      target.innerText = Intl.NumberFormat().format(count)
     }
    }

    updateCount()

    observer.unobserve(target)
   }
  })
 }

 const observer = new IntersectionObserver(handleCounter, observerOptions)

 counters.value.forEach(p => {
  observer.observe(p)
 })
})

</script>

<template>
  <div class="pt-4 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" />
      <div class="w-full md:w-2/3 mx-auto block md:flex items-center justify-between gap-10 py-14">
        <div class="w-full md:w-1/2">
          <div class="flex items-end gap-3 mb-3">
            <NuxtLink
              class="flex items-center gap-2 mr-5 md:mr-0"
              to="/">
              <img
                alt=""
                class="w-auto h-7 md:h-12"
                src="@/assets/img/logo.png" />
              <p class="text-3xl font-bold text-black">Saubol</p>
            </NuxtLink>
          </div>
          <p class="text-sm md:text-xl">
            Это инновационный проект, предлагающий уникальный подход к
            медицинскому обслуживанию. Мы стремимся предоставить нашим пациентам
            возможность получать высококачественные медицинские услуги прямо у
            себя дома.
          </p>
        </div>
        <div class="w-full md:w-1/3">
          <img
            alt=""
            class="w-full"
            src="@/assets/img/about/hero.png" />
        </div>
      </div>
    </div>
    <div class="bg-[#ffe7e7] relative">
      <img
        alt=""
        class="w-auto h-full absolute left-0 top-0"
        src="@/assets/img/about/key.png" />
      <div class="container mx-auto px-4 md:px-0 relative z-10 py-14">
        <h2 class="text-mainColor text-xl md:text-3xl font-bold mb-5">
          Ключевые особенности
        </h2>
        <div class="block md:flex justify-between gap-11">
          <div
            v-for="(feature, key) of features"
            :key="key"
            class="feature-card bg-white rounded-lg p-4 w-full md:w-1/4 mb-5 md:mb-0">
            <img
              alt=""
              class="w-full mb-3"
              :src="feature.img" />
            <h3 class="font-semibold text-mainColor text-base md:text-xl mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm md:text-base">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-10 md:py-32">
      <div class="container mx-auto px-4 md:px-0">
        <div class="flex flex-col-reverse md:flex-row items-center justify-between">
          <div class="w-full md:w-[40%]">
            <img
              alt=""
              class="w-full"
              src="@/assets/img/about/team.png" />
          </div>
          <div class="w-full md:w-[60%] text-start md:text-center">
            <h2 class="text-lg md:text-6xl mb-3">Наша команда</h2>
            <p class="text-sm md:text-2xl mb-4 md:mb-14">
              Врачи, готовые помочь, заботиться и лечить. <br />
              Мы здесь для вас!
            </p>
            <div class="flex justify-between items-center">
              <div
                v-for="(statistic, key) in statistics"
                :key="key"
                class="w-1/3 text-center">
                <p
                  ref="counters"
                  :data-count="statistic.count"
                  class="text-4xl md:text-8xl">{{statistic.count}}</p>
                <p class="text-xs md:text-2xl">{{statistic.desc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContactsBlock />
  </div>
</template>

<style scoped>
.feature-card {
 transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
 transform: scale(1.05);
 box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.feature-card img {
 transition: transform 0.3s ease;
}

.feature-card:hover img {
 transform: scale(1.1);
}
</style>
