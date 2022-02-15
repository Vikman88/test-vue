<template>
  <section class="main__cart cart">
    <table class="cart__table">
      <tr class="cart__table-title table-title">
        <th class="table-title__item">Item</th>
        <th class="table-title__price">Price</th>
        <th class="table-title__qty">Qty</th>
        <th class="table-title__total">Total</th>
        <th class="table-title__remove-button"></th>
      </tr>
      <tr
        class="cart__product product"
        v-for="[item, amount] in cart"
        :key="item.id"
      >
        <slot name="itemCart" :item="item" :amount="amount"></slot>
      </tr>
    </table>
    <div class="cart__container-sum">
      <p class="cart__total-price">Subtotal: ${{ considerSum }}</p>
      <button class="cart__button-checkout button-checkout">
        <p class="button-checkout__name">Checkout</p>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      require: true,
    },
  },

  computed: {
    considerSum() {
      let sum = 0;
      this.cart.forEach((amount, item) => {
        const { value } = item.regular_price;
        sum += value * amount;
      });
      return sum.toFixed(2);
    },
  },
};
</script>

<style scoped src="../css/AppCartList.css"></style>
