<script setup>
const props = defineProps(['links'])
</script>

<template>
  <div class="text-sm breadcrumbs dark:text-dText">
    <ul>
      <li
        v-for="(item, index) of props.links"
        :key="index">
        <NuxtLink
          v-if="item.link"
          :to="item.link"
          class="uppercase text-xs text-inner_head dark:text-dText">
          {{ item.title }}
        </NuxtLink>
        <span
          v-else
          class="uppercase text-xs text-inner_head text-mainColor">
          {{item.title}}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
html.dark .breadcrumbs > ul > li + *:before,
html.dark .breadcrumbs > ol > li + *:before {
  color: #fff;
}
</style>