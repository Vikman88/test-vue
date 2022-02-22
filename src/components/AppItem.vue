<template>
  <figure class="product__wrapper">
    <div class="product__img" data-target="true">
      <img :src="getImagePath" alt="Фотография товара" data-target="true" />
    </div>
    <figcaption class="product__description">
      <h3 class="product__name">{{ productItem.title }}</h3>
      <p class="product__brand">Brand {{ productItem.brand }}</p>
      <p class="product__price">
        {{ getCurrencyValue }}
      </p>
      <div
        class="product__container-options container-options"
        v-if="isConfigurable"
      >
        <app-options
          :productItem="productItem"
          @getConfigurableProduct="getCurrentProduct($event)"
        ></app-options>
      </div>
    </figcaption>
  </figure>
</template>

<script>
import getImagePath from '../getImagePath';
import AppOptions from './AppOptions.vue';

export default {
  components: {
    AppOptions,
  },

  props: {
    productItem: {
      type: Object,
      require: true,
    },
  },

  emits: {
    getCurrentProduct: null,
  },

  data() {
    return {
      productVariant: null,
    };
  },

  methods: {
    getCurrentProduct(event) {
      this.productVariant = event;
      this.$emit('getCurrentProduct', event);
    },
  },

  computed: {
    isConfigurable() {
      return this.productItem.type === 'configurable';
    },

    getImagePath() {
      const imagePath = this.productVariant
        ? this.productVariant.image
        : this.productItem.image;
      const fileName = getImagePath(imagePath);
      if (this.isConfigurable) {
        return require('../assets/conf/' + fileName);
      } else {
        return require('../assets/' + fileName);
      }
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
