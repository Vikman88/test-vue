<template>
  <section class="main__filter filter">
    <h2 class="filter__title">All Brands</h2>
    <ul class="filter__list">
      <li
        v-for="brandItem in brands"
        :key="brandItem.id"
        @click="$emit('filterValue', brandItem.code)"
        class="filter__item brand-item"
      >
        {{ brandItem.title }}
      </li>
      <li @click="$emit('filterValue', '')" class="filter__item brand-item">
        Clear filter
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'AppFilter',

  emits: {
    filterValue: (value) => typeof value === 'string',
  },

  props: {
    brands: {
      type: Object,
      require: true,
    },
  },
};
</script>
