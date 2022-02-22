<template>
  <td class="product__item item">
    <div class="item__img">
      <img :src="getImagePath" alt="Картинка продукта" />
    </div>
    <div class="item__container-title">
      <p class="item__name">{{ item.title }} / Brand {{ item.brand }}</p>
      <template v-if="isConfigurable">
        <p class="item__color">Color: {{ getOptionsProduct.color }}</p>
        <p class="item__size">Size: {{ getOptionsProduct.size }}</p>
      </template>
    </div>
  </td>
  <td class="product__price">
    {{ getCurrency }}{{ item.regular_price.value }}
  </td>
  <td class="product__qty">
    <div class="product__qty-control qty-control">
      <button class="qty-control__subtract" @click="currentAmount--">−</button>
      <input
        :value="currentAmount"
        @input="changeCurrentAmount"
        class="qty-control__current-value"
        type="text"
      />
      <button class="qty-control__add" @click="currentAmount++">+</button>
    </div>
  </td>
  <td class="product__total">{{ getCurrency }}{{ total }}</td>
  <td class="product__remove-button remove-button">
    <div class="remove-button_img">
      <img
        src="../assets/cart.png"
        alt="Удалить товар из корзины"
        @click="$emit('delItem', item)"
      />
    </div>
  </td>
</template>

<script>
import getImagePath from '../getImagePath';

export default {
  data() {
    return {
      currentAmount: this.amount,
    };
  },

  emits: {
    delItem: null,
    changeAmount: null,
  },

  props: {
    item: {
      type: Object,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
  },

  methods: {
    changeCurrentAmount(event) {
      const { value } = event.target;

      const parsedValue = parseInt(value, 10);
      if (value == parsedValue && parsedValue >= 0) {
        this.currentAmount = parsedValue;
      }
    },
  },

  computed: {
    isConfigurable() {
      const { sku } = this.item;
      return sku.split('-').length > 1;
    },

    getOptionsProduct() {
      const { variants } = this.item;
      const { attributes } = variants.find(
        ({ product }) => product.id === this.item.id
      );
      const { configurable_options } = this.item;
      const labels = attributes.reduce((acc, { code, value_index }) => {
        const { values } = configurable_options.find(
          ({ attribute_code }) => attribute_code === code
        );
        const { label } = values.find((val) => val.value_index === value_index);
        return { ...acc, [code]: label };
      }, {});
      return labels;
    },

    getImagePath() {
      const fileName = getImagePath(this.item.image);
      if (this.item.type === 'simple') {
        return require('../assets/' + fileName);
      } else {
        return require('../assets/conf/' + fileName);
      }
    },

    getCurrency() {
      const { currency } = this.item.regular_price;
      if (currency === 'USD') {
        return `$`;
      } else {
        return 'Unknown currency';
      }
    },

    total() {
      return (this.item.regular_price.value * this.amount).toFixed(2);
    },
  },

  watch: {
    currentAmount() {
      if (this.currentAmount < 1) this.$emit('delItem', this.item);
      else this.$emit('changeAmount', [this.item, this.currentAmount]);
    },
  },
};
</script>

<style scoped src="../css/AppCartItem.css"></style>
