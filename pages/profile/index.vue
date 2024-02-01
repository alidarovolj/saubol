<script setup>
import {IconCamera, IconEdit, IconRuler3, IconScaleOutline, IconMathXDivideY} from "@tabler/icons-vue";

const layout = ref("profile");
const route = useRoute()

const user = useUserStore()
const {result} = storeToRefs(user)

const imgFocus = ref(false)

const links = ref([
  {
    title: 'Главная',
    link: '/'
  },
  {
    title: 'Профиль',
    link: '/profile'
  }
])

const formattedName = computed(() => {
  if (result.value && result.value.data && result.value.data.name) {
    return result.value.data.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
  }
  return '';
});

const doneIMT = computed(() => {
  if (result.value && result.value.data && result.value.data.user_data) {
    const {height, weight} = result.value.data.user_data
    const imt = weight / ((height / 100) * (height / 100))
    return imt.toFixed(2)
  }
  return ''
})
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links"/>
      <h1 class="text-6xl font-semibold text-mainColor mb-7">
        Профиль
      </h1>
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator color="#3E46FF"/>
        <DelayHydration>
          <div>
            <div class="flex items-center gap-5">
              <div class="block lg:flex items-center w-full gap-5">
                <div
                    v-if="result.data.img"
                    @mouseover="imgFocus = true"
                    class="relative"
                >
                  <img
                      :src="result.data.img"
                      class="w-20 h-20 rounded-lg object-cover mx-auto"
                      alt=""
                  >
                  <button
                      v-if="imgFocus"
                      @mouseleave="imgFocus = false"
                      onclick="setImage.showModal()"
                      class="absolute cursor-pointer left-0 top-0 w-full h-full bg-black bg-opacity-90 rounded-lg flex items-center justify-center z-40">
                    <IconCamera class="text-white"/>
                  </button>
                </div>
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
                    <IconCamera class="text-white"/>
                  </button>
                </div>
                <div class="mt-5 lg:mt-0 w-full flex flex-col justify-between gap-5">
                  <div class="flex items-center justify-between text-mainColor w-full">
                    <h1 class="text-xl font-bold">
                      {{ result.data.name }}
                    </h1>
                    <IconEdit size="24"/>
                  </div>
                  <div class="block lg:flex justify-between">
                    <div class="flex flex-col mb-3 lg:mb-0">
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
                    <div class="flex flex-col mb-3 lg:mb-0">
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
                    <div class="flex flex-col mb-3 lg:mb-0">
                      <p class="text-[#9A9BA4] mb-1">
                        Телефон
                      </p>
                      <p v-if="result.data.phone_number">
                        {{ result.data.phone_number }}
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
                  <div class="block lg:flex justify-between gap-5">
                    <div class="mb-3 lg:mb-0 w-full lg:w-1/3 bg-[#ECEDFF] p-3 rounded-lg flex items-center gap-3">
                      <IconRuler3
                          size="40"
                          class="text-mainColor"
                      />
                      <div>
                        <p class="text-[#9A9BA4] text-sm">
                          Рост
                        </p>
                        <p class="font-medium">
                          {{ result.data.user_data.height }} см
                        </p>
                      </div>
                    </div>
                    <div class="mb-3 lg:mb-0 w-full lg:w-1/3 bg-[#ECEDFF] p-3 rounded-lg flex items-center gap-3">
                      <IconScaleOutline
                          size="40"
                          class="text-mainColor"
                      />
                      <div>
                        <p class="text-[#9A9BA4] text-sm">
                          Вес
                        </p>
                        <p class="font-medium">
                          {{ result.data.user_data.weight }} кг
                        </p>
                      </div>
                    </div>
                    <div class="w-full lg:w-1/3 bg-[#ECEDFF] p-3 rounded-lg flex items-center gap-3">
                      <IconMathXDivideY
                          size="40"
                          class="text-mainColor"
                      />
                      <div>
                        <p class="text-[#9A9BA4] text-sm">
                          ИМТ
                        </p>
                        <p class="font-medium">
                          {{ doneIMT }}
                        </p>
                      </div>
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
  <SetImage/>
</template>