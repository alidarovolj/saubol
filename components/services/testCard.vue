<script setup>
import {IconClipboardPlus, IconCopy} from "@tabler/icons-vue"
import {useAddressesStore} from "~/store/addresses.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useNursesStore} from "~/store/nurses.js";

const addresses = useAddressesStore()

const user = useUserStore()
const {result} = storeToRefs(user)

const nurse = useNursesStore()
const cart = useCartStore()

const props = defineProps({
  service: Object,
  required: true
})

const pickedTest = ref(null)

const pickedDay = ref(null)

const loading = ref(false)

const type = ref(1)

const setTest = async () => {
  await nextTick()
  let pickTest = props.service
  pickedTest.value = pickTest
  await cartTest.showModal()
}
</script>

<template>
  <div>
    <div
        class="w-full bg-white rounded-lg p-5"
        style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
    >
      <div class="flex items-center gap-5">
        <div class="block lg:flex items-center justify-between w-full">
          <div>
            <p class="text-black font-bold mb-2">
              {{ props.service.name }}
            </p>
            <p class="text-sm mb-3">
              {{ props.service.category.name }}
            </p>
            <div class="flex gap-3">
              <div class="flex items-center bg-[#EFD7B2] text-xs gap-1 p-1 rounded">
                <IconCopy size="14" />
                <p>
                  5 анализов
                </p>
              </div>
              <div class="flex items-center bg-[#CAEFB2] text-xs gap-1 p-1 rounded">
                <IconClipboardPlus size="14" />
                <p>
                  Расшифровка
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-between text-sm">
            <p class="px-7 py-2 bg-[#ffe7e7] rounded-md text-center w-max font-bold text-mainColor mb-2">
              <span>
                {{ props.service.price }}
              </span> ₸
            </p>
            <div>
              <p
                  v-if="user.result && !loading"
                  @click="setTest"
                  class="w-full py-2 rounded-lg text-white bg-mainColor text-center cursor-pointer">
                В корзину
              </p>
              <p
                  v-else-if="user.result && loading"
                  class="w-full py-2 rounded-lg text-white bg-mainColor text-center cursor-pointer">
                <span class="spinner"></span>
              </p>
              <button
                  v-else
                  onclick="loginModal.showModal()"
                  class="w-full py-2 rounded-lg text-white bg-mainColor text-center cursor-pointer">
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoginModal v-if="!user.result"/>
  <CartTest :test="pickedTest" />
</template>