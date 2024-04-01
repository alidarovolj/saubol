<template>
  <div>
    <div id="bound-two" class="scroll-bound" ref="boundRef">
      <div class="content">
        <video width="600" muted preload ref="videoRef">
          <source src="@/assets/videos/mainPage.mp4" type="video/mp4">
          <p>Your user agent does not support the HTML5 Video element.</p>
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const boundRef = ref(null);
    const videoRef = ref(null);

    const scrollVideo = () => {
      if (videoRef.value && videoRef.value.duration) {
        const boundRect = boundRef.value.getBoundingClientRect();
        const videoTop = boundRect.top; // Get video's top position relative to viewport
        const videoHeight = boundRect.height;

        const scrollBoundTop = boundRect.top + window.scrollY; // Calculate the top of the scroll-bound element in relation to the entire page
        const scrollBoundBottom = scrollBoundTop + boundRect.height; // Calculate the bottom of the scroll-bound element

        if (window.scrollY >= scrollBoundTop && window.scrollY < scrollBoundBottom) {
          // Calculate percentage scrolled within the scroll-bound element
          const rawPercentScrolled = (window.scrollY - scrollBoundTop) / (boundRect.height - window.innerHeight);
          const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
          videoRef.value.currentTime = videoRef.value.duration * percentScrolled;
        }
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', scrollVideo);
    });

    return {
      boundRef,
      videoRef,
    };
  },
};
</script>

<style scoped>
.scroll-bound {
  height: 500vh;
}
.scroll-bound .content {
  height: 100vh;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.scroll-bound video {
  width: 80%;
}
</style>
