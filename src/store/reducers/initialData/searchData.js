import goods from './goods';

//Stress test

// import { randomInt } from './../../../utils/init';
// import guids from './guids';
//
// export const generateCodes = () => {
//   return guids.reduce((result, guid) => {
//     const code = guid.substring(0, 8);
//     result[code] = [guid];
//     return result;
//   }, {});
// };
//
// const generateDescrGuids = () => {
//   const res = [];
//   const numb = randomInt(1, 3);
//   for (var i = 0; i < numb; i++) {
//     let pos = randomInt(0, guids.length - 1);
//     res.push(guids[pos]);
//   }
//   return res;
// }
//
// export const generateDescriptions = () => {
//   const keys = Object.keys(goods);
//   const descrArr = keys.reduce((res, key) => {
//     res.push(goods[key].description);
//     return res;
//   }, []);
//   return descrArr.reduce((res, descr) => {
//     const guids = generateDescrGuids();
//     res[descr] = guids;
//     return res;
//   }, {});
// };


export const generateCodes = () => {
  const goodsKeys = Object.keys(goods);
  return goodsKeys.reduce((result, key) => {
    const code = goods[key].code;
    result[code.toLowerCase()] = [key];
    return result;
  }, {});
};

const generateDescrGuids = (descr) => {
  const goodsKeys = Object.keys(goods);
  return goodsKeys.reduce((res, key) => {
    return goods[key].description === descr ? res.concat(key) : res;
  }, []);
}

export const generateDescriptions = () => {
  const keys = Object.keys(goods);
  const descrArr = keys.reduce((res, key) => {
    res.push(goods[key].description);
    return res;
  }, []);
  return descrArr.reduce((res, descr) => {
    const guids = generateDescrGuids(descr);
    res[descr.toLowerCase()] = guids;
    return res;
  }, {});
};
