<script setup>
const layout = ref("profile");
const route = useRoute();

const user = useUserStore();
const { result } = storeToRefs(user);

const links = ref([
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Профиль",
    link: "/profile",
  },
]);

onMounted(async () => {
  await nextTick();
  await user.getProfile();
});

useHead({
  title: "Профиль | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Профиль | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{ rel: "canonical", href: "https://saubolmed.kz/" }],
});
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 md:px-0">
      <Breadcrumbs class="mb-4" :links="links" />
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator color="#3E46FF" />
        <DelayHydration>
          <div></div>
        </DelayHydration>
      </NuxtLayout>
    </div>
  </div>
  <SetImage />
</template>
