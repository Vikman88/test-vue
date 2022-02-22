<template>
  <div class="container-options__color">
    <p class="container-options__title">Color:</p>
    <div class="container-options__color-variants">
      <div
        class="color-variant__btn"
        v-for="optionColor in filteredColorOtions"
        :key="optionColor.value_index"
      >
        <input
          :disabled="optionColor.disabled"
          v-model="pickedColor"
          type="radio"
          :id="createId(optionColor, productItem)"
          :value="optionColor.value_index"
        />
        <label
          :for="createId(optionColor, productItem)"
          :style="addColor(optionColor)"
        ></label>
      </div>
    </div>
  </div>
  <div class="container-options__size">
    <p class="container-options__title">Size:</p>
    <div class="container-options__size-variants">
      <div
        class="size-variant__btn"
        v-for="optionSize in filteredSizeOtions"
        :key="optionSize.value_index"
      >
        <input
          :disabled="optionSize.disabled"
          v-model="pickedSize"
          type="radio"
          :id="createId(optionSize, productItem)"
          :value="optionSize.value_index"
        />
        <label :for="createId(optionSize, productItem)">{{
          optionSize.label
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},

  emits: {
    getConfigurableProduct: null,
  },

  props: {
    productItem: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      pickedColor: '',
      pickedSize: '',
    };
  },

  watch: {
    pickedColor() {
      this.getConfigurableProduct();
    },

    pickedSize() {
      this.getConfigurableProduct();
    },
  },

  methods: {
    addColor({ value }) {
      return { ['background-color']: value };
    },

    createId(option, productItem) {
      return `${option.value_index}_${productItem.id}`;
    },

    getConfigurableProduct() {
      if (this.pickedColor !== '' && this.pickedSize !== '') {
        const { product } = this.productItem.variants.find(({ attributes }) => {
          const [color, size] = attributes;
          if (
            color.value_index === this.pickedColor &&
            size.value_index === this.pickedSize
          ) {
            return true;
          }
          return false;
        });
        this.$emit('getConfigurableProduct', product);
      }
    },

    changedOption(selector) {
      const availableOptions = this.productItem.variants.reduce(
        (acc, { attributes }) => {
          const [color, size] = attributes;
          if (selector === 'color') {
            return size.value_index === this.pickedSize ? [...acc, color] : acc;
          } else {
            return color.value_index === this.pickedColor
              ? [...acc, size]
              : acc;
          }
        },
        []
      );

      const selectedOptions =
        selector === 'color'
          ? this.getOptions.colorOptions
          : this.getOptions.sizeOptions;

      const changedOptions = selectedOptions.reduce((acc, option) => {
        const isDisable = !availableOptions.some(
          ({ value_index }) => value_index === option.value_index
        );
        if (isDisable) {
          return [...acc, { ...option, disabled: true }];
        } else {
          return [...acc, { ...option, disabled: false }];
        }
      }, []);

      return changedOptions;
    },
  },

  computed: {
    getOptions() {
      const options = this.productItem.configurable_options;

      const colorOptions = options.find(
        ({ attribute_code }) => attribute_code === 'color'
      ).values;

      const sizeOptions = options.find(
        ({ attribute_code }) => attribute_code === 'size'
      ).values;

      return { colorOptions, sizeOptions };
    },

    filteredColorOtions() {
      if (this.pickedSize !== '') {
        return this.changedOption('color');
      }
      return this.getOptions.colorOptions;
    },

    filteredSizeOtions() {
      if (this.pickedColor !== '') {
        return this.changedOption('size');
      }
      return this.getOptions.sizeOptions;
    },
  },
};
</script>

<style scoped src="../css/AppOptions.css"></style>
