<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs()

const props = defineProps({
 variant: {
  type: String,
  required: false,
  default: 'primary'
 },
 type: {
  type: String,
  required: false,
  default: 'button'
 },
 size:{
  type: String,
  required: false,
  default: 'base' //sm xs
 },
 loading: {
  type: Boolean,
  required: false
 },
 to: {
  type: String,
  required: false
 }
})

</script>

<template>
  <NuxtLink
    v-if="to"
    v-bind="attrs"
    :class="[
      'w-full button py-2 lg:py-3 relative rounded-lg cursor-pointer flex justify-center items-center',
      {
        'button-primary': props.variant === 'primary',
        'button-outlined': props.variant === 'outlined',
        'button-secondary': props.variant === 'secondary'
      },
      attrs.class]"
    :to="to">
    <span :class="{'invisible': props.loading}">
      <slot />
    </span>
    <span
      :class="{'invisible': !props.loading}"
      class="spinner absolute" />
  </NuxtLink>
  <button
    v-else
    v-bind="attrs"
    :type="props.type"
    :class="[
      'w-full button py-2 lg:py-3 relative rounded-lg cursor-pointer flex justify-center items-center',
      {
        'button-primary': props.variant === 'primary',
        'button-outlined': props.variant === 'outlined',
        'button-secondary': props.variant === 'secondary'
      },
      attrs.class]">
    <span :class="{'invisible': props.loading}">
      <slot />
    </span>
    <span
      :class="{'invisible': !props.loading}"
      class="spinner absolute" />
  </button>
</template>

<!--Todo: Переписать на scss-->
<style scoped>
.spinner {
 border-top-color: #FE2D39;
 border-left-color: #FE2D39;
 animation: spinner-spin 1s infinite linear;
 border-radius: 50%;
 border-width: 2px;
 width: 20px;
 height: 20px;
}

@keyframes spinner-spin {
 to {
  transform: rotate(360deg);
 }
}

.button-primary {
 background-color: #FD586B;
 color: white;
}

.button-primary:hover{
 opacity: 0.7;
 transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

.button-secondary {
 background-color: #ffe7e7;
 color:#FD586B;
}

.button-secondary:hover{
 opacity: 0.7;
 transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

.button-outlined {
 color: #FD586B;
 border: 1px solid #FD586B;
}

.button-outlined:hover{
 background-color: #FD586B;
 color:white;
 transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

</style>