<script setup>
const route = useRoute();
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
  <div>

  </div>
</template>