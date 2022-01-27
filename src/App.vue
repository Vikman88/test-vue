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
      <app-filter :brands="brands" @filterValue="filtered"></app-filter>
      <app-item
        :products="products"
        :filter="filter"
        @addItemToCart="addToCart"
      ></app-item>
    </div>
  </main>
</template>

<script>
import { getProductsData, getBrandsData } from './fetch';
import AppFilter from './components/AppFilter.vue';
import AppItem from './components/AppItem.vue';

export default {
  name: 'App',

  components: {
    AppFilter,
    AppItem,
  },

  data() {
    return {
      products: [],
      brands: [],
      filter: '',
      cart: [],
    };
  },

  created() {
    (async () => {
      const responseProductsData = await getProductsData();
      const responseBrandsData = await getBrandsData();
      this.products = Object.values(responseProductsData);
      this.brands = Object.values(responseBrandsData);
    })();
  },

  methods: {
    filtered(value) {
      this.filter = value;
    },

    addToCart(product) {
      const currencyItem = this.products.filter(({ id }) => id === product.id);
      this.cart = [...this.cart, currencyItem];
    },
  },
};
</script>

<style src="./style.css"></style>
