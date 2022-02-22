<template>
  <main class="main">
    <div class="main__wrapper">
      <h1 class="sr-only">Каталог</h1>
      <app-filter :brands="brands" @filterValue="applyFilter"></app-filter>
      <app-item-List :products="products" :filter="filter">
        <template #item="{ productItem }">
          <app-item
            @getCurrentProduct="productItem = $event"
            @click="addToCart(productItem, $event)"
            :productItem="productItem"
          ></app-item>
        </template>
      </app-item-List>
    </div>
  </main>
</template>

<script>
import AppFilter from '../components/AppFilter.vue';
import AppItemList from '../components/AppItemList.vue';
import AppItem from '../components/AppItem.vue';

export default {
  name: 'AppMain',
  components: {
    AppFilter,
    AppItemList,
    AppItem,
  },

  emits: {
    addCart: null,
  },

  data() {
    return {
      filter: '',
    };
  },

  props: {
    brands: {
      type: Object,
      require: true,
    },
    products: {
      type: Object,
      require: true,
    },
  },

  methods: {
    applyFilter(event) {
      this.filter = null;
      this.$nextTick().then(() => (this.filter = event));
    },

    addToCart(product, { target }) {
      if (target.dataset.target) {
        this.$emit('addCart', product);
      }
    },
  },
};
</script>

<style scoped src="../css/AppMain.css"></style>
