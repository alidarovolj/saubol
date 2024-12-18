<script setup>

const props = defineProps({
 data: { required: true },
 columns: { required: true },
 pagination: { required: false },
 trClass: { required: false },
 onClickClass: { required: false },
 updateQuery: { required: false },
 wrapped: { required: false, default: false },
 clickable: { required: false, default: false }
})

const emit = defineEmits(['update', 'onClickRow'])

const emitPage = (val) => {
 emit('update', val)
}

const clickedRowId = ref()

// const getWidth = (index:number) => {
//   const widths = ['w-1/3', 'w-1/4', 'w-1/2', 'w-1/5', 'w-3/5'];
//   return widths[index % widths.length];
// }

const getValueFrom = (row, column) =>
  column.fname.split('.').reduce((prev, curr) => {
   if ([null, undefined].includes(prev)) return
   return prev[curr]
  }, row)

const onClick = (row) => {
 if(!props.clickable) return
 clickedRowId.value = clickedRowId.value === row.id ? undefined : row.id
 emit('onClickRow', clickedRowId.value)
}

</script>

<template>
  <div class="text-sm">
    <div v-if="props.data">
      <div v-if="props.data.length > 0">
        <div class="rounded-lg">
          <div class="hidden md:block">
            <!-- Desktop Table View -->
            <table class="w-full">
              <thead class="text-[#9A9BA4]">
                <tr>
                  <th
                    v-for="(column, key) in columns"
                    :key="key"
                    :class="[column.tdClass]"
                    class="font-[400]">
                    <p
                      v-if="!Array.isArray(column.name)"
                      class="">
                      {{ column.name }}
                    </p>
                    <p
                      v-else
                      class="flex flex-col">
                      <span
                        v-for="(name, key) in column.name"
                        :key="key"
                        class="text-xs"
                        :class="{'!text-sm !leading-[18px] font-medium': key === 0}">
                        {{ name }}
                      </span>
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, key) in props?.data"
                  :key="key"
                  :class="[
                    {'bg-tableBg': key % 2 !== 1},
                    row.id === clickedRowId ? props.onClickClass: '',
                    trClass
                  ]"
                  class="rounded-lg h-[56px]"
                  @click="onClick(row)">
                  <td
                    v-for="(column, index) in columns"
                    :key="index"
                    class="py-2 md:py-3 px-3"
                    :class="[
                      { 'rounded-l-lg': index === 0 },
                      { 'rounded-r-lg': columns.length === index + 1 },
                      column.tdClass
                    ]"
                    :data-column-name="column.name">
                    <slot
                      :column="column"
                      :index="key"
                      :row="row"
                      :valFrom="getValueFrom">
                      {{ getValueFrom(row, column) }}
                    </slot>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!--        Mobile Card View-->
          <div
            v-if="!wrapped"
            class="md:hidden space-y-4">
            <div
              v-for="(row, key) in props?.data"
              :key="key"
              :class="{
                [props.onClickClass || '']: row.id === clickedRowId,
                'border border-primary bg-blue-50 scale-105 shadow-lg': row.id === clickedRowId
              }"
              class="bg-tableBg rounded-lg p-4 shadow-md mb-3 transition-all duration-200"
              @click="onClick(row)">
              <div
                v-for="(column, index) in columns"
                :key="index"
                class="mb-2">
                <p
                  v-if="!Array.isArray(column.name)"
                  class="text-sm text-[#9A9BA4]">
                  {{ column.name }}
                </p>
                <p
                  v-else
                  class="flex flex-col">
                  <span
                    v-for="(name, key) in column.name"
                    :key="key"
                    class="text-xs"
                    :class="{'!text-sm !leading-[18px] font-medium': key === 0}">
                    {{ name }}
                  </span>
                </p>
                <p class="text-lg">
                  <slot
                    :column="column"
                    :index="key"
                    :row="row"
                    :valFrom="getValueFrom">
                    {{ getValueFrom(row, column) }}
                  </slot>
                </p>
              </div>
            </div>
          </div>
          <!--        Вариант с flex-wrap-->
          <div
            v-else
            class="md:hidden space-y-4">
            <div
              v-for="(row, key) in props?.data"
              :key="key"
              class="bg-white rounded-lg p-4 shadow-md mb-3 transition-all duration-200 relative"
              :class="{
                [props.trClass || '']: row.id === clickedRowId,
                'border border-primary bg-blue-50 scale-105 shadow-lg': row.id === clickedRowId
              }"
              @click="onClick(row)">
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(column, index) in columns"
                  :key="index"
                  class="flex-1 min-w-[150px] mb-2">
                  <p
                    v-if="!Array.isArray(column.name)"
                    class="text-sm text-[#9A9BA4]">
                    {{ column.name }}
                  </p>
                  <p
                    v-else
                    class="flex flex-col">
                    <span
                      v-for="(name, key) in column.name"
                      :key="key"
                      class="text-xs"
                      :class="{'!text-sm !leading-[18px] font-medium': key === 0}">
                      {{ name }}
                    </span>
                  </p>
                  <p class="text-lg">
                    <slot
                      :column="column"
                      :index="key"
                      :row="row"
                      :valFrom="getValueFrom">
                      {{ getValueFrom(row, column) }}
                    </slot>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Component -->
        <div
          v-if="props.pagination"
          class="mt-4">
          <Pagination
            v-if="props.pagination"
            :pagesData="props.pagination"
            :updateQuery="props.updateQuery"
            @navigate="emitPage" />
        </div>
      </div>
      <div
        v-else
        class="text-center">
        Нет данных
      </div>
    </div>

    <!-- Preloader for Mobile and Desktop -->
    <div v-else>
      <div class="animate-pulse space-y-3">
        <!-- Desktop Preloader -->
        <div class="hidden md:block space-y-2 rounded-lg p-2">
          <div
            v-for="rowIndex in 3"
            :key="rowIndex"
            class="flex space-x-2">
            <div
              v-for="(_, colIndex) in columns"
              :key="colIndex"
              class="bg-gray-200 rounded h-6 w-full md:w-1/3 lg:w-1/4" />
          </div>
        </div>

        <!-- Mobile Card Preloader -->
        <div class="md:hidden">
          <div
            v-for="n in 3"
            :key="n"
            class="flex flex-col space-y-2 bg-white rounded-lg p-4 shadow-md">
            <div
              v-for="(_, index) in columns"
              :key="index"
              class="bg-gray-200 h-6 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-primary {
 border-color: #007bff; /* Adjust to your primary color */
}
</style>