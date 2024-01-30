<script setup>
import Header from "~/components/layout/header.vue";

const route = useRoute()

const user = useUserStore()
const {result} = storeToRefs(user)

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="relative pt-16">
    <div>
      <svg
          class="w-full h-full absolute left-0 top-0 fillSvg z-20"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="4389"
          viewBox="0 0 648 4389"
          preserveAspectRatio="none"
          fill="none">
        <path opacity="0.4" d="M0 -2H648V4596H0V-2Z" fill="url(#paint0_linear_397_9072)"/>
        <defs>
          <linearGradient id="paint0_linear_397_9072" x1="-4.82798e-06" y1="2297" x2="648" y2="2297"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#3979F5"/>
            <stop offset="0.000296296" stop-color="#3979F5" stop-opacity="0.893471"/>
            <stop offset="0.00237037" stop-color="#3979F5" stop-opacity="0.814432"/>
            <stop offset="0.008" stop-color="#3979F5" stop-opacity="0.757854"/>
            <stop offset="0.018963" stop-color="#3979F5" stop-opacity="0.718706"/>
            <stop offset="0.037037" stop-color="#3979F5" stop-opacity="0.69196"/>
            <stop offset="0.064" stop-color="#3979F5" stop-opacity="0.672585"/>
            <stop offset="0.10163" stop-color="#3979F5" stop-opacity="0.655552"/>
            <stop offset="0.151704" stop-color="#3979F5" stop-opacity="0.63583"/>
            <stop offset="0.216" stop-color="#3979F5" stop-opacity="0.60839"/>
            <stop offset="0.296296" stop-color="#3979F5" stop-opacity="0.568202"/>
            <stop offset="0.39437" stop-color="#3979F5" stop-opacity="0.510237"/>
            <stop offset="0.512" stop-color="#3979F5" stop-opacity="0.429463"/>
            <stop offset="0.650963" stop-color="#3979F5" stop-opacity="0.320853"/>
            <stop offset="0.813037" stop-color="#3979F5" stop-opacity="0.179375"/>
            <stop offset="1" stop-color="#3979F5" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
      <img
          class="w-full h-max absolute left-0 top-1/2 -translate-y-1/2 object-cover z-10"
          src="@/assets/img/mainPage/team/bg.png"
          alt="">
      <Header/>
    </div>
    <div class="relative z-30">
      <slot/>
    </div>
    <div v-if="!route.fullPath.includes('/auth')">
      <BecomeMember/>
      <img
          class="absolute left-0 bottom-0 h-auto w-full"
          src="@/assets/img/member/lines.png"
          alt=""
      >
      <News/>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
.fillSvg {
  fill: linear-gradient(90deg, #3979F5 0%, rgba(57, 121, 245, 0.89) 0.03%, rgba(57, 121, 245, 0.81) 0.24%, rgba(57, 121, 245, 0.76) 0.8%, rgba(57, 121, 245, 0.72) 1.9%, rgba(57, 121, 245, 0.69) 3.7%, rgba(57, 121, 245, 0.67) 6.4%, rgba(57, 121, 245, 0.66) 10.16%, rgba(57, 121, 245, 0.64) 15.17%, rgba(57, 121, 245, 0.61) 21.6%, rgba(57, 121, 245, 0.57) 29.63%, rgba(57, 121, 245, 0.51) 39.44%, rgba(57, 121, 245, 0.43) 51.2%, rgba(57, 121, 245, 0.32) 65.1%, rgba(57, 121, 245, 0.18) 81.3%, rgba(57, 121, 245, 0.00) 100%);
  opacity: 0.4;
}
</style>