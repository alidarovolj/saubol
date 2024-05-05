<script setup>
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandX} from "@tabler/icons-vue";
import ContactsBlock from "~/components/contacts/contactsBlock.vue";

const links = ref([
  {
    title: "Главная",
    link: "/"
  },
  {
    title: "О нас",
    link: "/about"
  }
])
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links"/>
      <div class="w-full lg:w-2/3 mx-auto block lg:flex items-center justify-between gap-10 py-14">
        <div class="w-full lg:w-1/2">
          <div class="flex items-end gap-3 mb-3">
            <NuxtLink
                to="/"
                class="flex items-center gap-2 mr-5 lg:mr-0"
            >
              <img
                  class="w-auto h-7 lg:h-12"
                  src="@/assets/img/logo.png"
                  alt=""
              >
              <p class="text-3xl font-bold text-black">
                Saubol
              </p>
            </NuxtLink>
          </div>
          <p class="text-lg lg:text-xl">
            Это инновационный проект, предлагающий уникальный подход к медицинскому обслуживанию. Мы стремимся
            предоставить нашим пациентам
            возможность получать высококачественные медицинские услуги прямо у себя дома.
          </p>
        </div>
        <div class="w-full lg:w-1/3">
          <img
              class="w-full"
              src="@/assets/img/about/hero.png"
              alt="">
        </div>
      </div>
    </div>
    <div class="bg-[#ffe7e7] relative">
      <img
          class="w-auto h-full absolute left-0 top-0"
          src="@/assets/img/about/key.png"
          alt="">
      <div class="container mx-auto px-4 lg:px-0 relative z-10 py-14">
        <h2 class="text-mainColor text-3xl font-bold mb-5">
          Ключевые особенности
        </h2>
        <div class="block lg:flex justify-between gap-11">
          <div class="bg-white rounded-lg p-4 w-full lg:w-1/4 mb-5 lg:mb-0">
            <img
                class="w-full mb-3"
                src="@/assets/img/about/keys/1.png"
                alt="">
            <h3 class="font-semibold text-mainColor text-xl mb-2">
              Удобство
            </h3>
            <p>
              Мы делаем медицинские услуги более доступными, предоставляя их прямо в домашней обстановке.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 w-full lg:w-1/4 mb-5 lg:mb-0">
            <img
                class="w-full mb-3"
                src="@/assets/img/about/keys/2.png"
                alt="">
            <h3 class="font-semibold text-mainColor text-xl mb-2">
              Профессионализм
            </h3>
            <p>
              Наша команда состоит из опытных медицинских специалистов, готовых обеспечить высокий уровень медицинского
              обслуживания.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 w-full lg:w-1/4 mb-5 lg:mb-0">
            <img
                class="w-full mb-3"
                src="@/assets/img/about/keys/3.png"
                alt="">
            <h3 class="font-semibold text-mainColor text-xl mb-2">
              Персонализация
            </h3>
            <p>
              Мы адаптируем наши услуги к индивидуальным потребностям каждого пациента, обеспечивая персонализированный
              уход.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 w-full lg:w-1/4 mb-5 lg:mb-0">
            <img
                class="w-full mb-3"
                src="@/assets/img/about/keys/4.png"
                alt="">
            <h3 class="font-semibold text-mainColor text-xl mb-2">
              Инновации
            </h3>
            <p>
              Мы постоянно внедряем новые технологии и методики, чтобы обеспечить нашим пациентам лучший медицинский
              уход.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-32">
      <div class="container mx-auto px-4 lg:px-0">
        <div class="flex flex-col-reverse lg:flex-row items-center justify-between">
          <div class="w-full lg:w-[40%]">
            <img
                class="w-full"
                src="@/assets/img/about/team.png"
                alt="">
          </div>
          <div class="w-full lg:w-[60%] text-start lg:text-center">
            <h2 class="text-lg lg:text-6xl mb-3">
              Наша команда
            </h2>
            <p class="text-sm lg:text-2xl mb-4 lg:mb-14">
              Врачи, готовые помочь, заботиться и лечить. <br> Мы здесь для вас!
            </p>
            <div class="flex justify-between items-center">
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">25</p>
                <p class="text-xs lg:text-2xl">Врачей</p>
              </div>
              <div class="block w-[3px] lg:w-[5px] bg-black h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">65</p>
                <p class="text-xs lg:text-2xl">Мед персонала</p>
              </div>
              <div class="block w-[3px] lg:w-[5px] bg-black h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">12</p>
                <p class="text-xs lg:text-2xl">Услуг</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContactsBlock />
  </div>
</template>