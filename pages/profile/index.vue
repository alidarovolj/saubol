<script setup>
import {
  IconCamera,
  IconEdit,
  IconRuler3,
  IconScaleOutline,
  IconMathXDivideY,
  IconExclamationMark
} from "@tabler/icons-vue";
import {useVuelidate} from "@vuelidate/core";
import {email, required} from "@vuelidate/validators";

const layout = ref("profile");
const route = useRoute()

const loading = ref(false)

const user = useUserStore()
const {result} = storeToRefs(user)

const editMode = ref(false)

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

const form = ref({
  name: '',
  iin: '',
  height: '',
  weight: ''
})

const v$ = useVuelidate({
  name: {required},
  iin: {required},
  height: {required},
  weight: {required}
}, form);

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

const updateProfileLocal = async () => {
  loading.value = true
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }
  await user.updateProfile(form.value)
  await user.getProfile()
  loading.value = false
  editMode.value = false
}

onMounted(async () => {
  await nextTick()
  await user.getProfile()
  form.value.name = result.value.data.name
  form.value.iin = result.value.data.iin
  if (result.value.data.user_data) {
    form.value.height = result.value.data.user_data.height
    form.value.weight = result.value.data.user_data.weight
  }
})

useHead({
  title: "Профиль | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Профиль | SaubolMed",
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
      <Breadcrumbs :links="links"/>
      <h1 class="text-6xl font-semibold text-mainColor mb-7">
        Профиль
      </h1>
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator color="#3E46FF"/>
        <DelayHydration>
          <div>
            <div class="flex items-center gap-5">
              <form
                  @submit.prevent="updateProfileLocal"
                  class="block lg:flex items-center w-full gap-5">
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
                    <div
                        v-if="editMode"
                        class="w-1/2"
                    >
                      <input
                          v-model="form.name"
                          :class="{'border-red-500': v$.name.$error}"
                          class="px-2 py-2 border rounded-lg w-full"
                          type="text"
                          placeholder="Введите имя"
                      >
                      <p
                          v-if="v$.name.$error && editMode"
                          class="text-red-500 text-xs">
                        Пожалуйста заполните данное поле
                      </p>
                    </div>
                    <h1
                        v-if="!editMode"
                        class="text-xl font-bold">
                      {{ result.data.name }}
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
                  <div class="block lg:flex justify-between">
                    <div class="flex flex-col mb-3 lg:mb-0">
                      <p class="text-[#9A9BA4] mb-1">
                        ИИН
                      </p>
                      <input
                          v-if="editMode"
                          v-model="form.iin"
                          :class="{'border-red-500': v$.iin.$error}"
                          class="px-2 py-2 border rounded-lg w-full"
                          type="text"
                          placeholder="Введите ИИН"
                      >
                      <p
                          v-if="v$.iin.$error && editMode"
                          class="text-red-500 text-xs">
                        Пожалуйста заполните данное поле
                      </p>
                      <div v-if="!editMode">
                        <p v-if="result.data.iin">
                          {{ result.data.iin }}
                        </p>
                        <p v-else class="text-red-500">
                          Необходимо заполнить
                        </p>
                      </div>
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
                      <div>
                        <p v-if="result.data.phone_number">
                          {{ result.data.phone_number }}
                        </p>
                        <p v-else class="text-red-500">
                          Необходимо заполнить
                        </p>
                      </div>
                    </div>
                    <!--                    <div class="flex flex-col">-->
                    <!--                      <p class="text-[#9A9BA4] mb-1">-->
                    <!--                        Адрес-->
                    <!--                      </p>-->
                    <!--                      <p v-if="result.data.address">-->
                    <!--                        {{ result.data.address }}-->
                    <!--                      </p>-->
                    <!--                      <p-->
                    <!--                          v-else-->
                    <!--                          class="text-red-500">-->
                    <!--                        Необходимо заполнить-->
                    <!--                      </p>-->
                    <!--                    </div>-->
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
                        <input
                            v-if="editMode"
                            v-model="form.height"
                            :class="{'border-red-500': v$.height.$error}"
                            class="px-2 py-2 border rounded-lg w-full"
                            type="text"
                            placeholder="Введите телефон"
                        >
                        <p
                            v-if="v$.height.$error && editMode"
                            class="text-red-500 text-xs">
                          Пожалуйста заполните данное поле
                        </p>
                        <div v-if="result.data.user_data">
                          <p
                              v-if="!editMode"
                              class="font-medium">
                            {{ result.data.user_data.height }} см
                          </p>
                        </div>
                        <div
                            v-else
                            class="text-red-500"
                        >
                          Необходимо заполнить
                        </div>
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
                        <input
                            v-if="editMode"
                            v-model="form.weight"
                            :class="{'border-red-500': v$.weight.$error}"
                            class="px-2 py-2 border rounded-lg w-full"
                            type="text"
                            placeholder="Введите телефон"
                        >
                        <p
                            v-if="v$.weight.$error && editMode"
                            class="text-red-500 text-xs">
                          Пожалуйста заполните данное поле
                        </p>
                        <div v-if="result.data.user_data">
                          <p
                              v-if="!editMode"
                              class="font-medium">
                            {{ result.data.user_data.weight }} кг
                          </p>
                        </div>
                        <div
                            v-else
                            class="text-red-500"
                        >
                          Необходимо заполнить
                        </div>
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
                        <p
                            v-if="doneIMT"
                            class="font-medium">
                          {{ doneIMT }}
                        </p>
                        <p
                            v-else
                            class="text-red-500"
                        >
                          Заполните вес и рост
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </DelayHydration>
      </NuxtLayout>
    </div>
  </div>
  <SetImage/>
</template>