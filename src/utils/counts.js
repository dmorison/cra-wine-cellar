import { filterHeads } from './filterHeads';

const getCounts = (wines) => {
  
  let countObj = {};
  for (const prop in filterHeads) {
    let filterPropCounts = filterHeads[prop].map((item, index) => {
      if (item !== "Other") {
        return wines.reduce(
          (acc, cur) => cur[prop] === item ? 
            ++acc : 
            acc, 
            0
        );
      } else {
        return wines.reduce(
          (acc, cur) => filterHeads[prop].indexOf(cur[prop]) < 0 ?
            ++acc :
            acc,
            0
        );
      }
    });
    countObj[prop] = filterPropCounts;
  };

  const InStock = wines.reduce(
    (acc, cur) => Number(cur.Stock) > 0 ?
      acc + Number(cur.Stock) :
      acc,
      0
  );
  countObj.Stock = InStock;

  return countObj;
};

export { getCounts };