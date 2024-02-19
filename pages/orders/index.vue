<script setup>
import {IconDots, IconCheck, IconX} from "@tabler/icons-vue"

const admin = useAdminStore()
const {resultOrders} = storeToRefs(admin)

const pickedOrder = ref(null)

onMounted(async () => {
  await nextTick()
  await admin.adminOrders()
})
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl font-semibold mb-5">
      Заказы
    </h1>
    <div
        v-if="resultOrders"
        class="overflow-x-auto lg:overflow-hidden">
      <table class="table table-xs lg:table-sm z-2">
        <thead class="font-bold text-xs uppercase">
        <tr class="border-t">
          <th class="border-r">Номер заказа</th>
          <th class="border-r">Пользователь</th>
          <th class="border-r">Дата создания</th>
          <th class="border-r">Статус</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody class="text-xs">
        <tr
            :class="{ 'bg-cardBg': index % 2 === 1 }"
            v-for="(item, index) of resultOrders.data"
            :key="index"
        >
          <td class="border-r">
            <p class="mb-1 font-semibold">
              #{{ item.order_number }}
            </p>
          </td>
          <td class="border-r">
            <p class="mb-1">
              {{ item.user.name }}
            </p>
          </td>
          <td class="border-r">
            <p class="mb-1">
              {{ item.created_at }}
            </p>
          </td>
          <td class="border-r">
            <p
                v-if="item.status === 'pending'"
                class="mb-1 bg-yellow-200 w-max px-4 py-1 rounded-md">
              Ожидается
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
                      v-if="resultOrders.status === 'pending'"
                      @click="() => (pickedOrder = item)"
                      onclick="change_status.showModal()"
                      class="bg-buyerMenuBg px-1 py-1 rounded-lg block"
                  >
                    <IconCheck v-if="!item.enabled" class="cursor-pointer" :size="18"/>
                    <IconX v-else class="cursor-pointer"/>
                  </button>
                </div>
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
</template>