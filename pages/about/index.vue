<script setup>
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandX} from "@tabler/icons-vue";

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
      <div class="block lg:flex items-center justify-between gap-10 py-14">
        <div class="w-full lg:w-1/2">
          <div class="flex items-end gap-3">
            <img
                class="h-12 w-auto mb-4 lg:mb-0"
                src="@/assets/img/main-color-logo.svg"
                alt="">
          </div>
          <p class="text-lg lg:text-2xl">
            Это инновационный проект, предлагающий уникальный подход к медицинскому обслуживанию. Мы стремимся предоставить нашим пациентам
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
    <div class="bg-[#E7F0FF] relative">
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
          <div class="w-full lg:w-[60%] text-start lg:text-center text-mainColor">
            <h2 class="text-lg lg:text-6xl font-semibold mb-3">
              Наша команда
            </h2>
            <p class="text-sm lg:text-2xl mb-4 lg:mb-14 text-[#252525] lg:text-mainColor">
              Врачи, готовые помочь, заботиться и лечить. Мы здесь для вас!
            </p>
            <div class="flex justify-between items-center">
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">25</p>
                <p class="text-[#9A9BA4] lg:text-mainColor text-xs lg:text-2xl">Врачей</p>
              </div>
              <div class="block w-[3px] lg:w-[5px] bg-mainColor h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">65</p>
                <p class="text-[#9A9BA4] lg:text-mainColor text-xs lg:text-2xl">Мед персонала</p>
              </div>
              <div class="block w-[3px] lg:w-[5px] bg-mainColor h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">12</p>
                <p class="text-[#9A9BA4] lg:text-mainColor text-xs lg:text-2xl">Услуг</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="relative w-full h-full py-14">
        <img
            class="w-full h-full absolute left-0 top-0 object-cover"
            src="@/assets/img/contacts/bg.png"
            alt="">
        <div class="relative z-30 w-full">
          <div class="container mx-auto px-4 lg:px-0 py-12">
            <div>
              <img
                  class="mb-3"
                  src="@/assets/img/footer-logo.png"
                  alt="">
              <p class="text-4xl text-white mb-16">
                Забота о вашем здоровье с Saubol: Надежно и Качественно!
              </p>
            </div>
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
                      </a>  - по вопросам сотрудничества
                    </p>
                    <p class="mb-3">
                      <a
                          href="tel:+77777777777"
                          class="text-mainColor font-semibold">
                        +7 (777) 777-77-77
                      </a>  - WhatsApp
                    </p>
                    <p>
                      <a
                          href="tel:+77777777777"
                          class="text-mainColor font-semibold">
                        +7 (777) 777-77-77
                      </a>  - Telegram
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
                      <div class="p-2 rounded-full border border-[#235CEE] text-mainColor">
                        <IconBrandLinkedin size="14" />
                      </div>
                      <p>
                        Saubolmed
                      </p>
                    </div>
                    <div class="flex items-center gap-3 mb-3">
                      <div class="p-2 rounded-full border border-[#235CEE] text-mainColor">
                        <IconBrandFacebook size="14" />
                      </div>
                      <p>
                        Saubolmed
                      </p>
                    </div>
                    <div class="flex items-center gap-3 mb-3">
                      <div class="p-2 rounded-full border border-[#235CEE] text-mainColor">
                        <IconBrandX size="14" />
                      </div>
                      <p>
                        Saubolmed
                      </p>
                    </div>
                    <div class="flex items-center gap-3 mb-3">
                      <div class="p-2 rounded-full border border-[#235CEE] text-mainColor">
                        <IconBrandInstagram size="14" />
                      </div>
                      <p>
                        Saubolmed
                      </p>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-full border border-[#235CEE] text-mainColor">
                        <IconBrandTiktok size="14" />
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
  </div>
</template>