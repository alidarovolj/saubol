<script setup>
import {IconUserCircle} from "@tabler/icons-vue"

const route = useRoute();

const user = useUserStore()
const {result} = storeToRefs(user)

const cart = useCartStore()

const links = ref([
  {
    title: 'Новости',
    link: '/news'
  },
  {
    title: 'Услуги',
    link: '/services/doctors'
  },
  {
    title: 'Контакты',
    link: '/contacts'
  },
  {
    title: 'О нас',
    link: '/about'
  }
])

const logoutLocal = async () => {
  await user.logoutProfile()
  await user.getProfile()
}
</script>

<template>
  <div
      class="py-4 absolute top-0 left-0 z-50 w-full bg-white"
      style="box-shadow: 0px 4px 15px 0px rgba(57, 121, 245, 0.15);">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/">
            <img
                class="w-7 h-7 lg:w-12 lg:h-12"
                src="@/assets/img/logo.png"
                alt=""
            >
          </NuxtLink>
        </div>
        <div class="hidden lg:flex gap-10">
          <NuxtLink to="/news">
            Новости
          </NuxtLink>
          <div class="dropdown">
            <div
                tabindex="0"
                role="button"
                :class="{ 'text-mainColor' : route.fullPath.includes('/services') }"
            >
              Услуги
            </div>
            <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NuxtLink to="/services/doctors">
                  Доктора
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/services/med-services">
                  Мед-услуги
                </NuxtLink>
              </li>
            </ul>
          </div>
          <NuxtLink to="/contacts">
            Контакты
          </NuxtLink>
          <NuxtLink to="/about">
            О нас
          </NuxtLink>
        </div>
        <div class="flex items-center gap-5">
          <div>
            <div v-if="result">
              <div class="dropdown">
                <div tabindex="0" role="button" class="flex items-center gap-3 text-mainColor">
                  <p class="text-sm">
                    {{ result.data.name }}
                  </p>
                  <IconUserCircle size="24" />
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <NuxtLink to="/profile">Профиль</NuxtLink>
                  </li>
                  <li @click="logoutLocal"><a>Выйти</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>