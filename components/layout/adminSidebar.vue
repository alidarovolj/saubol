<script setup>
import {IconChevronLeft} from "@tabler/icons-vue"
import {storeToRefs} from "pinia";

const runtimeConfig = useRuntimeConfig()
const router = useRouter()

const user = useUserStore()
const {result} = storeToRefs(user)

const logoutLocal = async () => {
  await user.logoutProfile()
  await user.getProfile()
  router.push('/')
}

const request = ref({
  title: "",
  description: "",
  prepare: "", // Подготовка
  indications : "", // показания
  interpretation: "", // интерпретация
})

const links = [
  {
    title: "Админы",
    link: "/admin"
  },
  {
    title: "Пользователи",
    link: "/users"
  },
  {
    title: "Анализы",
    link: "/domo-lab"
  },
  {
    title: "Доктора",
    link: "/doctors"
  },
  {
    title: "Мед-сестры",
    link: "/nurses"
  },
  {
    title: "Заказы",
    link: "/orders"
  },
  {
    title: "Баннера",
    link: "/banners"
  },
  {
    title: "Услуги",
    link: "/services"
  },
]
</script>

<template>
  <div class="h-full">
    <div class="w-full h-full flex flex-col justify-between border-r p-10 pr-6">
      <div>
        <NuxtLink class="text-2xl font-bold mb-10 block" to="/admin">
          <img alt="" class="mb-12 w-full" src="@/assets/img/main-color-logo.svg">
        </NuxtLink>
        <div class="flex flex-col adminLinks">
          <NuxtLink
              v-for="(link, index) in links"
              :key="index"
              :to="link.link"
              class="text-sm mb-3 font-medium block uppercase p-3 hover:bg-[#F0F0F0] transition-all rounded-lg"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <div class="dropdown dropdown-top mb-6">
          <div
              class="text-sm border px-4 py-2 rounded-lg hover:bg-mainColor hover:text-white transition-all"
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
          <ul
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-4 text-black"
              tabindex="0">
            <li @click="logoutLocal"><a>Выйти</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.adminLinks a.router-link-active,
.adminLinks a.router-link-exact-active {
  background: #d0d0d0;
}
</style>