<script setup>
import img1 from "@/assets/img/accordionBlock/1.png";
import img2 from "@/assets/img/accordionBlock/2.png";
import img3 from "@/assets/img/accordionBlock/3.png";
import img4 from "@/assets/img/accordionBlock/4.png";
import img5 from "@/assets/img/accordionBlock/5.png";

const active = ref(0)

const accordion = ref([
  {
    title: "Выбор типа услуги",
    text: "Выезд медицинского персонала или онлайн консультация, и заполните заявку на нашем сайте.",
    image: img1
  },
  {
    title: "Выбор удобного времени",
    text: "Оставьте заявку на нашем сайте или позвоните нам, чтобы выбрать удобное для вас время для получения медицинских услуг.",
    image: img2
  },
  {
    title: "Качественное обслуживание",
    text: "Наш специалист предоставит вам необходимые медицинские услуги у вас дома.",
    image: img3
  },
  {
    title: "Все результаты в одном месте",
    text: "Все результаты обследований и консультаций будут доступны вам в личном кабинете на нашем сайте.",
    image: img4
  },
  {
    title: "Автоматические рекомендации",
    text: "Все результаты обследований и консультаций будут доступны вам в личном кабинете на нашем сайте.",
    image: img5
  }
])
</script>

<template>
  <div class="mb-20">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex flex-col-reverse lg:flex-row justify-between gap-6">
        <div class="w-full lg:w-1/2">
          <img
              class="w-full h-full object-cover transition-all"
              :src="accordion[active].image"
              alt=""
          />
        </div>
        <div class="w-full lg:w-1/2">
          <h2 class="text-3xl font-semibold mb-10">
            Как это <span class="text-mainColor">работает с Saubol:</span>
          </h2>
          <div class="flex justify-between flex-col">
            <div
                v-for="(item, index) of accordion"
                :key="index"
                @mouseover="active = index"
                class="mb-11 flex gap-8 cursor-pointer"
            >
              <div class="w-10 min-w-10 h-10 min-h-10 relative">
                <div
                    :class="{ '!bg-mainColor' : index === active }"
                    class="w-10 min-w-10 h-10 min-h-10 rounded-full bg-[#F0F0F0] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"></div>
                <div
                    :class="{ '!bg-white' : index === active }"
                    class="w-3 min-w-3 h-3 min-h-3 rounded-full bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"></div>
              </div>
              <div>
                <p
                    :class="{ 'text-[#F0F0F0]' : index !== active }"
                    class="text-2xl font-semibold mb-5 transition-all">
                <span
                    :class="{ '!text-[#F0F0F0]' : index !== active }"
                    class="text-mainColor transition-all">0{{ index + 1 }}</span> {{ item.title }}
                </p>
                <p
                    v-if="index === active"
                    class="text-xl">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>