<script setup lang="ts">
const {$anime} = useNuxtApp()

onMounted(() => {
  window.addEventListener('scroll', updateLeftStyle);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateLeftStyle);
});

function updateLeftStyle() {
  const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  $anime({
    targets: '.title',
    marginLeft: [`${50 - (scrollPercentage * 50)}%`, '0%'],
    duration: 1000,
    easing: 'linear'
  });
}
</script>

<template>
  <div>
    <div class="container mx-auto px-4 lg:px-0">
      <div class="h-[5000px] relElement">
        <div class="sticky top-10">
          <img
              class="title"
              src="@/assets/img/animationBlock/phone.png"
              alt="">
        </div>
      </div>
    </div>
  </div>
</template>