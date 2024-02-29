<script setup>
import {IconMenu2, IconUserCircle, IconShoppingBag} from "@tabler/icons-vue"

const route = useRoute();

const user = useUserStore()
const {result} = storeToRefs(user)

const cart = useCartStore()

const openedDrawer = ref(false)

const formattedName = computed(() => {
  if (result.value && result.value.data && result.value.data.name) {
    return result.value.data.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
  }
  return '';
});

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
              <li>
                <NuxtLink to="/inventory">
                  Аренда
                </NuxtLink>
              </li>
<!--              <li>-->
<!--                <NuxtLink to="/services/detox">-->
<!--                  Процедуры детокс-->
<!--                </NuxtLink>-->
<!--              </li>-->
              <li>
                <NuxtLink to="/services/tests">
                  Сдача анализов
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
            <NuxtLink
                v-if="result === false"
                to="/auth/login"
            >
              <IconShoppingBag class="text-mainColor" size="30"/>
            </NuxtLink>
            <div v-else-if="!result">
              <div class="spinner p-2"></div>
            </div>
            <div
                v-else
                class="relative"
            >
              <NuxtLink
                  v-if="result.data"
                  to="/cart">
                <IconShoppingBag class="text-mainColor" size="30"/>
              </NuxtLink>
              <div v-if="cart.result">
                <div
                    v-if="cart.result.count > 0"
                    class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 w-5 h-5 text-xs rounded-full bg-red-500 text-white flex items-center justify-center">
                  <p class="">
                    {{ cart.result.count }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <NuxtLink
              v-if="result === false"
              to="/auth/login"
              class="text-sm lg:text-base bg-mainColor !text-white py-2 lg:py-3 px-8 lg:px-16 rounded">
            Войти
          </NuxtLink>
          <div v-else-if="result === null">
            <div class="spinner p-2"></div>
          </div>
          <div v-else>
            <div v-if="result.data">
              <div class="dropdown">
                <div tabindex="0" role="button" class="flex items-center gap-3">
                  <p class="text-mainColor">{{ result.data.name }}</p>
                  <div
                      v-if="!result.data.img"
                      class="relative w-10 h-10 bg-mainColor bg-opacity-20 rounded-full">
                    <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-mainColor">
                      {{ formattedName }}
                    </p>
                  </div>
                  <img
                      v-else
                      class="w-10 h-10 rounded-full object-cover"
                      :src="result.data.img"
                      alt="">
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
          <div class="block lg:hidden">
            <div class="drawer">
              <input v-model="openedDrawer" id="my-drawer" type="checkbox" class="drawer-toggle"/>
              <div class="drawer-content">
                <!-- Page content here -->
                <label for="my-drawer" class="drawer-button">
                  <IconMenu2/>
                </label>
              </div>
              <div class="drawer-side">
                <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between h-screen">
                  <div>
                    <img
                        class="mb-10"
                        src="@/assets/img/main-color-logo.svg"
                        alt="">
                    <div class="flex flex-col gap-2">
                      <div
                          v-for="(item, index) of links"
                          :key="index"
                          class="text-base"
                      >
                        <NuxtLink :to="item.link">
                          {{ item.title }}
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="dropdown dropdown-top mb-6">
                      <div
                          class=" border px-4 py-2 rounded-lg hover:bg-mainColor hover:text-white transition-all"
                          role="button"
                          tabindex="0">
                        <div v-if="result">
                          <p class="text-sm font-bold">
                            {{ result.data.name }}
                          </p>
                          <p>
                            {{ result.data.email }}
                          </p>
                        </div>
                      </div>
                      <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-4 text-black"
                          tabindex="0">
                        <li @click="logoutLocal"><a>Выйти</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>