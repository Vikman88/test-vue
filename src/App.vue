<template>
  <component :is="currentComponent" :cart="cart" />
  <router-view
    :brands="brands"
    :products="products"
    @addCart="addToCart"
  ></router-view>
</template>

<script>
import { getProductsData, getBrandsData } from './fetch';
import MainLayout from './layout/MainLayout.vue';
import CartLayout from './layout/CartLayout.vue';

export default {
  name: 'App',

  components: {
    CartLayout,
    MainLayout,
  },

  data() {
    return {
      products: [],
      brands: [],
      cart: [],
    };
  },

  created() {
    (async () => {
      const responseProductsData = await getProductsData();
      const responseBrandsData = await getBrandsData();
      this.products = Object.values(responseProductsData);
      console.log(this.products);
      this.brands = Object.values(responseBrandsData);
    })();
  },

  computed: {
    currentComponent() {
      console.log(this.$route);

      switch (this.$route.meta.layout) {
        case 'main':
          return 'main-layout';
        case 'cart':
          return 'cart-layout';
        default:
          return 'main-layout';
      }
    },
  },

  methods: {
    addToCart(product) {
      const currencyItem = {
        ...this.products.find(({ id }) => id === product.id),
        amount: 1,
      };
      const indexDublicate = this.cart.findIndex(
        ({ id }) => id === currencyItem.id
      );
      console.log(indexDublicate);
      if (indexDublicate !== -1) {
        console.log('aa');
        this.cart[indexDublicate].amount += 1;
      } else {
        this.cart = [...this.cart, currencyItem];
      }
      console.log('cart', this.cart);
    },
  },
};
</script>

<style src="./style.css"></style>
