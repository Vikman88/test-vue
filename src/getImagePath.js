import path from 'path';

export default (defaultPath) => {
  const fileName = path.basename(defaultPath);
  return fileName;
};
