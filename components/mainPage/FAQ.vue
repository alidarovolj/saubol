<script setup>
import {IconChevronDown} from "@tabler/icons-vue"
const cur_quest = ref(0)

const questions = ref([
  {
    title: "Какие услуги предоставляет Saubol?",
    content: "Saubol предоставляет широкий спектр медицинских услуг, включая выезд медицинского персонала на дом, онлайн консультации с врачами, а также проведение диагностических и лабораторных исследований."
  },
  {
    title: "Как я могу записаться на прием?",
    content: "Saubol предоставляет широкий спектр медицинских услуг, включая выезд медицинского персонала на дом, онлайн консультации с врачами, а также проведение диагностических и лабораторных исследований."
  },
  {
    title: "Каковы методы оплаты услуг? ",
    content: "Saubol предоставляет широкий спектр медицинских услуг, включая выезд медицинского персонала на дом, онлайн консультации с врачами, а также проведение диагностических и лабораторных исследований."
  },
  {
    title: "Как я могу получить результаты анализов? ",
    content: "Saubol предоставляет широкий спектр медицинских услуг, включая выезд медицинского персонала на дом, онлайн консультации с врачами, а также проведение диагностических и лабораторных исследований."
  },
  {
    title: "Какие медицинские специалисты работают с Saubol? ",
    content: "Saubol предоставляет широкий спектр медицинских услуг, включая выезд медицинского персонала на дом, онлайн консультации с врачами, а также проведение диагностических и лабораторных исследований."
  },
  {
    title: "Что делать в случае неотложной медицинской помощи?",
    content: "Saubol предоставляет широкий спектр медицинских услуг, включая выезд медицинского персонала на дом, онлайн консультации с врачами, а также проведение диагностических и лабораторных исследований."
  }
])
</script>

<template>
  <div class="mb-32">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="block lg:flex items-start gap-6">
        <div class="w-full lg:w-1/3 bg-secColor rounded-3xl p-7 flex flex-col gap-9">
          <div class="flex items-end gap-2">
            <h3 class="text-mainColor font-semibold text-4xl">
              FAQ
            </h3>
            <p class="text-sm text-[#C5C5C5]">
              Часто задаваемые вопросы
            </p>
          </div>
          <p class="text-sm">
            У вас остались вопросы? Не волнуйтесь, мы здесь, чтобы помочь! Прочитайте наши часто задаваемые рядом. Если
            ваш вопрос не был рассмотрен, просто оставьте его, и мы ответим вам как можно скорее
          </p>
          <NuxtLink
              to="/"
              class="hover:bg-mainColor transition-all hover:text-white border-mainColor text-mainColor font-semibold py-3 block border rounded-3xl text-center"
          >
            Оставить вопрос
          </NuxtLink>
        </div>
        <div class="w-full lg:w-2/3 flex flex-col gap-2">
          <div
              v-for="(item, index) of questions"
              :key="index"
              class="collapse">
            <input
                type="radio"
                name="my-accordion-1"
                :value="index"
                v-model="cur_quest"
                :checked="cur_quest === index"/>
            <div class="collapse-title flex items-center justify-between">
              <div
                  :class="{ 'text-[#828282] font-normal' : cur_quest !== index }"
                  class="font-semibold">
                {{ item.title }}
              </div>
              <IconChevronDown
                  class="transition-all"
                  :class="{ 'rotate-180' : cur_quest === index }" />
            </div>
            <div class="collapse-content text-sm">
              <p>
                {{ item.content }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>