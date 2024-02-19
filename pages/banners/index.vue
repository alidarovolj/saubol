<script setup>
import {IconDots, IconCheck, IconX} from "@tabler/icons-vue"
import {useBannersStore} from "~/store/banners.js";

const banners = useBannersStore()
const {resultBanners} = storeToRefs(banners)

const pickerBanner = ref(null)

onMounted(async () => {
  await nextTick()
  await banners.adminBanners()
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-4xl font-semibold">
        Баннера
      </h1>
      <button
          onclick="createBanner.showModal()"
          class="bg-mainColor px-10 py-2 rounded-lg block text-white w-max"
      >
        Добавить баннер
      </button>
    </div>
    <div
        v-if="resultBanners"
        class="overflow-x-auto lg:overflow-hidden">
      <table class="table table-xs lg:table-sm z-2">
        <thead class="font-bold text-xs uppercase">
        <tr class="border-t">
          <th class="border-r">ID</th>
          <th class="border-r">Картинка</th>
          <th class="border-r">Текст</th>
          <th class="border-r">Дата создания</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody class="text-xs">
        <tr
            :class="{ 'bg-cardBg': index % 2 === 1 }"
            v-for="(item, index) of resultBanners"
            :key="index"
        >
          <td class="border-r">
            {{ item.id }}
          </td>
          <td class="border-r">
            <img
                class="w-auto h-16 rounded-lg object-contain"
                :src="item.img"
                alt="">
          </td>
          <td class="border-r">
            <p class="mb-1">
              {{ item.text }}
            </p>
          </td>
          <td class="border-r">
            <p class="mb-1">
              {{ item.created_at }}
            </p>
          </td>
          <td>
            <div class="dropdown dark:text-black">
              <div tabindex="0" class="bg-gray-200 p-1 rounded-md m-1">
                <IconDots class="cursor-pointer" :size="18"/>
              </div>
              <div
                  tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
              >
                <!--                <div class="flex gap-2">-->
                <!--                  <button-->
                <!--                      v-if="banners.status === 'pending'"-->
                <!--                      @click="() => (pickerBanner = item)"-->
                <!--                      onclick="change_status.showModal()"-->
                <!--                      class="bg-buyerMenuBg px-1 py-1 rounded-lg block"-->
                <!--                  >-->
                <!--                    <IconCheck v-if="!item.enabled" class="cursor-pointer" :size="18"/>-->
                <!--                    <IconX v-else class="cursor-pointer"/>-->
                <!--                  </button>-->
                <!--                </div>-->
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div v-for="(item, index) of 10" :key="index" class="flex justify-between mb-5">
        <div class="skeleton w-fifth h-4"></div>
        <div class="skeleton w-fifth h-4"></div>
        <div class="skeleton w-fifth h-4"></div>
        <div class="skeleton w-fifth h-4"></div>
        <div class="skeleton w-fifth h-4"></div>
      </div>
    </div>
  </div>
  <CreateBanner />
</template>