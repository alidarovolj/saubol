<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps(['pagination'])

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['changed'])

const queryPage = computed(() => +route.query.page || 1)
const queryPerPage = computed(() => +route.query.perPage || 10)

const perPageOptions = [10, 20, 30, 40, 50]

function inRange(minPage, maxPage) {
 return queryPage.value >= minPage && queryPage.value <= maxPage
}

const pages = computed(() => {
 const { last_page } = props.pagination

 if (last_page <= 8) return Array.from({ length: last_page }, (_, i) => i + 1)

 if (inRange(1, 4)) return [1, 2, 3, 4, 5, '...', last_page]

 if (inRange(last_page - 3, last_page)) return [1, '...', last_page - 4, last_page - 3, last_page - 2, last_page - 1, last_page]

 return [1, '...', queryPage.value - 1, queryPage.value, queryPage.value + 1, '...', last_page]
})

const change = async (e, page) => {
 if (queryPage.value === page) return
 e.target.blur()

 await router.push({
  query: {
   ...route.query,
   page
  }
 })

 // TODO: Нужно подумать над scrollTo при переключени страниц. Либо же продублировать пагинацию сверху
 // window.scrollTo({
 //  top: 0,
 //  behavior: 'smooth',
 // });

 emit('changed')
}

const changePerPage = async (e) => {
 const perPage = +e.target.value
 await router.push({
  query: {
   ...route.query,
   perPage,
   page: 1
  }
 })
 emit('changed')
}

watch(() => props.pagination?.current_page, async (newVal) => {
 if (newVal > props.pagination.last_page) {
  await router.push({
   query: {
    ...route.query,
    page: props.pagination.last_page
   }
  })
  emit('changed')
 }
})
</script>

<!--TODO: refactor pagination?.last_page statement-->
<template>
  <div
    v-if="pagination?.last_page"
    class="flex flex-wrap items-center justify-between">
    <!-- Select perPage -->
    <div>
      <label
        for="perPage"
        class="mr-2">Показывать по:</label>
      <select
        id="perPage"
        class="border rounded px-2 py-1"
        :value="queryPerPage"
        @change="changePerPage">
        <option
          v-for="option in perPageOptions"
          :key="option"
          :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Pagination -->
    <ul class="flex gap-2 items-center mb-0 overflow-auto select-none">
      <li
        class="page-item"
        :class="{'pointer-events-none': queryPage === 1}">
        <nuxt-link
          class="page-link text-sm flex items-center"
          :to="{
            query: {
              ...$route.query,
              page: queryPage - 1
            }
          }"
          @click="change($event, queryPage - 1)">
          «
        </nuxt-link>
      </li>
      <li
        v-for="(page, key) in pages"
        :key="key"
        class="page-item text-sm"
        :class="{ active: queryPage === page }">
        <nuxt-link
          v-if="page !== '...'"
          class="page-link font-semibold text-sm"
          :to="{
            query: {
              ...$route.query,
              page
            }
          }"
          @click="change($event, page)">
          {{ page }}
        </nuxt-link>
        <span
          v-else
          class="page-link text-sm font-semibold">...</span>
      </li>
      <li class="page-item">
        <nuxt-link
          class="page-link text-sm flex items-center"
          :class="{'pointer-events-none': queryPage + 1 > pagination.last_page}"
          :to="{
            query: {
              ...$route.query,
              page: queryPage + 1
            }
          }"
          @click="change($event, queryPage + 1)">
          »
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.active .page-link {
 background-color: #FE2D39;
 color: white;
 border-radius: 4px;
}

.page-link {
 padding: 5px 10px;
 border: 1px solid #ddd;
 border-radius: 4px;
 cursor: pointer;
}

.page-link:hover {
 background-color: #FE2D39;
 color:white;
 opacity: 0.9;
}

.pointer-events-none {
 opacity: 0.9;
 cursor: not-allowed;
}
</style>