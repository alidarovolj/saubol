<script setup></script>

<template>
  <div>
    <div class="relative w-full h-full py-14">
      <img
          class="w-full h-full absolute left-0 top-0 object-cover"
          src="@/assets/img/contacts/bg.png"
          alt="">
      <div class="relative z-30 w-full">
        <div class="bg-white bg-opacity-80">
          <div class="container mx-auto px-4 lg:px-0 py-8">
            <div class="flex items-center gap-2 mr-5 lg:mr-0 mb-4">
              <img
                  class="w-auto h-7 lg:h-12"
                  src="@/assets/img/logo.png"
                  alt=""
              >
              <p class="text-3xl font-bold text-black">
                Saubol
              </p>
            </div>
            <p class="text-4xl font-normal">
              Забота о вашем здоровье с Saubol: Надежно и Качественно!
            </p>
          </div>
        </div>
        <div class="container mx-auto px-4 lg:px-0 py-12">
          <div class="bg-white p-5 rounded-lg">
            <div>
              <h1 class="text-mainColor text-2xl font-semibold mb-5">
                Контакты
              </h1>
              <div class="block lg:flex justify-between">
                <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
                  <p class="font-semibold mb-4">
                    Контакты:
                  </p>
                  <p class="mb-3">
                    <a
                        href="tel:+77777777777"
                        class="text-mainColor font-semibold">
                      +7 (777) 777-77-77
                    </a> - по вопросам сотрудничества
                  </p>
                  <p class="mb-3">
                    <a
                        href="tel:+77777777777"
                        class="text-mainColor font-semibold">
                      +7 (777) 777-77-77
                    </a> - WhatsApp
                  </p>
                  <p>
                    <a
                        href="tel:+77777777777"
                        class="text-mainColor font-semibold">
                      +7 (777) 777-77-77
                    </a> - Telegram
                  </p>
                </div>
                <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
                  <p class="font-semibold mb-4">
                    Электронная почта:
                  </p>
                  <p class="mb-3">
                    Основной адрес почты:
                    <a
                        href="mailto:info@saubol.kz"
                        class="text-mainColor font-semibold">
                      info@saubol.kz
                    </a>
                  </p>
                  <p class="mb-3">
                    Поддержка:
                    <a
                        href="mailto:support@saubol.kz"
                        class="text-mainColor font-semibold">
                      support@saubol.kz
                    </a>
                  </p>
                  <p>
                    Продажи:
                    <a
                        href="mailto:sales@saubol.kz"
                        class="text-mainColor font-semibold">
                      sales@saubol.kz
                    </a>
                  </p>
                </div>
                <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
                  <p class="font-semibold mb-4">
                    Социальные сети:
                  </p>
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 rounded-full border border-mainColor text-mainColor">
                      <IconBrandLinkedin size="14"/>
                    </div>
                    <p>
                      Saubolmed
                    </p>
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 rounded-full border border-mainColor text-mainColor">
                      <IconBrandFacebook size="14"/>
                    </div>
                    <p>
                      Saubolmed
                    </p>
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 rounded-full border border-mainColor text-mainColor">
                      <IconBrandX size="14"/>
                    </div>
                    <p>
                      Saubolmed
                    </p>
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 rounded-full border border-mainColor text-mainColor">
                      <IconBrandInstagram size="14"/>
                    </div>
                    <p>
                      Saubolmed
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="p-2 rounded-full border border-mainColor text-mainColor">
                      <IconBrandTiktok size="14"/>
                    </div>
                    <p>
                      Saubolmed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandX} from "@tabler/icons-vue";
</script>