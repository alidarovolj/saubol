<template>
  <client-only>
    <div>
      <div id="bound-two" class="scroll-bound" ref="boundRef">
        <div class="content">
          <video
            class="block md:hidden"
            width="600"
            muted
            autoplay
            preload
            playsinline
            ref="videoRef1"
          >
            <source src="@/assets/videos/mobVideo.mp4" type="video/mp4" />
            <p>Your user agent does not support the HTML5 Video element.</p>
          </video>
          <video
            class="hidden md:block"
            width="600"
            muted
            preload
            playsinline
            ref="videoRef2"
          >
            <source src="@/assets/videos/mainPage.mp4" type="video/mp4" />
            <p>Your user agent does not support the HTML5 Video element.</p>
          </video>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const boundRef = ref(null);
    const videoRef1 = ref(null);
    const videoRef2 = ref(null);

    let animationFrameId = null;
    let isMobile = false;

    const scrollVideo = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const videoRef = window.innerWidth >= 1024 ? videoRef2 : videoRef1; // Choose based on screen size

        if (videoRef.value && videoRef.value.duration) {
          const boundRect = boundRef.value.getBoundingClientRect();
          const scrollBoundTop = boundRect.top + window.pageYOffset;
          const scrollBoundBottom = scrollBoundTop + boundRect.height;

          if (
            window.pageYOffset >= scrollBoundTop &&
            window.pageYOffset < scrollBoundBottom
          ) {
            const rawPercentScrolled =
              (window.pageYOffset - scrollBoundTop) /
              (boundRect.height - window.innerHeight);
            const percentScrolled = Math.min(
              Math.max(rawPercentScrolled, 0),
              1
            );
            videoRef.value.currentTime =
              videoRef.value.duration * percentScrolled;
          }
        }
      });
    };

    onMounted(() => {
      // Detect mobile device only after the component has mounted
      isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // Mobile-specific interaction to ensure video control works
      if (isMobile) {
        const triggerInteraction = () => {
          window.addEventListener("scroll", scrollVideo);
          window.removeEventListener("touchstart", triggerInteraction);
          window.removeEventListener("click", triggerInteraction);
        };

        window.addEventListener("touchstart", triggerInteraction);
        window.addEventListener("click", triggerInteraction);
      } else {
        // For desktop, no need for interaction, just directly handle scroll
        window.addEventListener("scroll", scrollVideo);
      }
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", scrollVideo);
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
