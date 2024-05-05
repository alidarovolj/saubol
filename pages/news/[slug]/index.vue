<script setup>
import {useNewsStore} from "~/store/news";
import {IconArrowRight} from "@tabler/icons-vue";

const route = useRoute()

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
const news = useNewsStore();
const {result, resultDetail} = storeToRefs(news);

onMounted(async () => {
  await nextTick();
  await news.detailNews(route.params.slug);

  const head = useHead({
    title: resultDetail.value.name + " | Новости | SaubolMed", // Set the document title to the news detail name
    meta: [
      {
        name: 'description',
        content: resultDetail.value.description, // Set the meta description to the news detail description
      },
      // Add more meta tags as needed
    ],
  });
  links.value.push({
    link: "/news/slug/" + route.params.slug,
    title: resultDetail.value.name
  });

  await news.newsList()
});
</script>

<template>
  <section class="pt-[30px]">
    <div class="container mx-auto px-4 lg:px-4">
      <Breadcrumbs
          :links="links"
          class="mb-6"
      />
      <div class="block lg:flex justify-between items-start">
        <div class="lg:mr-6 mb-6 lg:mb-0 p-6 bg-white shadow-lg rounded-lg w-full lg:w-2/3">
          <div v-if="resultDetail">
            <h1 class="text-xl font-bold mb-3">
              {{ resultDetail.name }}
            </h1>
            <div class="text-sm">
              <p class="mb-4 text-neutral60">
                {{ resultDetail.created_at }}
              </p>
              <img
                  :src="resultDetail.img"
                  alt=""
                  class="w-full object-cover rounded-lg mb-4 object-top"
              >
              <div
                  class="checkLinks news-details"
              >
                <p class="!text-black" v-html="resultDetail.content"></p>
              </div>
            </div>
          </div>
          <div v-else class="my-10">
            <div class="flex justify-center spinner p-10"></div>
          </div>
        </div>
        <div class="w-full lg:w-1/3">
          <p class="text-base font-bold mb-4">
            Читайте также:
          </p>
          <div v-if="result" class="py-0">
            <nuxt-link
                v-for="(item, index) in result.data.slice(0, 3)"
                :key="index"
                :to="'/news/slug/' + item.slug"
                class="text-base mb-3 w-full mr-4 hover:shadow-custom transition-all rounded-lg p-4 !text-black shrink-0 block bg-white shadow-lg snap-center"
            >
              <img
                  :src="item.img"
                  alt=""
                  class="w-full h-36 object-cover rounded-lg"
              >
              <div class="flex items-center justify-between font-semibold my-2">
                <p class="!text-black">{{ item.name }}</p>
                <IconArrowRight
                    class="w-max mr-0 !text-black"
                    size="20"
                />
              </div>
              <p
                  class="news-list !text-sm text-start line-clamp-4 mb-2 h-20 max-h-20 !text-black"
                  v-html="item.content.slice(0, 100) + '...'"></p>
              <p class="text-sm text-start !text-black">
                {{ item.created_at }}
              </p>
            </nuxt-link>
          </div>
          <div v-else class="py-10 bg-white rounded-lg block">
            <div class="flex justify-center spinner p-10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
