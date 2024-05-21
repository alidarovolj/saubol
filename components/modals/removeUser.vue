<script setup>
import {useUserStore} from "~/store/user.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";
import {IconEye, IconEyeClosed} from "@tabler/icons-vue";
import axios from 'axios';
import {useAdminStore} from "~/store/admin.js";

const user = useUserStore()
const { resultRemove } = storeToRefs(user)
const admin = useAdminStore()

const loading = ref(false);

const props = defineProps(['pickedItem'])

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const sendForm = async () => {
  loading.value = true;

  await user.removeUser(props.pickedItem.id)
  if(resultRemove.value) {
    remove_user.close()
    notify(true, 'Статус успешно изменен')
    await admin.adminUsers()
    loading.value = false;
  } else {
    notify(false, 'Ошибка при изменении анализа')
    loading.value = false;
  }
}
</script>

<template>
  <dialog id="remove_user" class="modal">
    <div class="modal-box">
      <p class="text-2xl font-semibold mb-5">
        Удаление пользователя
      </p>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form
          v-if="props.pickedItem"
          @submit.prevent="sendForm"
          action=""
      >
        <p class="mb-5">
          Вы уверены что хотите изменить статус доктора?
        </p>
        <div class="flex gap-2">
          <button
              v-if="loading === false"
              type="submit"
              class="bg-mainColor py-3 text-white rounded-md w-full">
            Удалить
          </button>
          <div
              v-else
              class="bg-mainColor py-3 text-white rounded-md w-full">
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