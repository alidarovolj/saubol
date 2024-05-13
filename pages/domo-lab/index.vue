<script setup>
import {IconDots, IconCheck, IconX, IconEdit} from "@tabler/icons-vue"
import {useAnalyzisesStore} from "~/store/analyzises.js";

const analyzises = useAnalyzisesStore()
const {result} = storeToRefs(analyzises)

const pickedAnalyzis = ref(null)

const setChange = (item) => {
  pickedAnalyzis.value = item
  changeAnalyze.showModal()
}

onMounted(async () => {
  await nextTick()
  await analyzises.analyzisesList()
})
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl font-semibold mb-5">
      Анализы
    </h1>
    <div v-if="result">
      <table class="table table-xs lg:table-sm z-2 mb-3">
        <thead class="font-bold text-xs uppercase">
        <tr class="border-t">
          <th class="border-r">ID</th>
          <th class="border-r">Имя</th>
          <th class="border-r">Категория</th>
          <th class="border-r">Цена</th>
          <th class="border-r">Статус</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody class="text-xs">
        <tr
            :class="{ 'bg-cardBg': index % 2 === 1 }"
            v-for="(item, index) of result.data"
            :key="index"
        >
          <td class="border-r">
            <p class="mb-1">
              {{ item.id }}
            </p>
          </td>
          <td class="border-r">
            <p class="mb-1 font-semibold">
              {{ item.name }}
            </p>
          </td>
          <td class="border-r">
            <p class="mb-1">
              {{ item.category.name }}
            </p>
          </td>
          <td class="border-r">
            <p class="mb-1">
              {{ item.price }}
            </p>
          </td>
          <td class="border-r">
            <p
                v-if="item.is_active"
                class="py-2 rounded bg-green-200 w-max px-4">
              Активирован
            </p>
            <p
                v-else
                class="py-2 rounded bg-red-200 w-max px-4">
              Деактивирован
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
                <div class="flex gap-2">
                  <button
                      onclick="change_status.showModal()"
                      class="bg-buyerMenuBg px-1 py-1 rounded-lg block"
                  >
                    <IconCheck v-if="!item.enabled" class="cursor-pointer" :size="18"/>
                    <IconX v-else class="cursor-pointer"/>
                  </button>
                  <NuxtLink
                      :to="`/domo-lab/edit/${item.id}`"
                      class="bg-buyerMenuBg px-1 py-1 rounded-lg block w-max"
                  >
                    <IconEdit class="cursor-pointer" :size="18"/>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <Pagination
          :pages-data="result.meta"
          @first-link="analyzises.analyzisesList"/>

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
  <ChangeAnalyze :pickedItem="pickedAnalyzis"/>
</template>