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
    changeAmount(event) {
      const [item, amount] = event;
      this.cart.set(item.id, { item, amount });
    },

    delItem(item) {
      this.cart.delete(item.id);
    },

    addToCart(product) {
      let item;
      if (!product.type) {
        const confProductStr = product.id.toString();
        const parentId = confProductStr.substring(0, confProductStr.length - 3);
        const currencyItem = this.products.find(({ id }) => id == parentId);
        const dublicateCurrencyItem = Object.assign({}, currencyItem);
        dublicateCurrencyItem.id = parseInt(product.id, 10);
        dublicateCurrencyItem.sku = product.sku;
        dublicateCurrencyItem.image = product.image;
        item = dublicateCurrencyItem;
      } else {
        item = product;
      }

      if (this.cart.has(item.id)) {
        const { amount } = this.cart.get(item.id);
        this.cart.set(item.id, { item, amount: amount + 1 });
      } else {
        this.cart.set(item.id, { item, amount: 1 });
      }
    },
  },
};
</script>

<style src="./css/global.css"></style>
