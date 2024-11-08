<script setup>
import {
  IconDisabled,
  IconFileSearch,
  IconMicroscope,
  IconNurse,
  IconStethoscope,
  IconVaccine,
} from "@tabler/icons-vue";
import {useOrdersStore} from "~/store/orders.js";

const pending = ref(true);

const orders = useOrdersStore();

const columns = ref([
  {name: "Услуга", fname: "name"},
  {name: "Дата", fname: "date.day"},
]);

onMounted(async () => {
  await nextTick();
  await orders.listOrders();
  pending.value = false;
});
</script>

<template>
  <div class="pt-4 md:pt-8">
    <div class="container mx-auto px-4 md:px-0">
      <div class="block md:flex items-start gap-6">
        <div class="w-full md:w-3/4">
          <h2 class="text-xl font-semibold mb-4">Услуги</h2>
          <div
              class="flex flex-wrap justify-between md:flex-nowrap md:gap-4 mb-4"
          >
            <NuxtLink
                class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
                to="/services/med-services"
            >
              <div class="w-max bg-[#0065FF] rounded-lg text-white">
                <IconNurse class="m-3" size="20"/>
              </div>
              <p class="font-semibold">Мед услуги</p>
              <img
                  alt=""
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/1.png"
              />
            </NuxtLink>
            <NuxtLink
                class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
                to="/services/doctors"
            >
              <div class="w-max bg-[#FEAA48] rounded-lg text-white">
                <IconStethoscope class="m-3" size="20"/>
              </div>
              <p class="font-semibold">Запись к врачу</p>
              <img
                  alt=""
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/2.png"
              />
            </NuxtLink>
            <NuxtLink
                class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
                to="/services/tests"
            >
              <div class="w-max bg-[#FD586B] rounded-lg text-white">
                <IconMicroscope class="m-3" size="20"/>
              </div>
              <p class="font-semibold">Анализы</p>
              <img
                  alt=""
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/3.png"
              />
            </NuxtLink>
            <NuxtLink
                class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
                to="/services/inventory"
            >
              <div class="w-max bg-[#CF0CE0] rounded-lg text-white">
                <IconDisabled class="m-3" size="20"/>
              </div>
              <p class="font-semibold">Аренда инвентаря</p>
              <img
                  alt=""
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/4.png"
              />
            </NuxtLink>
            <NuxtLink
                class="mb-1 md:mb-0 relative h-[228px] w-half md:w-full border rounded-lg p-5 flex flex-col justify-between"
                to="/services/detox"
            >
              <div class="w-max bg-[#0CE07A] rounded-lg text-white">
                <IconVaccine class="m-3" size="20"/>
              </div>
              <p class="font-semibold">Детокс</p>
              <img
                  alt=""
                  class="absolute right-0 bottom-0"
                  src="@/assets/img/servicesVectors/5.png"
              />
            </NuxtLink>
          </div>
          <BannersCarousel/>
        </div>
        <div class="w-full md:w-1/4">
          <div v-if="orders.result" class="p-5 border rounded-lg mb-6">
            <p class="text-2xl font-bold text-mainColor mb-5">
              Записи к услугам
            </p>
            <div v-if="orders.result.length === 0" class="py-16">
              <IconFileSearch class="text-[#DFDFDF] mx-auto" size="140"/>
              <p class="text-[#DFDFDF] text-center">У вас пока нет записей</p>
            </div>
            <div v-else>
              <TableComponent
                  :columns="columns"
                  :numbered="true"
                  :source="orders.result"
                  @refreshTable="orders.listOrders()"
              >
                <template #default="{ row, column }">
                  <template v-if="column.name === 'Номер заявки'">
                    <div>
                      <NuxtLink
                          :to="'/profile/orders/' + row.id"
                          class="text-primary50 cursor-pointer"
                      >
                        {{ row.id }}
                      </NuxtLink>
                    </div>
                  </template>
                  <template v-if="column.fname === 'status'">
                    <div
                        class="flex items-center bg-yellow-200 w-max p-2 rounded-md"
                    >
                      <p class="flex gap-2 items-center text-sm w-max">
                        {{ row.status }}
                      </p>
                    </div>
                  </template>
                </template>
              </TableComponent>
            </div>
          </div>
          <div v-else class="p-5 border rounded-lg mb-6">
            <p class="text-2xl font-bold text-mainColor mb-5">
              Записи к услугам
            </p>
            <div class="py-16">
              <div class="spinner p-10"></div>
            </div>
          </div>
          <div class="p-5 border rounded-lg">
            <p class="text-2xl font-bold text-mainColor mb-5">
              Результаты анализов
            </p>
            <div class="py-16">
              <IconMicroscope class="text-[#DFDFDF] mx-auto" size="140"/>
              <p class="text-[#DFDFDF] text-center">
                У вас пока нет результатов
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
