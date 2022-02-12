<template>
  <section class="main__catalog catalog">
    <h2 class="catalog__title">Catalog</h2>
    <ul class="catalog__list list">
      <li
        v-for="productItem in filteredProducts"
        :key="productItem.id"
        class="list__item product"
      >
        <slot name="item" :productItem="productItem"></slot>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'AppItem',

  props: {
    products: {
      type: Object,
      require: true,
    },
    filter: {
      type: String,
      require: true,
      default: '',
    },
  },

  computed: {
    filteredProducts() {
      if (this.filter === '') return this.products;
      return this.products.filter(
        ({ brand }) => this.filter === `brand_${brand}`
      );
    },
  },
};
</script>
