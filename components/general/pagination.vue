<template>
  <div class="flex items-center justify-between lg:justify-end  overflow-x-auto">
    <p
        v-for="(page, item) of filterLinks"
        :key="item"
        :class="{ 'bg-mainColor text-white': page.active }"
        class="transition-all mx-1 text-black px-2 py-1 rounded-md hover:bg-mainColor hover:text-white cursor-pointer"
        @click="sendToParent(page.label)"
    >
      {{ page.label }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    pagesData: {
      type: Object,
      required: false
    }
  },
  emits: ['firstLink'],
  computed: {
    filterLinks() {
      const newArray = [...this.pagesData.links];
      newArray[0].label = '<';
      newArray[newArray.length - 1].label = '>';
      return newArray;
    }
  },
  methods: {
    async sendToParent(item) {
      try {
        const currentPage = this.pagesData.current_page;
        const lastPage = this.pagesData.last_page;
        let newPage;

        if(currentPage === 1 && item === '<' || currentPage === lastPage && item === '>' || item === '...') {
          return;
        }

        if (item === '<' && currentPage !== 1) {
          newPage = currentPage - 1;
        } else if (item === '>' && currentPage !== lastPage) {
          newPage = currentPage + 1;
        } else if (item !== '...' && item !== '<' && item !== '>') {
          newPage = item;
        }

        if (newPage !== undefined) {
          await this.$router.push({
            query: {
              ...this.$route.query,
              page: newPage,
              perPage: this.$route.query.perPage
            }
          });
        }

        this.$emit('firstLink', item);
      } catch (error) {
        console.error('Ошибка при навигации по маршруту:', error.response);
      }
    }
  }
};
</script>
