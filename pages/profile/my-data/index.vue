<script setup>

import {IconEdit} from "@tabler/icons-vue";

const layout = ref("profile");
const route = useRoute()


const user = useUserStore()
const {result} = storeToRefs(user)

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

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})

useHead({
  title: "Мои данные | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Мои данные | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{rel: "canonical", href: "https://saubolmed.kz/"}],
});
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator color="#3E46FF"/>
        <DelayHydration>
          <div
              v-if="result"
              style="box-shadow: 0px 4px 20px 0px #0000001A;"
              class="mt-5 rounded-lg lg:mt-0 w-full lg:w-2/3 bg-white">
            <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
              <h1 class="text-mainColor font-bold">
                Мои данные
              </h1>
              <div class="flex items-center gap-5">
                <div
                    v-if="editMode"
                    class="w-max">
                  <button
                      v-if="!loading"
                      type="submit"
                      class="bg-mainColor text-center text-white px-5 py-2 rounded-lg"
                  >
                    Обновить
                  </button>
                  <p
                      v-else
                      class="w-max bg-mainColor text-center text-white px-5 py-2 rounded-lg"
                  >
                    <span class="spinner"></span>
                  </p>
                </div>
                <IconEdit
                    class="cursor-pointer"
                    size="24"
                    @click="editMode = !editMode"/>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-3">
              <div class="">
                <p class="text-sm text-[#9A9BA4]">
                  Профиль работы
                </p>
                <p class="p-3 border-b border-[#235CEE40]">
                  {{ result.data.staff.specialization.name }}
                </p>
              </div>
              <div class="">
                <p class="text-sm text-[#9A9BA4]">
                  Номер телефона
                </p>
                <p class="p-3 border-b border-[#235CEE40]">
                  {{ result.data.phone_number }}
                </p>
              </div>
              <div class="">
                <p class="text-sm text-[#9A9BA4]">
                  ИИН
                </p>
                <p class="p-3 border-b border-[#235CEE40]">
                  {{ result.data.iin }}
                </p>
              </div>
              <div class="">
                <p class="text-sm text-[#9A9BA4]">
                  Email
                </p>
                <p class="p-3 border-b border-[#235CEE40]">
                  {{ result.data.email }}
                </p>
              </div>
              <div class="">
                <p class="text-sm text-[#9A9BA4]">
                  Места работы
                </p>
                <div class="flex flex-col gap-1 border-b border-[#235CEE40]">
                  <p
                      v-for="(item, index) of result.data.staff.job_places"
                      class="p-3">
                    {{ item.job_place }}
                  </p>
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