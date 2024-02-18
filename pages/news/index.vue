<script setup>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from "vue3-carousel";
import {IconArrowRight, IconChevronRight} from "@tabler/icons-vue";
import {useNewsStore} from "~/store/news.js";

const news = useNewsStore()
const {result} = storeToRefs(news)

const links = ref([
  {
    link: "/",
    title: "Главная"
  },
  {
    link: "/news",
    title: "Новости"
  }
])

onMounted(async () => {
  await nextTick()
  await news.newsList()
})
</script>

<template>
  <section class="mb-28 relative z-20 pt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs
          :links="links"
          class="mb-6"
      />
      <div class="flex items-center justify-between text-mainColor">
        <h1 class="text-3xl font-bold mb-7">
          Новости
        </h1>
      </div>
      <div
          v-if="result"
          class="w-full"
      >
        <div class="flex gap-5 flex-wrap">
          <nuxt-link
              v-for="(item, index) in result.data"
              :key="index"
              :to="'/news/' + item.slug"
              class="block text-base w-full lg:w-third hover:shadow-custom transition-all rounded-lg p-4 !text-black shrink-0 bg-white shadow-lg border-negative-300 snap-center"
          >
            <img
                :src="item.img"
                alt=""
                class="w-full h-36 object-cover rounded-lg"
            >
            <div class="flex items-center justify-between font-semibold my-2">
              <p>
                {{ item.name }}
              </p>
              <IconArrowRight
                  class="w-max mr-0"
                  size="20"
              />
            </div>
            <p class="text-sm text-start line-clamp-4 mb-2">
              {{ item.content }}
            </p>
            <p class="text-sm text-start !text-[#9A9BA4]">
              {{ item.created_at }}
            </p>
          </nuxt-link>
        </div>
      </div>
      <div v-else>
        <Spinner/>
      </div>
    </div>
  </section>
</template>
