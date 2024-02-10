<script setup>
import {IconTrash, IconEdit} from "@tabler/icons-vue";

const route = useRoute();

const cart = useCartStore();

const links = [
  {
    title: "Главная",
    link: "/"
  },
  {
    title: "Корзина",
    link: "/cart"
  },
]

useHead({
  title: "Корзина | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Корзина | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{rel: "canonical", href: "https://saubolmed.kz/"}],
});
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links" class="mb-7"/>
      <h1 class="text-lg lg:text-2xl mb-7">
        Корзина
      </h1>
      <div class="block lg:flex items-start justify-between gap-5">
        <div
            style="box-shadow: 0px 3px 10px 0px #0000000D;"
            class="w-full lg:w-3/4 bg-none lg:bg-white p-0 lg:p-5 rounded-lg mb-5 lg:mb-0">
          <div v-if="cart.result">
            <div
                v-for="(item, index) of cart.result.doctor_order"
                :key="index"
                :class="{ 'mb-10' : index !== cart.result.doctor_order.length - 1 }"
                class="bg-white lg:bg-none px-3 lg:px-0 py-5 lg:py-0 rounded-lg"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <img
                      class="w-12 h-12"
                      src="@/assets/img/services/female_doctor.png"
                      alt=""
                  >
                  <p class="w-max text-mainColor font-semibold">
                    {{ item.staff.name }}
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <IconTrash class="text-red-500 cursor-pointer"/>
                </div>
              </div>
              <div class="block lg:hidden">
                <div class="flex items-center justify-between mb-3 pb-1 border-b border-[#F6F6F7]">
                  <p class="w-max text-sm font-semibold">
                    Цена:
                  </p>
                  <p class="text-sm bg-[#E7F0FF] text-mainColor px-8 py-2 rounded-md">
                    {{ item.price }} тнг.
                  </p>
                </div>
                <div class=" border-b border-[#F6F6F7] mb-3">
                  <p class="text-xs font-semibold">
                    Адрес
                  </p>
                  <p>
                    {{ item.address.title }}
                  </p>
                </div>
                <div class="flex justify-between border-b border-[#F6F6F7]">
                  <div class="w-half">
                    <p class="text-xs font-semibold">
                      Время
                    </p>
                    <p>
                      {{ item.date.start }} - {{ item.date.end }}
                    </p>
                  </div>
                  <div class="w-half">
                    <p class="text-xs font-semibold">
                      Дата
                    </p>
                    <p>
                      {{ item.date.day }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="hidden lg:flex justify-between mb-1 font-semibold">
                <div class="w-1/4">
                  <p class="text-xs">Адрес: </p>
                </div>
                <div class="w-1/4">
                  <p class="text-xs">Время: </p>
                </div>
                <div class="w-1/4">
                  <p class="text-xs">Дата: </p>
                </div>
                <div class="w-1/4">
                  <p class="text-xs">Цена :</p>
                </div>
              </div>
              <div class="hidden lg:flex justify-between bg-[#E7F0FF] p-3 rounded-lg">
                <div class="w-1/4">
                  <p class="text-sm">{{ item.address.title }}</p>
                </div>
                <div class="w-1/4">
                  <p class="text-sm">{{ item.date.start }} - {{ item.date.end }}</p>
                </div>
                <div class="w-1/4">
                  <p class="text-sm">{{ item.date.day }}</p>
                </div>
                <div class="w-1/4">
                  <p class="text-sm">{{ item.price }} тнг.</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <Spinner/>
          </div>
        </div>
        <div
            style="box-shadow: 0px 3px 10px 0px #0000000D;"
            class="w-full lg:w-1/4 p-5 bg-white rounded-lg">
          <div v-if="cart.result">
            <div class="flex items-center justify-between mb-5 pb-5 border-b border-[#F6F6F7]">
              <p class="w-max text-sm">
                Общее количество услуг:
              </p>
              <p class="text-sm bg-[#E7F0FF] text-mainColor px-8 py-2 rounded-md">
                {{ cart.result.count }} шт.
              </p>
            </div>
            <div class="flex items-center justify-between mb-5">
              <p class="w-max text-sm font-semibold">
                Общая цена :
              </p>
              <p class="text-sm bg-mainColor text-white px-8 py-2 rounded-md">
                {{ cart.result.common_price }} тнг.
              </p>
            </div>
            <p class="bg-mainColor text-white py-2 rounded-lg text-center">
              Оплатить
            </p>
          </div>
          <div v-else>
            <Spinner/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>