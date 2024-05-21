<script setup>
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram
} from "@tabler/icons-vue"
</script>

<template>
  <div class="bg-[#F7FAFF] pt-24 pb-16">
    <img
        class="absolute left-0 top-0 w-full h-full object-cover"
        src="@/assets/img/footer/footer-with-circle.png"
        alt="">
    <div class="container mx-auto px-4 lg:px-0 relative z-20">
      <div class="block lg:flex items-top justify-between pb-10">
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6 text-mainColor">
            Услуги
          </p>
          <div>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              Врач
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              Мед-услуги
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              Детокс
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              Анализы
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 !text-black"
                to="/"
            >
              Аренда инвентаря
            </NuxtLink>
          </div>
        </div>
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6 text-mainColor">
            Информация
          </p>
          <div>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              FAQ
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              Новости
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                to="/"
            >
              О нас
            </NuxtLink>
          </div>
        </div>
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6 text-mainColor">
            Контакты
          </p>
          <div>
            <a
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                href="tel:+77756860022"
            >
              +8 (775) 686-00-22
            </a>
            <a
                class="block text-sm lg:text-base opacity-75 mb-2 !text-black"
                href="mailto:info@saubol.kz"
            >
              info@saubol.kz
            </a>
          </div>
        </div>
        <div class="w-full lg:w-1/4 bg-white bg-opacity-10 rounded-lg">
          <p class="text-base text-mainColor">
            Подписаться на новости
          </p>
          <div class="flex justify-between my-4">
            <input
                type="text"
                placeholder="Введите почту"
                class="text-sm py-3 px-4 rounded-l-md w-full"
            >
            <button class="rounded-r-md bg-mainColor text-white px-3">
              <IconArrowRight size="16"/>
            </button>
          </div>
          <p class="text-xs">
            SaubolMed предлагает пользователям регулярные обновления и новости от компании, занимающейся медицинскими
            услугами. Подписчики могут ожидать полезных советов, актуальных новостей о здоровье и эксклюзивных
            предложений от
            SaubolMed.
          </p>
        </div>
      </div>
      <div class="block lg:flex items-center justify-center lg:justify-between mt-11">
        <div class="flex items-center">
          <NuxtLink
              to="/"
              class="flex items-center gap-2"
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
        <div class="text-sm flex items-center gap-5 my-5 lg:my-0">
          <NuxtLink class="!text-mainColor" to="/">
            Условия
          </NuxtLink>
          <NuxtLink class="!text-mainColor" to="/">
            Конфиденциальность
          </NuxtLink>
          <NuxtLink class="!text-mainColor" to="/">
            Cookies
          </NuxtLink>
        </div>
        <div class="flex gap-4">
<!--          <a href="#">-->
<!--            <IconBrandLinkedin class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>-->
<!--          </a>-->
          <a href="https://www.facebook.com/profile.php?id=100080161426914&mibextid=LQQJ4d">
            <IconBrandFacebook class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>
          </a>
<!--          <a href="#">-->
<!--            <IconBrandTwitter class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>-->
<!--          </a>-->
          <a href="https://www.instagram.com/saubolmed?igsh=dHZyMDZxeWR2Znp4">
            <IconBrandInstagram class="w-9 h-9 p-2 border border-mainColor rounded-full text-mainColor"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>