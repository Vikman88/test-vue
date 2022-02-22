import axios from 'axios';

const productsUrl =
  'https://raw.githubusercontent.com/fe-side/vue-test/master/assets/level3/products.json';

const brandsUrl =
  'https://raw.githubusercontent.com/fe-side/vue-test/master/assets/brands.json';

export const getProductsData = async () => {
  const response = await axios.get(productsUrl);
  return response.data;
};

export const getBrandsData = async () => {
  const response = await axios.get(brandsUrl);
  return response.data;
};
