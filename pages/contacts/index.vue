<script setup>
const links = [{
  title: "Главная",
  link: "/"
}, {
  title: "Контакты",
  link: "/contacts"
}]
</script>

<template>
  <div class="pt-8">
    <div class="container mx-auto px-4 lg:px-0 mb-14">
      <Breadcrumbs :links="links"/>
    </div>
    <ContactsBlock />
  </div>
</template>