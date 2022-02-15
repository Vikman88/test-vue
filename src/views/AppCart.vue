<template>
  <main class="main">
    <div class="main__wrapper">
      <h1 class="main__title">Shopping Cart</h1>
      <app-cart-list v-if="cart.size" :cart="cart">
        <template #itemCart="{ item, amount }">
          <app-cart-item
            :item="item"
            :amount="amount"
            @delItem="$emit('delItem', $event)"
            @changeAmount="$emit('changeAmount', $event)"
          ></app-cart-item>
        </template>
      </app-cart-list>
      <h2 class="empty-cart" v-else>Сart is empty :(</h2>
    </div>
  </main>
</template>

<script>
import AppCartList from '../components/AppCartList.vue';
import AppCartItem from '../components/AppCartItem.vue';

export default {
  name: 'AppCart',

  components: {
    AppCartList,
    AppCartItem,
  },

  emits: {
    delItem: null,
    changeAmount: null,
  },

  props: {
    cart: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped src="../css/AppCart.css"></style>
