<script setup>

import { IconAddressBook, IconUserCircle, IconLogout, IconClipboardHeart } from '@tabler/icons-vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const router = useRouter()

const user = useUserStore();

const links = computed(() => [
 {
  id:1,
  icon:IconUserCircle,
  to:'/profile/user',
  title: 'Мои данные'
 },
 {
  id:2,
  icon:IconClipboardHeart,
  to:'/profile/orders',
  title: 'Мои заказы'
 },
 {
  id:3,
  icon:IconAddressBook,
  to:'/profile/addresses',
  title: 'Мои адреса'
 },
])

const breadcrumbs = ref([
 {
  link: '/',
  title: 'Главная'
 },
 {
  title: computed(() => links.value.find(link => link.to === route.fullPath)?.title || 'Профиль'),
 }
])

const logout = async () => {
 // TODO: Неправильная реализация переделать
 await user.logoutProfile();
 await router.push('/');
 await user.getProfile();
};

useHead({
 title: 'Профиль | SaubolMed',
 meta: [
  {
   property: 'og:title',
   content: 'Профиль | SaubolMed',
  },
  {
   property: 'og:url',
   content: route.fullPath,
  },
 ],
 link: [{ rel: 'canonical', href: 'https://saubolmed.kz/' }],
});

</script>

<template>
  <div class="container mx-auto px-4 md:px-0 mt-8">
    <Breadcrumbs
      :links="breadcrumbs"
      class="mb-4" />
    <div class="block lg:flex mt-6">
      <div
        :class="{'hidden lg:block': route.name !== 'profile' }"
        class="w-full md:w-1/5 mr-0 lg:mr-6">
        <div
          style="box-shadow: 0px 4px 20px 0px #0000001a"
          class="bg-white p-2 rounded-lg flex flex-col gap-1">
          <div>
            <div class="prof_links flex flex-col gap-[1px]">
              <NuxtLink
                v-for="link of links"
                :key="link.id"
                :to="link.to"
                class="flex py-[13px] px-3 text-left rounded-lg hover:text-primary50 hover:bg-primary100 cursor-pointer">
                <component
                  :is="link.icon"
                  class="mr-3 w-max block" />
                <p class="w-full">
                  {{ link.title }}
                </p>
              </NuxtLink>
            </div>
            <div
              class="flex py-[13px] px-3 cursor-pointer text-red-500 "
              @click="logout">
              <IconLogout class="mr-3" />
              <p>Выйти</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/5">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped>
.prof_links a.router-link-exact-active {
 background: #fe2c3945;
 color: #FD586B
}

.prof_links a:hover{
 opacity: 0.9;
 color: #FD586B;
 background: #fe2c3945;
}
</style>