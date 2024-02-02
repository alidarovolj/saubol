<script setup>
import Hero from "~/components/mainPage/hero.vue";
import Services from "~/components/mainPage/services.vue";
import Team from "~/components/mainPage/team.vue";
import Products from "~/components/mainPage/products.vue";
import Lab from "~/components/mainPage/lab.vue";

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
    <Services class="mb-24"/>
    <Team class="mb-24" />
    <Products class="mb-24" />
    <Lab />
  </div>
</template>