<template>
  <main class="main">
    <div class="main__wrapper">
      <h1 class="sr-only">Каталог</h1>
      <app-filter :brands="brands" @filterValue="filter = $event"></app-filter>
      <app-item-List :products="products" :filter="filter">
        <template #item="{ productItem }">
          <app-item
            @click="addToCart(productItem)"
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
    addToCart(product) {
      this.$emit('addCart', product);
    },
  },
};
</script>
