<script setup></script>

<template>
  <div
    class="container mx-auto px-4 md:px-0 mt-10 md:mt-[100px] relative z-20 pb-24"
  >
    <div>
      <div class="flex justify-end">
        <h2 class="text-6xl font-semibold text-mainColor mb-5 hidden md:block">
          Стать специалистом
        </h2>
      </div>
      <div
        class="flex items-end md:items-start bg-mainColor relative justify-end rounded-lg md:rounded-[43px] px-4 md:px-0 pt-4 md:pt-0"
        style="
          box-shadow: 0px 3.624px 2.214px 0px rgba(6, 85, 220, 0.07),
            0px 8.892px 5.32px 0px rgba(6, 85, 220, 0.09),
            0px 16.955px 10.017px 0px rgba(6, 85, 220, 0.1),
            0px 30.201px 17.869px 0px rgba(6, 85, 220, 0.1),
            0px 54.343px 33.422px 0px rgba(6, 85, 220, 0.09),
            0px 104px 80px 0px rgba(6, 85, 220, 0.07);
        "
      >
        <div class="w-1/2 md:w-[30%] mr-2 md:mr-0">
          <div
            class="w-full md:w-[30%] h-full static md:absolute left-5 bottom-0 flex items-end"
          >
            <img
              src="~/assets/img/member/doctor.png"
              alt="Doctor"
              class="w-full h-full md:h-auto"
            />
          </div>
        </div>
        <div class="w-1/2 md:w-[60%] py-0 md:py-14 pr-0 md:pr-10 pb-4">
          <h2 class="text-sm font-semibold text-white block md:hidden">
            Стать специалистом
          </h2>
          <p class="text-white text-2xs md:text-3xl mb-2 md:mb-7 mt-2 md:mt-4">
            "Станьте частью нашей медицинской команды! Мы приглашаем талантливых
            врачей, готовых к профессиональному росту и совместной работе.
            Присоединяйтесь к нам для создания инновационных решений в заботе о
            здоровье."
          </p>
          <NuxtLink
            to="/become-member"
            class="w-full md:w-max block text-sm md:text-2xl text-mainColor font-medium bg-white py-2 md:py-3 px-5 md:px-10 rounded-lg md:rounded-2xl"
          >
            Присоединится
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
