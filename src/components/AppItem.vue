<template>
  <figure class="product__wrapper">
    <div class="product__img">
      <img :src="getImagePath" alt="Фотография товара" />
    </div>
    <figcaption class="product__description">
      <h3 class="product__name">{{ productItem.title }}</h3>
      <p class="product__brand">Brand {{ productItem.brand }}</p>
      <p class="product__price">
        {{ getCurrencyValue }}
      </p>
    </figcaption>
  </figure>
</template>

<script>
import getImagePath from '../getImagePath';

export default {
  props: {
    productItem: {
      type: Object,
      require: true,
    },
  },

  computed: {
    getImagePath() {
      return getImagePath(this.productItem.image);
    },

    getCurrencyValue() {
      const { currency, value } = this.productItem.regular_price;
      if (currency === 'USD') {
        return `$${value}`;
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped src="../css/AppItem.css"></style>
