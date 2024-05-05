<script setup>
import { ref, watchEffect } from 'vue';
import landingPage from "@/components/mainPage/landingPage.vue";
import dashboardPage from "@/components/mainPage/dashboard.vue";

const auth = useAuthStore()
auth.initCookieToken()
const { token } = storeToRefs(auth)

const ComponentToRender = ref(landingPage);

watchEffect(() => {
  ComponentToRender.value = token.value ? dashboardPage : landingPage;
});

</script>

<template>
  <div>
    <component :is="ComponentToRender" />
  </div>
</template>