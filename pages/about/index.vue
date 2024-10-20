<script setup>
import ContactsBlock from "~/components/contacts/contactsBlock.vue";

const links = ref([
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "О нас",
    link: "/about",
  },
]);
</script>

<template>
  <div class="pt-0 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs :links="links" />
      <div
        class="w-full md:w-2/3 mx-auto block md:flex items-center justify-between gap-10 py-14"
      >
        <div class="w-full md:w-1/2">
          <div class="flex items-end gap-3 mb-3">
            <NuxtLink to="/" class="flex items-center gap-2 mr-5 md:mr-0">
              <img
                class="w-auto h-7 md:h-12"
                src="@/assets/img/logo.png"
                alt=""
              />
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
          <img class="w-full" src="@/assets/img/about/hero.png" alt="" />
        </div>
      </div>
    </div>
    <div class="bg-[#ffe7e7] relative">
      <img
        class="w-auto h-full absolute left-0 top-0"
        src="@/assets/img/about/key.png"
        alt=""
      />
      <div class="container mx-auto px-4 md:px-0 relative z-10 py-14">
        <h2 class="text-mainColor text-xl md:text-3xl font-bold mb-5">
          Ключевые особенности
        </h2>
        <div class="block md:flex justify-between gap-11">
          <div class="bg-white rounded-lg p-4 w-full md:w-1/4 mb-5 md:mb-0">
            <img
              class="w-full mb-3"
              src="@/assets/img/about/keys/1.png"
              alt=""
            />
            <h3 class="font-semibold text-mainColor text-base md:text-xl mb-2">
              Удобство
            </h3>
            <p class="text-sm md:text-base">
              Мы делаем медицинские услуги более доступными, предоставляя их
              прямо в домашней обстановке.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 w-full md:w-1/4 mb-5 md:mb-0">
            <img
              class="w-full mb-3"
              src="@/assets/img/about/keys/2.png"
              alt=""
            />
            <h3 class="font-semibold text-mainColor text-base md:text-xl mb-2">
              Профессионализм
            </h3>
            <p class="text-sm md:text-base">
              Наша команда состоит из опытных медицинских специалистов, готовых
              обеспечить высокий уровень медицинского обслуживания.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 w-full md:w-1/4 mb-5 md:mb-0">
            <img
              class="w-full mb-3"
              src="@/assets/img/about/keys/3.png"
              alt=""
            />
            <h3 class="font-semibold text-mainColor text-base md:text-xl mb-2">
              Персонализация
            </h3>
            <p class="text-sm md:text-base">
              Мы адаптируем наши услуги к индивидуальным потребностям каждого
              пациента, обеспечивая персонализированный уход.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 w-full md:w-1/4 mb-5 md:mb-0">
            <img
              class="w-full mb-3"
              src="@/assets/img/about/keys/4.png"
              alt=""
            />
            <h3 class="font-semibold text-mainColor text-base md:text-xl mb-2">
              Инновации
            </h3>
            <p class="text-sm md:text-base">
              Мы постоянно внедряем новые технологии и методики, чтобы
              обеспечить нашим пациентам лучший медицинский уход.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-10 md:py-32">
      <div class="container mx-auto px-4 md:px-0">
        <div
          class="flex flex-col-reverse md:flex-row items-center justify-between"
        >
          <div class="w-full md:w-[40%]">
            <img class="w-full" src="@/assets/img/about/team.png" alt="" />
          </div>
          <div class="w-full md:w-[60%] text-start md:text-center">
            <h2 class="text-lg md:text-6xl mb-3">Наша команда</h2>
            <p class="text-sm md:text-2xl mb-4 md:mb-14">
              Врачи, готовые помочь, заботиться и лечить. <br />
              Мы здесь для вас!
            </p>
            <div class="flex justify-between items-center">
              <div class="w-1/3 text-center">
                <p class="text-4xl md:text-8xl">25</p>
                <p class="text-xs md:text-2xl">Врачей</p>
              </div>
              <div class="block w-[3px] md:w-[5px] bg-black h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl md:text-8xl">65</p>
                <p class="text-xs md:text-2xl">Мед персонала</p>
              </div>
              <div class="block w-[3px] md:w-[5px] bg-black h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl md:text-8xl">12</p>
                <p class="text-xs md:text-2xl">Услуг</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContactsBlock />
  </div>
</template>
