<template>
  <section class="main__catalog catalog">
    <h2 class="catalog__title">Catalog</h2>
    <ul class="catalog__list list">
      <li
        v-for="productItem in filteredProducts"
        @click="$emit('addItemToCart', productItem)"
        :key="productItem.id"
        class="list__item product"
      >
        <figure class="product__wrapper">
          <div class="product__img">
            <img :src="productItem.image" alt="Фотография товара" />
          </div>
          <figcaption class="product__description">
            <h3 class="product__name">{{ productItem.title }}</h3>
            <p class="product__brand">Brand {{ productItem.brand }}</p>
            <p class="product__price">
              {{ productItem.regular_price.value }}
            </p>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>

<script>
import getImagePath from '../getImagePath';

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

  emits: {
    addItemToCart: (value) => typeof value === 'object',
  },

  computed: {
    filteredProducts() {
      const modyfiedProductData = this.modifyProductData;
      if (this.filter === '') return modyfiedProductData;
      return modyfiedProductData.filter(
        ({ brand }) => this.filter === `brand_${brand}`
      );
    },

    modifyProductData() {
      return this.products.map((product) => {
        const { currency, value } = product.regular_price;
        product.image = getImagePath(product.image);
        if (currency === 'USD') product.regular_price.value = `$${value}`;
        return product;
      });
    },
  },
};
</script>
