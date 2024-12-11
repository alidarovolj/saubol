<script setup>
import { useAddressesStore } from '~/store/addresses.js';
import { IconArrowLeft } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const modals = useModalsStore();

const addresses = useAddressesStore();
const { resultAddresses } = storeToRefs(addresses);

const pending = ref(true);

onMounted(async () => {
  await nextTick();
  await addresses.listAddresses();
  pending.value = false;
});

useHead({
  title: 'Адреса | SaubolMed',
  meta: [
    {
      property: 'og:title',
      content: 'Адреса | SaubolMed',
    },
    {
      property: 'og:url',
      content: route.fullPath,
    },
  ],
  link: [{ rel: 'canonical', href: 'https://saubolmed.kz/' }],
});
</script>

<template>
  <div
    class="bg-white p-5 rounded-lg flex flex-col gap-1"
    style="box-shadow: 0px 4px 20px 0px #0000001a">
    <NuxtLoadingIndicator color="#3E46FF" />
    <DelayHydration>
      <div v-if="!pending">
        <div class="block md:flex justify-between items-center mb-10">
          <div class="flex items-center gap-3 mb-3 md:mb-0">
            <button
              class="block lg:hidden"
              @click="router.push('/profile')">
              <IconArrowLeft :size="24" />
            </button>
            <p class="text-2xl font-bold">Адресная книга</p>
          </div>
          <button
            class="bg-mainColor text-center text-white py-3 px-16 rounded-md w-full md:w-auto"
            @click="modals.showModal('createAddress')">
            + Добавить адрес
          </button>
        </div>
        <p
          v-if="resultAddresses.data.length === 0"
          class="text-red-500 text-center my-10">
          У вас нет адресов
        </p>
        <div
          v-else
          class="flex flex-wrap gap-3">
          <div
            v-for="(item, index) of resultAddresses.data"
            :key="index"
            class="w-full md:w-1/3 p-5 bg-gray-100 rounded-lg">
            <p class="text-lg font-bold mb-5">
              {{ item.address.title }}
            </p>
            <div class="flex gap-3">
              <button class="text-mainColor">Редактировать</button>
              <button class="text-red-500">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <Spinner v-else />
    </DelayHydration>
  </div>
</template>
