import { combineReducers } from 'redux';

const initialStateHeaders = {
  'guid1': { guid: 'guid1',  number: 'number1', date: '2016-10-11', currency: '810', amount: '100', notice: 'commentaty 1'},
  'guid2': { guid: 'guid2',  number: 'number2', date: '2016-10-11', currency: '810', amount: '200', notice: 'commentaty 2'},
  'guid3': { guid: 'guid3',  number: 'number3', date: '2016-10-11', currency: '810', amount: '300', notice: 'commentaty 3'},
  'guid4': { guid: 'guid4',  number: 'number4', date: '2016-10-11', currency: '810', amount: '400', notice: 'commentaty 4'},
  'guid5': { guid: 'guid5',  number: 'number5', date: '2016-10-11', currency: '810', amount: '500', notice: 'commentaty 5'},
  'guid6': { guid: 'guid6',  number: 'number6', date: '2016-10-11', currency: '810', amount: '600', notice: 'commentaty 6'},
  'guid7': { guid: 'guid7',  number: 'number7', date: '2016-10-11', currency: '810', amount: '700', notice: 'commentaty 7'},
};

const headers = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS_HEADERS':
      return { ...state, ...action.payload }
    default:
      return state || initialStateHeaders;
  }
};

const initialStateItems = {
  'guid1_1': { guid: 'guid1_1',  code: 'code 1', desctiption: 'description 1', qty: 10, price: 100, discount: 20, amount: 800},
  'guid1_2': { guid: 'guid1_2',  code: 'code 2', desctiption: 'description 2', qty: 10, price: 100, discount: 20, amount: 800},
  'guid1_3': { guid: 'guid1_3',  code: 'code 3', desctiption: 'description 3', qty: 10, price: 100, discount: 20, amount: 800},
  'guid2_1': { guid: 'guid2_1',  code: 'code 1', desctiption: 'description 4', qty: 11, price: 200, discount: 30, amount: 100},
  'guid2_2': { guid: 'guid2_2',  code: 'code 3', desctiption: 'description 5', qty: 11, price: 200, discount: 30, amount: 100},
  'guid2_3': { guid: 'guid2_3',  code: 'code 4', desctiption: 'description 6', qty: 11, price: 200, discount: 30, amount: 100},
  'guid3_1': { guid: 'guid3_1',  code: 'code 5', desctiption: 'description 7', qty: 12, price: 300, discount: 10, amount: 200},
  'guid3_2': { guid: 'guid3_2',  code: 'code 6', desctiption: 'description 8', qty: 12, price: 300, discount: 10, amount: 200},
  'guid3_3': { guid: 'guid3_3',  code: 'code 7', desctiption: 'description 4', qty: 12, price: 300, discount: 10, amount: 200},
  'guid4_1': { guid: 'guid4_1',  code: 'code 8', desctiption: 'description 2', qty: 13, price: 400, discount: 20, amount: 300},
  'guid4_2': { guid: 'guid4_2',  code: 'code 9', desctiption: 'description 4', qty: 13, price: 400, discount: 20, amount: 300},
  'guid4_3': { guid: 'guid4_3',  code: 'code 0', desctiption: 'description 5', qty: 13, price: 400, discount: 20, amount: 300},
  'guid5_1': { guid: 'guid5_1',  code: 'code 1', desctiption: 'description 6', qty: 14, price: 500, discount: 30, amount: 400},
  'guid5_2': { guid: 'guid5_2',  code: 'code 2', desctiption: 'description 7', qty: 14, price: 500, discount: 30, amount: 400},
  'guid5_3': { guid: 'guid5_3',  code: 'code 3', desctiption: 'description 3', qty: 14, price: 500, discount: 30, amount: 400},
  'guid6_1': { guid: 'guid6_1',  code: 'code 4', desctiption: 'description 1', qty: 15, price: 600, discount: 60, amount: 500},
  'guid6_2': { guid: 'guid6_2',  code: 'code 5', desctiption: 'description 2', qty: 15, price: 600, discount: 60, amount: 500},
  'guid6_3': { guid: 'guid6_3',  code: 'code 6', desctiption: 'description 4', qty: 15, price: 600, discount: 60, amount: 500},
  'guid7_1': { guid: 'guid7_1',  code: 'code 7', desctiption: 'description 5', qty: 16, price: 700, discount: 40, amount: 600},
  'guid7_2': { guid: 'guid7_2',  code: 'code 8', desctiption: 'description 6', qty: 16, price: 700, discount: 40, amount: 600},
  'guid7_3': { guid: 'guid7_3',  code: 'code 7', desctiption: 'description 3', qty: 16, price: 700, discount: 40, amount: 600},
};

const pageNumber = (state = 0, action) => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER_ORDERS':
      return action.pageNumber;
    default:
     return state;
  }
}

const qtyPages = (state = 0, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_ORDERS':
      return action.qtyPages;
    default:
     return state;
  }
}


const isLastPage = (state = false, action) => {
  switch (action.type) {
    case 'SET_QTY_PAGES_ORDERS':
      return action.qtyPages;
    default:
     return state;
  }
}

const items = (state, action) => {
  switch (action.type) {
    default:
      return state || initialStateItems;
  }
};

export default combineReducers(
  {
    headers,
    items,
    pageNumber,
    qtyPages,
    isLastPage
  }
);
