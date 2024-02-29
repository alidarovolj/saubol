<script setup>
import { IconChevronRight } from "@tabler/icons-vue"
import {useInventoryStore} from "~/store/inventory.js";

const pending = ref(true)
const loading = ref(false)

const inventory = useInventoryStore()
const {result} = storeToRefs(inventory)

const pickedCategory = ref(0)

onMounted(async () => {
  await nextTick()
  await inventory.listInventory()
  pending.value = false
})
</script>

<template>
  <div class="relative">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="block">
        <div class="w-full mb-4 flex items-center justify-between">
          <h2 class="text-lg lg:text-2xl text-mainColor font-semibold">
            Аренда инвентаря
          </h2>
          <NuxtLink
              to="/inventory"
              class="flex items-center rounded-lg shadow py-2 px-3 bg-white text-mainColor text-sm"
          >
            <span>Посмотреть все товары</span>
            <IconChevronRight class="text-mainColor" size="20"/>
          </NuxtLink>
        </div>
        <div
            v-if="!pending"
            class="w-full">
          <div class="block lg:flex gap-2 w-full">
            <div
                v-for="(item, index) of result.data.slice(0, 4)"
                :key="index"
                class="w-full rounded-2xl bg-white p-3 mb-5 text-mainColor hover:text-white transition-all cursor-pointer"
                style="box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.05);"
            >
              <div class="flex flex-col justify-between h-full">
                <p class="font-semibold mb-3 text-black text-sm">
                  {{ item.name }}
                </p>
                <div class="bg-white px-4 py-1 rounded-xl mr-4">
                  <img
                      class="w-full"
                      :src="item.img"
                      alt="">
                </div>
                <div class="font-medium">
                  <NuxtLink
                      class="bg-[#E7F0FF] text-mainColor text-sm rounded-lg px-3 py-2 mt-3 w-full block text-center"
                      to="/services">
                    Подробнее
                  </NuxtLink>
<!--                  <NuxtLink-->
<!--                      class="bg-mainColor text-white text-sm rounded-lg px-3 py-2 mt-3 w-full block text-center"-->
<!--                      to="/services">-->
<!--                    В корзину-->
<!--                  </NuxtLink>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>