<script setup lang="ts">
const { $anime } = useNuxtApp();

// Setting up the animation
const animation = $anime({
  targets: '.title',
  translateY: 500,
  duration: 1000,
  easing: 'easeInOutQuad',
  autoplay: false,
});

// Querying the progress element and asserting its type
const seekProgressEl = document.querySelector('.seek-anim-demo .progress');
const inputElement = seekProgressEl as HTMLInputElement | null;

// Adding an input event listener if the element exists
if (inputElement) {
  inputElement.oninput = function() {
    // Seeking the animation based on the input value
    animation.seek(animation.duration * (inputElement.valueAsNumber / 100));
  };
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