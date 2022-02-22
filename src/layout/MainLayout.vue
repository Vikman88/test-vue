<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__logo logo">
        <router-link to="/">
          <img src="../assets/logo.png" alt="Логотип" class="logo__img" />
        </router-link>
      </div>
      <div class="header__cart cart">
        <router-link to="/cart">
          <img src="../assets/cart.png" alt="Корзина" class="cart__img" />
          <span
            :style="{ padding: amountCart > 9 ? '5px 5px' : '2px 5px' }"
            class="cart__count"
            >{{ amountCart }}</span
          >
        </router-link>
      </div>
    </div>
    <hr />
  </header>
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
    amountCart() {
      let sum = 0;
      this.cart.forEach(({ amount }) => {
        sum += amount;
      });
      return sum;
    },
  },
};
</script>

<style scoped src="../css/layout.css"></style>
