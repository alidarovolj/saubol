<script setup>
const links = ref([
  {
    name: "Новости",
    url: "/",
  },
  {
    name: "Услуги",
    url: "/",
  },
  {
    name: "Контакты",
    url: "/",
  },
  {
    name: "О нас",
    url: "/",
  },
]);
</script>

<template>
  <div
      class="py-4 absolute top-0 left-0 z-50 w-full bg-white"
      style="box-shadow: 0px 4px 15px 0px rgba(57, 121, 245, 0.15);">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex justify-between items-center">
        <img src="@/assets/img/logo.png" alt="">
        <div class="hidden lg:flex gap-10 text-mainColor">
          <NuxtLink
              v-for="(item, index) of links"
              :key="index"
              :to="item.url">
            {{ item.name }}
          </NuxtLink>
        </div>
        <NuxtLink to="/" class="bg-mainColor text-white py-3 px-16 rounded">
          Войти
        </NuxtLink>
      </div>
    </div>
  </div>
</template>