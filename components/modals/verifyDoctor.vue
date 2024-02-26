<script setup>
import {useUserStore} from "~/store/user.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";
import {IconEye, IconEyeClosed} from "@tabler/icons-vue";
import axios from 'axios';
import {useAdminStore} from "~/store/admin.js";

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore()
const user = useUserStore()
const admin = useAdminStore()
const { resultVerification } = storeToRefs(admin)
const {result} = storeToRefs(user)
const loading = ref(false);

const props = defineProps(['pickedItem'])

const form = ref({
  is_active: null
})

const v$ = useVuelidate({
  is_active: {required}
}, form);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  await admin.staffVerification(props.pickedItem.staff.id, form.value)
  if(resultVerification.value) {
    verifyDoctor.close()
    notify(true, 'Статус успешно изменен')
    await admin.adminDoctors()
    loading.value = false;
  } else {
    notify(false, 'Ошибка при изменении анализа')
    loading.value = false;
  }
}

watch(props, (newProps) => {
  if (newProps.pickedItem) {
    form.value.is_active = !newProps.pickedItem.staff.is_verified
  }
}, {deep: true})
</script>

<template>
  <dialog id="verifyDoctor" class="modal">
    <div class="modal-box">
      <p class="text-2xl font-semibold mb-5">
        Верификация доктора
      </p>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form
          v-if="props.pickedItem"
          @submit.prevent="sendForm"
          action=""
      >
        <p>
          Вы уверены что хотите изменить статус доктора?
        </p>
        <div v-if="props.pickedItem.staff.is_verified === false" class="flex gap-2">
          <button
              v-if="loading === false"
              type="submit"
              class="btn btn-success text-white w-full mt-5">
            Верифицировать
          </button>
          <div
              v-else
              class="btn btn-success w-full mt-5">
            <span class="spinner"></span>
          </div>
        </div>
        <div v-else class="flex gap-2">
          <button
              v-if="loading === false"
              type="submit"
              class="btn btn-error text-white w-full mt-5">
            Деактивировать
          </button>
          <div
              v-else
              class="btn btn-error w-full mt-5">
            <span class="spinner"></span>
          </div>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>