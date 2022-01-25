import path from 'path';

const imageUrl =
  'https://raw.githubusercontent.com/fe-side/vue-test/master/assets/images/';

export default (currentPath) => {
  const fileName = path.basename(currentPath);
  return `${imageUrl}${fileName}`;
};
