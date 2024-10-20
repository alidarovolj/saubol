<script setup>
import { IconArrowRight, IconChevronRight } from "@tabler/icons-vue";
import { useNewsStore } from "~/store/news.js";
import { useBannersStore } from "~/store/banners.js";

const banners = useBannersStore();
const { result } = storeToRefs(banners);

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  700: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 1,
    snapAlign: "start",
  },
};

onMounted(async () => {
  await nextTick();
  await banners.listBanners();
});
</script>

<template>
  <section class="mb-28 relative z-20">
    <div class="container mx-auto px-4 md:px-0">
      <div v-if="result">
        <div class="block">
          <client-only>
            <my-carousel-carousel
              :breakpoints="breakpoints"
              :itemsToShow="settings.itemsToShow"
              class="mt-9 py-0"
            >
              <my-carousel-slide
                v-for="(item, index) in result"
                :key="index"
                class=""
              >
                <div class="relative w-full h-20 md:h-96">
                  <img
                    :src="item.img"
                    alt=""
                    class="w-full h-full object-contain rounded-lg my-auto"
                  />
                  <p
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm md:text-2xl font-bold text-white"
                  >
                    {{ item.text }}
                  </p>
                </div>
              </my-carousel-slide>
              <template #addons>
                <my-carousel-navigation />
              </template>
            </my-carousel-carousel>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@media only screen and (min-width: 1024px) {
  .carousel__track {
    justify-content: space-between;
  }

  .carousel__prev {
    left: -24px;
    transform: translateX(-100%);
  }

  .carousel__next {
    right: -24px;
    transform: translateX(100%);
  }

  .carousel__prev,
  .carousel__next {
    background: #3e46ff;
    color: #fff;
    top: 50%;
    border-radius: 100%;
    width: 36px;
    height: 36px;
  }

  .carousel__prev:hover,
  .carousel__next:hover {
    color: #fff;
  }
}
</style>
