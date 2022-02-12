<template>
  <main class="main">
    <div class="main__wrapper">
      <h1 class="main__title">Shopping Cart</h1>
      <section class="main__cart cart">
        <table class="cart__table">
          <tr class="cart__table-title table-title">
            <th class="table-title__item">Item</th>
            <th class="table-title__price">Price</th>
            <th class="table-title__qty">Qty</th>
            <th class="table-title__total">Total</th>
          </tr>
          <tr class="cart__product product">
            <td class="product__item">a</td>
            <td class="product__price">v</td>
            <td class="product__qty">sd</td>
            <td class="product__total">s</td>
            <td class="product__remove-button remove-button">
              <button class="remove-button"></button>
            </td>
          </tr>
        </table>
        <p class="cart__total-price"></p>
        <button class="cart__button-checkout button-checkout">
          <p class="button-checkout__name">Checkout</p>
        </button>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped>
.main__wrapper {
  display: flex;
  flex-direction: column;
  margin: 15px;
}
</style>
