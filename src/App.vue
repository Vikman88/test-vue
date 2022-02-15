<template>
  <component :is="currentComponent" :cart="cart" />
  <router-view
    :brands="brands"
    :products="products"
    :cart="cart"
    @addCart="addToCart"
    @delItem="delItem"
    @changeAmount="changeAmount"
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
      cart: new Map(),
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

  computed: {
    currentComponent() {
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
    /* addToCart(product) {
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
    }, */
    changeAmount(event) {
      const [item, amount] = event;
      this.cart.set(item, amount);
    },

    delItem(item) {
      /* const amountItem = this.cart.get(item);
      if (amountItem < 2) { */
      this.cart.delete(item);
      /* } else {
        this.cart.set(item, amountItem - 1);
      } */
    },

    addToCart(product) {
      const currencyItem = this.products.find(({ id }) => id === product.id);
      if (this.cart.has(currencyItem)) {
        const amount = this.cart.get(currencyItem);
        this.cart.set(currencyItem, amount + 1);
      } else {
        this.cart.set(currencyItem, 1);
      }
    },
  },
};
</script>

<style src="./css/global.css"></style>
