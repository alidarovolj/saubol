<script setup>
import {IconMenu2, IconUserCircle} from "@tabler/icons-vue"

const route = useRoute();

const user = useUserStore()
const {result} = storeToRefs(user)

const formattedName = computed(() => {
  if (result.value && result.value.data && result.value.data.name) {
    return result.value.data.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
  }
  return '';
});

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
          <!--          <div class="block lg:hidden">-->
          <!--            <div class="drawer">-->
          <!--              <input-->
          <!--                  id="my-drawer"-->
          <!--                  type="checkbox"-->
          <!--                  class="drawer-toggle"-->
          <!--              />-->
          <!--              <div class="drawer-content">-->
          <!--                <label for="my-drawer">-->
          <!--                  <IconMenu2-->
          <!--                      size="20"-->
          <!--                      class="mr-3"-->
          <!--                  />-->
          <!--                </label>-->
          <!--              </div>-->
          <!--              <div class="drawer-side">-->
          <!--                <label-->
          <!--                    for="my-drawer"-->
          <!--                    aria-label="close sidebar"-->
          <!--                    class="drawer-overlay">-->

          <!--                </label>-->
          <!--                <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">-->
          <!--                  <li-->
          <!--                      v-for="(item, index) of links"-->
          <!--                      :key="index">-->
          <!--                    <NuxtLink-->
          <!--                        :to="item.url"-->
          <!--                        class="text-lg">-->
          <!--                      {{ item.name }}-->
          <!--                    </NuxtLink>-->
          <!--                  </li>-->
          <!--                </ul>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <NuxtLink to="/">
            <img
                class="w-7 h-7 lg:w-12 lg:h-12"
                src="@/assets/img/logo.png"
                alt=""
            >
          </NuxtLink>
        </div>
        <div class="hidden lg:flex gap-10">
          <NuxtLink to="/">
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
                <NuxtLink to="/services/detox">
                  Процедуры детокс
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/services/tests">
                  Сдать анализы
                </NuxtLink>
              </li>
            </ul>
          </div>
          <NuxtLink to="/">
            Контакты
          </NuxtLink>
          <NuxtLink to="/">
            О нас
          </NuxtLink>
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
                <div class="relative w-10 h-10 bg-mainColor bg-opacity-20 rounded-full">
                  <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-mainColor">
                    {{ formattedName }}
                  </p>
                </div>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Профиль</a></li>
                <li @click="logoutLocal"><a>Выйти</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>