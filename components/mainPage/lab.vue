<script setup>
import { IconMapPin, IconSearch } from "@tabler/icons-vue";
import { useDomoLabStore } from "~/store/domoLab.js";
import { useAddressesStore } from "~/store/addresses.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useUserStore } from "~/store/user.js";

const lab = useDomoLabStore();
const { result } = storeToRefs(lab);

const user = useUserStore();

const loading = ref(false);

const addresses = useAddressesStore();
const { resultAddresses } = storeToRefs(addresses);

const pending = ref(true);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};
</script>

<template>
  <div class="container mx-auto px-4 md:px-0">
    <div class="flex flex-col md:flex-row">
      <div class="w-full rounded-2xl">
        <div class="relative rounded-2xl px-4 md:px-20">
          <img
            class="w-full h-full object-cover absolute left-0 top-0 rounded-2xl"
            src="~/assets/img/mainPage/lab/bg.png"
            alt=""
          />
          <!--          <div class="setBg absolute left-0 top-0 w-full h-full rounded-2xl"></div>-->
          <div class="relative z-20 rounded-2xl">
            <div class="hidden md:block py-6"></div>
            <h2 class="text-xl md:text-4xl text-mainColor font-semibold mb-4">
              Домо-Лаб
            </h2>
            <div class="block md:flex items-end gap-4">
              <div class="w-full mb-3 md:mb-0">
                <div class="relative w-full">
                  <IconSearch class="absolute top-3 left-3 text-mainColor" />
                  <input
                    placeholder="Введите название анализов"
                    v-model="searchValue"
                    class="pl-10 px-3 py-3 border rounded-lg w-full"
                    type="text"
                  />
                  <!--                  <div class="absolute left-0 top-full bg-white rounded-lg w-full">-->
                  <!--                    <NuxtLink-->
                  <!--                        v-for="(item, index) of lab.result.data"-->
                  <!--                        to="/lab"-->
                  <!--                        class="block py-3 px-4 text-mainColor w-full hover:bg-mainColor hover:text-white transition-all rounded-lg">-->
                  <!--                      {{ item.name }}-->
                  <!--                    </NuxtLink>-->
                  <!--                  </div>-->
                </div>
              </div>
              <NuxtLink
                :to="'/services/tests?fields[name]=' + searchValue"
                class="w-full md:w-max rounded text-white bg-mainColor py-3 px-20"
              >
                Найти
              </NuxtLink>
            </div>
            <div class="pt-4 pb-0 md:pb-10">
              <p class="text-sm md:text-xl font-medium text-mainColor">
                Удобно и без лишних хлопот: сдавайте анализы на дому! Наша
                услуга позволяет вам избежать очередей и походов в клиники.
                Профессиональные медицинские работники приедут к вам в удобное
                время, возьмут необходимые образцы и доставят их в
                аккредитованную лабораторию. Получите результаты быстро и
                конфиденциально, не выходя из дома!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateAddress />
  <LoginModal />
</template>

<style scoped>
.setBg {
  border-radius: 15px;
  background: linear-gradient(
    90deg,
    #fff -26.72%,
    rgba(25, 107, 247, 0) 181.78%
  );
}
</style>
