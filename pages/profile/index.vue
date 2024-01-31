<script setup>
import {IconCamera, IconUserCircle, IconLogout, IconAddressBook, IconVaccine, IconEdit} from "@tabler/icons-vue"
import BottomMenu from "~/components/layout/bottomMenu.vue";

const layout = ref("profile");
const route = useRoute()

const user = useUserStore()
const {result} = storeToRefs(user)

const imgFocus = ref(false)

const formattedName = computed(() => {
  if (result.value && result.value.data && result.value.data.name) {
    return result.value.data.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
  }
  return '';
});
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <h1 class="text-6xl font-semibold text-mainColor mb-7">
        Профиль
      </h1>
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator color="#3E46FF"/>
        <DelayHydration>
          <div>
            <div class="flex items-center gap-5">
              <div
                  v-if="result.data.img"
                  @mouseover="imgFocus = true"
                  class="relative"
              >
                <img
                    :src="result.data.img"
                    class="w-20 h-20 rounded-lg object-cover"
                    alt=""
                >
                <button
                    v-if="imgFocus"
                    @mouseleave="imgFocus = false"
                    onclick="setImage.showModal()"
                    class="absolute cursor-pointer left-0 top-0 w-full h-full bg-black bg-opacity-90 rounded-lg flex items-center justify-center z-40">
                  <IconCamera class="text-white" />
                </button>
              </div>
              <div class="flex items-center w-full gap-5">
                <div
                    v-if="!result.data.img"
                    @mouseover="imgFocus = true"
                    class="relative w-20 h-20 bg-mainColor bg-opacity-20 rounded-lg min-w-20"
                >
                  <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-mainColor text-xl">
                    {{ formattedName }}
                  </p>
                  <button
                      v-if="imgFocus"
                      @mouseleave="imgFocus = false"
                      onclick="setImage.showModal()"
                      class="absolute cursor-pointer left-0 top-0 w-full h-full bg-black bg-opacity-90 rounded-lg flex items-center justify-center z-40">
                    <IconCamera class="text-white" />
                  </button>
                </div>
                <div class="w-full flex flex-col justify-between gap-5">
                  <div class="flex items-center justify-between text-mainColor w-full">
                    <h1 class="text-xl font-bold">
                      {{ result.data.name }}
                    </h1>
                    <IconEdit size="24"/>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex flex-col">
                      <p class="text-[#9A9BA4] mb-1">
                        ИИН
                      </p>
                      <p v-if="result.data.iin">
                        {{ result.data.iin }}
                      </p>
                      <p v-else class="text-red-500">
                        Необходимо заполнить
                      </p>
                    </div>
                    <div class="flex flex-col">
                      <p class="text-[#9A9BA4] mb-1">
                        Email
                      </p>
                      <p v-if="result.data.email">
                        {{ result.data.email }}
                      </p>
                      <p v-else class="text-red-500">
                        Необходимо заполнить
                      </p>
                    </div>
                    <div class="flex flex-col">
                      <p class="text-[#9A9BA4] mb-1">
                        Адрес
                      </p>
                      <p v-if="result.data.address">
                        {{ result.data.address }}
                      </p>
                      <p
                          v-else
                          class="text-red-500">
                        Необходимо заполнить
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DelayHydration>
      </NuxtLayout>
    </div>
  </div>
  <SetImage />
</template>