<script setup></script>

<template>
  <div>
    <div class="relative w-full h-full py-14">
      <img
        class="w-full h-full absolute left-0 top-0 object-cover"
        src="@/assets/img/contacts/bg.png"
        alt=""
      />
      <div class="relative z-30 w-full">
        <div class="bg-white bg-opacity-80">
          <div class="container mx-auto px-4 md:px-0 py-8">
            <div class="flex items-center gap-2 mr-5 md:mr-0 mb-4">
              <img
                class="w-auto h-7 md:h-12"
                src="@/assets/img/logo.png"
                alt=""
              />
              <p class="text-3xl font-bold text-black">Saubol</p>
            </div>
            <p class="text-xl md:text-4xl font-normal">
              Забота о вашем здоровье с Saubol: Надежно и Качественно!
            </p>
          </div>
        </div>
        <div class="container mx-auto px-4 md:px-0 py-12">
          <div class="bg-white p-5 rounded-lg">
            <div>
              <h1 class="text-mainColor text-2xl font-semibold mb-5">
                Контакты
              </h1>
              <div class="block md:flex justify-between">
                <div class="w-full md:w-1/3 mb-10 md:mb-0">
                  <p class="font-semibold mb-4">Телефоны:</p>
                  <p class="mb-3">
                    <a
                      href="tel:+77756860022"
                      class="text-mainColor font-semibold"
                    >
                      +7 (775) 686-00-22
                    </a>
                    - по вопросам сотрудничества
                  </p>
                  <p class="mb-3">
                    <a
                      href="tel:+77472367503"
                      class="text-mainColor font-semibold"
                    >
                      +7 (747) 236-75-03
                    </a>
                    - WhatsApp
                  </p>
                  <p>
                    <a
                      href="tel:+77756860022"
                      class="text-mainColor font-semibold"
                    >
                      +7 (775) 686-00-22
                    </a>
                    - Telegram
                  </p>
                </div>
                <div class="w-full md:w-1/3 mb-10 md:mb-0">
                  <p class="font-semibold mb-4">Электронная почта:</p>
                  <p class="mb-3">
                    Основной адрес почты:
                    <a
                      href="mailto:info@saubol.kz"
                      class="text-mainColor font-semibold"
                    >
                      info@saubol.kz
                    </a>
                  </p>
                  <p class="mb-3">
                    Поддержка:
                    <a
                      href="mailto:support@saubol.kz"
                      class="text-mainColor font-semibold"
                    >
                      support@saubol.kz
                    </a>
                  </p>
                  <p>
                    Продажи:
                    <a
                      href="mailto:sales@saubol.kz"
                      class="text-mainColor font-semibold"
                    >
                      sales@saubol.kz
                    </a>
                  </p>
                </div>
                <div class="w-full md:w-1/3 mb-10 md:mb-0">
                  <p class="font-semibold mb-4">Социальные сети:</p>
                  <!--                  <div class="flex items-center gap-3 mb-3">-->
                  <!--                    <div class="p-2 rounded-full border border-mainColor text-mainColor">-->
                  <!--                      <IconBrandLinkedin size="14"/>-->
                  <!--                    </div>-->
                  <!--                    <p>-->
                  <!--                      Saubolmed-->
                  <!--                    </p>-->
                  <!--                  </div>-->
                  <a
                    href="https://www.facebook.com/profile.php?id=100080161426914&mibextid=LQQJ4d"
                    class="flex items-center gap-3 mb-3"
                  >
                    <div
                      class="p-2 rounded-full border border-mainColor text-mainColor"
                    >
                      <IconBrandFacebook size="14" />
                    </div>
                    <p>Saubolmed</p>
                  </a>
                  <!--                  <div class="flex items-center gap-3 mb-3">-->
                  <!--                    <div class="p-2 rounded-full border border-mainColor text-mainColor">-->
                  <!--                      <IconBrandX size="14"/>-->
                  <!--                    </div>-->
                  <!--                    <p>-->
                  <!--                      Saubolmed-->
                  <!--                    </p>-->
                  <!--                  </div>-->
                  <a
                    href="https://www.instagram.com/saubolmed?igsh=dHZyMDZxeWR2Znp4"
                    class="flex items-center gap-3 mb-3"
                  >
                    <div
                      class="p-2 rounded-full border border-mainColor text-mainColor"
                    >
                      <IconBrandInstagram size="14" />
                    </div>
                    <p>Saubolmed</p>
                  </a>
                  <!--                  <div class="flex items-center gap-3">-->
                  <!--                    <div class="p-2 rounded-full border border-mainColor text-mainColor">-->
                  <!--                      <IconBrandTiktok size="14"/>-->
                  <!--                    </div>-->
                  <!--                    <p>-->
                  <!--                      Saubolmed-->
                  <!--                    </p>-->
                  <!--                  </div>-->
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
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandX,
} from "@tabler/icons-vue";
</script>
