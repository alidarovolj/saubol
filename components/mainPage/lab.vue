<script setup>
import {IconMapPin} from "@tabler/icons-vue"
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/2">
        <div class="relative rounded-2xl p-4 lg:p-0">
          <img
              class="w-full h-full object-cover absolute left-0 top-0 rounded-2xl"
              src="~/assets/img/mainPage/lab/bg.png"
              alt=""
          >
          <div class="setBg absolute left-0 top-0 w-full h-full rounded-2xl"></div>
          <div class="relative z-20">
            <div class="hidden lg:block py-6"></div>
            <div class="bg-white py-3 lg:py-6 px-4 lg:px-20 rounded-lg lg:rounded-none">
              <h2 class="text-xl lg:text-4xl text-mainColor font-semibold">
                Домо-Лаб
              </h2>
            </div>
            <div class="pt-4 pb-0 lg:pb-10 px-0 lg:px-20">
              <p class="text-sm lg:text-2xl font-medium text-white">
                "Анализы на дому для вашего удобства. Наш медперсонал приедет в удобное время, сэкономив ваше время и
                минимизировав стресс. Конфиденциально и точно. Ваше здоровье - наша забота, где бы вы ни находились.
                Приятный бонус: расшифровка полученных анализов абсолютно бесплатно. Мы ценим ваше здоровье так же, как и вы!"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 bg-white flex items-center justify-center text-regText p-4 lg:p-0">
        <div class="w-full lg:w-[60%]">
          <div class="mb-5">
            <p class="text-sm mb-2">
              Адрес
            </p>
            <div class="relative">
              <IconMapPin
                  class="absolute left-3 top-1/2 -translate-y-1/2"
                  size="24"
              />
              <input
                  type="text"
                  placeholder="Введите адрес"
                  class="pl-12 py-3 border  rounded-lg w-full">
            </div>
          </div>
          <div class="mb-4">
            <p class="text-sm mb-2">
              Вид анализа
            </p>
            <div class="relative">
              <select class="px-3 py-3 border  rounded-lg w-full">
                <option value="">Выберите анализ</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap justify-between">
            <label
                class="w-half flex items-center mb-4"
                for="">
              <input
                  type="radio"
                  name="lab"
                  class="w-6 h-6 mr-2">
              <p>
                Вариант 1
              </p>
            </label>
            <label
                class="w-half flex items-center mb-4"
                for="">
              <input
                  type="radio"
                  name="lab"
                  class="w-6 h-6 mr-2">
              <p>
                Вариант 2
              </p>
            </label>
            <label
                class="w-half flex items-center mb-4"
                for="">
              <input
                  type="radio"
                  name="lab"
                  class="w-6 h-6 mr-2">
              <p>
                Вариант 3
              </p>
            </label>
            <label
                class="w-half flex items-center mb-4"
                for="">
              <input
                  type="radio"
                  name="lab"
                  class="w-6 h-6 mr-2">
              <p>
                Вариант 4
              </p>
            </label>
          </div>
          <button class="py-3 rounded-lg w-full bg-mainColor text-white">
            Заказать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setBg {
  border-radius: 15px;
  background: linear-gradient(90deg, #196BF7 -26.72%, rgba(25, 107, 247, 0.00) 181.78%);
}
</style>