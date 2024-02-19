<script setup>
import {IconMenu2} from "@tabler/icons-vue"
import {storeToRefs} from "pinia";

const user = useUserStore()
const {result} = storeToRefs(user)

const router = useRouter()

const logoutLocal = async () => {
  await user.logoutProfile()
  await user.getProfile()
  router.push('/')
}

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
  <div>
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="my-drawer" class="drawer-button absolute left-5 top-5">
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
</template>