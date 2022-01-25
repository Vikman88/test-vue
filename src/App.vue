<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__logo logo">
        <a href="#">
          <img src="./assets/logo.png" alt="Логотип" class="logo__img" />
        </a>
      </div>
      <div class="header__cart cart">
        <a href="#">
          <img src="./assets/cart.png" alt="Корзина" class="cart__img" />
          <span
            :style="{ padding: cart.length > 9 ? '5px 5px' : '2px 5px' }"
            class="cart__count"
            >{{ cart.length }}</span
          >
        </a>
      </div>
    </div>
    <hr />
  </header>
  <main class="main">
    <div class="main__wrapper">
      <h1 class="sr-only">Каталог</h1>
      <section class="main__filter filter">
        <h2 class="filter__title">All Brands</h2>
        <ul class="filter__list">
          <li
            v-for="brandItem in brands"
            :key="brandItem.id"
            @click="filterProducts(brandItem)"
            class="filter__item brand-item"
          >
            {{ brandItem.title }}
          </li>
          <li @click="clearFilter" class="filter__item brand-item">
            Clear filter
          </li>
        </ul>
      </section>
      <section class="main__catalog catalog">
        <h2 class="catalog__title">Catalog</h2>
        <ul class="catalog__list list">
          <li
            v-for="productItem in currentProducts"
            :key="productItem.id"
            @click="addToCart(productItem)"
            class="list__item product"
          >
            <figure class="product__wrapper">
              <div class="product__img">
                <img
                  :src="makeImagePath(productItem)"
                  alt="Фотография товара"
                />
              </div>
              <figcaption class="product__description">
                <h3 class="product__name">{{ productItem.title }}</h3>
                <p class="product__brand">Brand {{ productItem.brand }}</p>
                <p class="product__price">{{ makePrice(productItem) }}</p>
              </figcaption>
            </figure>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import { getProductsData, getBrandsData } from './fetch';
import getImagePath from './getImagePath';

export default {
  name: 'App',

  data() {
    return {
      productsData: [],
      currentProducts: [],
      brands: [],
      filter: '',
      cart: [],
    };
  },

  created() {
    (async () => {
      const responseProductsData = await getProductsData();
      const responseBrandsData = await getBrandsData();
      this.productsData = Object.values(responseProductsData);
      this.currentProducts = this.productsData;
      this.brands = Object.values(responseBrandsData);
    })();
  },

  methods: {
    makeImagePath(product) {
      return getImagePath(product.image);
    },

    makePrice(product) {
      const { currency, value } = product.regular_price;
      if (currency === 'USD') return `$${value}`;
      throw new Error('Unknown currency');
    },

    filterProducts({ code }) {
      this.filter = code;
      const filteredProducts = this.productsData.filter(
        ({ brand }) => this.filter === `brand_${brand}`
      );
      this.currentProducts = filteredProducts;
    },

    addToCart(product) {
      this.cart = [...this.cart, product];
    },

    clearFilter() {
      this.filter = '';
      this.currentProducts = this.productsData;
    },
  },
};
</script>

<style src="./style.css"></style>
