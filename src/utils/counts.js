import { details } from '../utils/utils';

const getCounts = (wines) => {
  
  let countObj = {};
  for (const prop in details) {
    let filterPropCounts = details[prop].map((item, index) => {
      if (item !== "Other") {
        return wines.reduce(
          (acc, cur) => cur[prop] === item ? 
            ++acc : 
            acc, 
            0
        );
      } else {
        return wines.reduce(
          (acc, cur) => details[prop].indexOf(cur[prop]) < 0 ?
            ++acc :
            acc,
            0
        );
      }
    });
    countObj[prop] = filterPropCounts;
  };

  const InStock = wines.reduce(
    (acc, cur) => cur.Stock > 0 ?
      ++acc :
      acc,
      0
  );
  const OutStock = wines.length - InStock;
  countObj.Stock = [InStock, OutStock];

  return countObj;
};

export { getCounts };