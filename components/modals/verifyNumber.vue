<script setup>
import {useVerificationStore} from "~/store/verification.js";

const verification = useVerificationStore()
const {result, resultValidation} = storeToRefs(verification)

const user = useUserStore()

const loading = ref(false)

const time_left = ref(30)

const props = defineProps({
  numPhone: {
    type: String,
    required: true
  }
})

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const form = ref({
  phone_number: '',
})

const valCode = ref({
  code: '',
})

const localVerification = async () => {
  loading.value = true
  await verification.sendMessage(form.value)
  if (result !== false) {
    notify(true, 'Письмо отправлено')
    time_left.value = 30
    startTimer()
  }
  loading.value = false
}

const setVerificationCode = async () => {
  loading.value = true
  await verification.validatePhone(valCode.value)
  if (resultValidation !== false) {
    notify(true, 'Код подтвержден')
  }
  await user.getProfile()
  loading.value = false
  verificationModal.close()
}

let intervalId;

const startTimer = () => {
  time_left.value = 30
  intervalId = setInterval(() => {
    time_left.value--
    if (time_left.value === 0) {
      clearInterval(intervalId)
    }
  }, 1000)
}

onMounted(() => {
  form.value.phone_number = props.numPhone;
});

watch(() => props.numPhone, (val) => {
  form.value.phone_number = val;
});
</script>

<template>
  <div>
    <h3
        v-if="result === null || result === false"
        class="font-bold text-xl mb-5">
      Отправить письмо
    </h3>
    <h3
        v-else
        class="font-bold text-xl mb-5">
      Верификация номера
    </h3>
    <form
        v-if="result === null || result === false"
        action=""
        @submit.prevent="localVerification"
    >
      <button
          class="btn bg-mainColor text-white w-full mt-5"
          type="submit">
        Отправить СМС
      </button>
    </form>
    <form
        v-else
        action=""
        @submit.prevent="setVerificationCode">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label
              class="text-[#9A9BA4]"
              for="email"
          >
            Код верификации
          </label>
          <input
              id="email"
              v-model="valCode.code"
              class="w-full py-3 px-3 border rounded-xl"
              placeholder="Введите код"
              type="text"
          />
        </div>
      </div>
      <p
          v-if="time_left > 0"
          class="text-sm text-gray-400 mt-2">
        Отправить код повторно можно будет через {{ time_left }} секунд
      </p>
      <p
          v-else
          class="text-sm text-mainColor mt-2 cursor-pointer"
          @click="localVerification"
      >
        Отправить код повторно
      </p>
      <button
          v-if="loading === false"
          class="btn bg-mainColor text-white w-full mt-5"
          type="submit">
        Верифицировать
      </button>
      <div
          v-else
          class="btn bg-mainColor text-white w-full mt-5">
        <span class="spinner"></span>
      </div>
    </form>
  </div>
</template>