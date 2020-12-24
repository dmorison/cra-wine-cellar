export const formatData = (data) => {
  const keys = data[0];
  const values = data.slice(1);
  const objects = values.map(array => {
    const object = {};
    keys.forEach((key, i) => object[key] = array[i]);
    return object;
  });
  return objects;
};