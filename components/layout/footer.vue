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
  <div class="bg-mainColor py-24 relative">
    <img class="absolute left-0 top-0 w-full h-full object-cover" src="@/assets/img/footer/footer-with-circle.png"
         alt="">
    <div class="container mx-auto px-4 lg:px-0 relative z-20">
      <div class="block lg:flex items-top justify-between text-white border-b border-bColor pb-10">
        <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
          <img
              class="mb-5"
              src="@/assets/img/footer-logo.png"
              alt=""
          >
          <a
              class="block text-lg lg:text-xl mb-5"
              href="tel:+77777777777">
            +8 (777) 777-77-77
          </a>
          <a
              class="block text-lg lg:text-xl mb-5"
              href="mailto:saubolmed@gmail.com">
            saubolmed@gmail.com
          </a>
        </div>
        <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6">
            Навигация
          </p>
          <div>
            <NuxtLink
                class="block text-sm lg:text-lg font-medium mb-2 !text-white"
                to="/"
            >
              Новости
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-lg font-medium mb-2 !text-white"
                to="/"
            >
              Услуги
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-lg font-medium mb-2 !text-white"
                to="/"
            >
              Контакты
            </NuxtLink>
            <NuxtLink
                class="block text-sm lg:text-lg font-medium mb-2 !text-white"
                to="/"
            >
              О нас
            </NuxtLink>
          </div>
        </div>
        <div class="w-full lg:w-1/3">
          <p class="text-base lg:text-lg">
            Подписаться на новости
          </p>
          <div class="flex justify-between">
            <input
                type="text"
                placeholder="Введите почту"
                class="text-sm lg:text-base py-3 px-4 rounded-l-md w-full"
            >
            <button class="rounded-r-md bg-[#478EFF] text-white px-3">
              <IconArrowRight size="16"/>
            </button>
          </div>
        </div>
      </div>
      <div class="block lg:flex items-center justify-center lg:justify-between mt-11">
        <div class="flex gap-4">
          <a href="#">
            <IconBrandLinkedin class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
          <a href="#">
            <IconBrandFacebook class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
          <a href="#">
            <IconBrandTwitter class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
          <a href="#">
            <IconBrandInstagram class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
        </div>
        <div class="flex items-center gap-2 text-white text-lg my-5 lg:my-0">
          <p class="text-sm lg:text-base">Продукт от </p>
          <img src="@/assets/img/footer-logo.png" alt="">
        </div>
        <p class="text-white text-sm lg:text-base">
          © 2024 saubolmed
        </p>
      </div>
    </div>
  </div>
</template>