import goodsInitial from './../store/reducers/initialData/goods.json';
import { v4 } from 'node-uuid';

export const randomInt = (min, max) => {
  let rand = min + Math.random() * (max - min);
  rand = Math.round(rand);
  return rand;
};

export const customerInitialState = () => {
  return  {
    guid: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    inn: ''
  };
};

export const ordersInitialState = () => {
  const ordersHeaders = {};
  const ordersItems = {};
  for (var i = 0; i < 10; i++) {

    //headers
    const ordNr = v4();
    const date  = new Date();
    ordersHeaders[ordNr] = {nr: ordNr, enterpriseNr: ordNr.substr(0, 10), date};

    //items
    const rowsQty = randomInt(1, 10);
    const goodsKeys = Object.keys(goodsInitial);
    //rows generation
    const generatedRows = {};
    let totalAmount = 0;
    for (var j = 0; j < rowsQty; j++) {
      let randomKeyPos = randomInt(0, goodsKeys.length-1);
      const qty = randomInt(1, 100);
      const price = randomInt(100, 1000);
      const goodsCurrent = goodsInitial[goodsKeys[randomKeyPos]];
      generatedRows[goodsKeys[randomKeyPos]] = {qty, price, amount: qty*price, code: goodsCurrent.code, description: goodsCurrent.description};
      totalAmount += qty*price;
    }
    ordersItems[ordNr] = generatedRows;
    ordersHeaders[ordNr].amount = totalAmount;

  }

  return {ordersHeads: ordersHeaders, ordersItems: ordersItems};

};

export const pricesInitialState = () => {
  const keys = Object.keys(goodsInitial);
  const prices = {};
  keys.forEach(key => {
    prices[key] = randomInt(1, 100);
  });
  return prices;
};
