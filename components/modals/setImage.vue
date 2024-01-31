<script setup>
import {useUserStore} from "~/store/user.js";

const user = useUserStore();
const {resultImage} = storeToRefs(user);
const fileInput = ref(null);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const uploadImage = () => {
  if (fileInput.value && fileInput.value.files[0]) {
    const file = fileInput.value.files[0];
    user.setImage(file);
    if(!resultImage === false) {
      user.getProfile()
      setImage.close();
    } else {
      notify(false, 'Ошибка загрузки фотографии')
    }
  }
};
</script>

<template>
  <dialog id="setImage" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-xl mb-5">
        Установить фотографию
      </h3>
      <input type="file" ref="fileInput" @change="uploadImage">
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>