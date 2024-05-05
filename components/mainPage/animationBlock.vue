<template>
  <div>
    <div id="bound-two" class="scroll-bound" ref="boundRef">
      <div class="content">
        <video class="block lg:hidden" width="600" muted preload playsinline ref="videoRef1">
          <source src="@/assets/videos/mobVideo.mp4" type="video/mp4">
          <p>Your user agent does not support the HTML5 Video element.</p>
        </video>
        <video class="hidden lg:block" width="600" muted preload playsinline ref="videoRef2">
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
    const videoRef1 = ref(null);
    const videoRef2 = ref(null);

    let animationFrameId = null;

    const scrollVideo = () => {
      // Cancel the previous frame if it's already set.
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      // Request a new frame.
      animationFrameId = requestAnimationFrame(() => {
        const videoRef = window.innerWidth >= 1024 ? videoRef2 : videoRef1; // Choose the video based on the window width

        if (videoRef.value && videoRef.value.duration) {
          const boundRect = boundRef.value.getBoundingClientRect();
          const scrollBoundTop = boundRect.top + window.pageYOffset; // Use pageYOffset instead of scrollY
          const scrollBoundBottom = scrollBoundTop + boundRect.height;

          if (window.pageYOffset >= scrollBoundTop && window.pageYOffset < scrollBoundBottom) { // Use pageYOffset instead of scrollY
            const rawPercentScrolled = (window.pageYOffset - scrollBoundTop) / (boundRect.height - window.innerHeight); // Use pageYOffset instead of scrollY
            const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
            videoRef.value.currentTime = videoRef.value.duration * percentScrolled;
          }
        }
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', scrollVideo);
    });

    return {
      boundRef,
      videoRef1,
      videoRef2,
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
