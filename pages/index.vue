<script setup>
import Hero from "~/components/mainPage/hero.vue";

const route = useRoute()

useHead({
  title: "Главная страница | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Главная страница | SaubolMed",
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
  <div>
    <Hero/>
    <ServicesTypes />
    <AnimationBlock />
  </div>
</template>