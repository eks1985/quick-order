import { isNumeric } from './../utils/index';
import { setCurrentContent } from './../actions/current-content';
import { setQtyPagesGoodsCheckout, goToGoodsPageCheckout, detectIsLastPageCheckout } from './goods-checkout-navigation';
import { filterByGroupGuids, setGoodsGroupsSelected } from './../actions/goods-groups';
import { searchByPropText } from './goods';
import { filterByPropValCheckout } from './indexes';
import { getObjectsByIds } from './../utils/index';

export const filterCartItems = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { filtersGoodsGroupsCartIds, items } = state.cart;
    let { filterText } = state.cart;
    const { codes, descriptions } = state.goods;
    filterText = filterText.toLowerCase();
    let result = items;
    let resultKeys = [];
    if (filterText.trim() === '') {
      result = items;
    } else {
      const words = filterText.split(' ');
      resultKeys = searchByPropText(words, codes, resultKeys);
      resultKeys = searchByPropText(words, descriptions, resultKeys);
      const itemsKeys = Object.keys(items);
      const resultCartKeys = resultKeys.reduce((res, key) => {
        return itemsKeys.includes(key) ? res.concat(key) : res;
      } ,[]);
      result = getObjectsByIds(resultCartKeys, items);
    }
    // filter by category
    if (filtersGoodsGroupsCartIds.length > 0) {
      result = filterByGroupGuids(filtersGoodsGroupsCartIds, items);
    }
    // filter by props val
    const filtersApplied = getState().filtersAppliedCheckout;
    const filtersAppliedKeys = Object.keys(filtersApplied);
    if (filtersAppliedKeys.length > 0) {
      result = filtersAppliedKeys.reduce((result, propName) => filterByPropValCheckout(getState().goods.itemsInitial, propName, filtersApplied[propName], result) , result);
    }

    dispatch({
      type: 'RECEIVE_CART_ITEMS_FILTETED',
      payload: result
    })
    dispatch(setQtyPagesGoodsCheckout());
    dispatch(goToGoodsPageCheckout(1));
    dispatch({
      type: 'RESET_FOCUSED_CHECKOUT'
    });
  }
}

const setGoodsGroupsIds = () => {
  return (dispatch, getState) => {
    const { items: cartItems } = getState().cart;
    const { itemsInitial: goodsItems } = getState().goods;
    const payload = Object.keys(cartItems).reduce((res, key) => {
      return res.includes(goodsItems[key].groupRef) ? res : [ ...res, goodsItems[key].groupRef ];
    }, []);
    dispatch({
      type: 'SET_GOODS_GROUPS_IDS_CHECKOUT',
      payload
    })
  }
}

export const setCurentGuidCheckout = guid => {
  return {
    type: 'SET_CURRENT_GOODS_GUID_CHECKOUT',
    payload: guid
  };
};


export const setTotalCartItems = () => {
  return (dispatch, getState) => {
    const itemsKeys = Object.keys(getState().cart.items);
    dispatch({
      type: 'SET_TOTAL_CART_ITEMS',
      payload: itemsKeys.length
    });
  };
};

export const setTotalCartAmount = () => {
  return (dispatch, getState) => {
    const cartState = getState().cart;
    const itemsKeys = Object.keys(cartState.items);
    const items  = cartState.items;
    const totalAmount = itemsKeys.reduce((result, key) => {
      return result += items[key].price*items[key].qty;
    }, 0);
    dispatch({
      type: 'SET_TOTAL_CART_AMOUNT',
      payload: totalAmount
    });
  };
};


export const addToCart = (guid, qty, price) => {
  return (dispatch, getState) => {
    const goodsItemsInitial = getState().goods.itemsInitial;
    const { code, description, groupRef } = goodsItemsInitial[guid];
    dispatch({
      type: 'ADD_TO_CART',
      guid,
      qty,
      price,
      code,
      description,
      amount: qty*price,
      groupRef
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
    dispatch(setGoodsGroupsIds());
    dispatch(setQtyPagesGoodsCheckout());
    dispatch(detectIsLastPageCheckout());
    dispatch(filterCartItems());
    dispatch(setGoodsGroupsSelected());
  };
};

export const removeFromCart = (guid) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      guid,
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
    dispatch(setGoodsGroupsIds());
    dispatch(setQtyPagesGoodsCheckout());
    dispatch(detectIsLastPageCheckout());
    dispatch(filterCartItems());
    dispatch(setGoodsGroupsSelected());
    dispatch({
      type: 'RESET_FOCUSED_CHECKOUT'
    });
    // check if cart empty - if yea go to catalogQty
    const cartIsEmpty = Object.keys(getState().cart.items).length === 0;
    cartIsEmpty && dispatch({
      type: 'SET_CURRENT_CONTENT',
      contentName: 'goods'
    });
  };
};

export const increaseCart = guid => {
  return (dispatch, getState) => {
    const current = getState().cart.items[guid];
    if (current) {
      const { qty, price, code, description } = current;
      dispatch({
        type: 'ADD_TO_CART',
        guid,
        qty: qty + 1,
        price,
        code,
        description,
        amount: (qty + 1)*price
      });
      dispatch(setTotalCartItems());
      dispatch(setTotalCartAmount());
      dispatch(filterCartItems());
    }
  };
};

export const decreaseCart = guid => {
  return (dispatch, getState) => {
    const current = getState().cart.items[guid];
    if (current) {
      const { qty, price, code, description } = current;
      if (qty > 1) {
        dispatch({
          type: 'ADD_TO_CART',
          guid,
          qty: qty - 1,
          price,
          code,
          description,
          amount: (qty - 1)*price
        });
        dispatch(setTotalCartItems());
        dispatch(setTotalCartAmount());
      } else if (qty === 1) {
        dispatch(removeFromCart(guid));
      }
    }
    dispatch(filterCartItems());
  };
};

export const cleanCart = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAN_CART',
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
    dispatch({
      type: 'RESET_CATALOG_QTY',
    });
    dispatch(setCurrentContent('goods'));
    dispatch(setGoodsGroupsIds());
    dispatch(setQtyPagesGoodsCheckout());
    dispatch(filterCartItems());
    dispatch(detectIsLastPageCheckout());
    dispatch(setGoodsGroupsSelected());
    dispatch({
      type: 'RESET_GOODS_GROUPS_FILTERS_CART'
    });
  };
};

export const updateCart = (guid, qty) => {
  return (dispatch, getState) => {
    dispatch({ //this will be handled by cart.items reducer
      type: 'UPDATE_CART',
      guid,
      qty
    });
    dispatch(setTotalCartItems());
    dispatch(setTotalCartAmount());
  };
};

const detectGuid = (codes, row) => {
  const words = row.trim().split(String.fromCharCode(9));
  if (words.length > 0) {
    let first = words[0].toLowerCase();
    return codes[first] ? codes[first][0] : '';
  } else {
    return '';
  }
};

const detectQty = (row) => {
  const words = row.trim().split(String.fromCharCode(9));
  if (words.length > 0) {
    let last = words[words.length - 1];
    return isNumeric(last) ? parseFloat(last) : 0;
  } else {
    return 0;
  }
};

export const parseQuickList = (text) => {
  return (dispatch, getState) => {
    const codes = getState().goods.codes;
    const rows = text.split("\n");
    const listItems = rows.reduce((res, row) => {
      res[row] = {'guid': detectGuid(codes, row), 'qty': detectQty(row)};
      return res;
    }, {});
    dispatch({
      type: 'RECEIVE_QUICK_LIST_ITEMS',
      payload: listItems
    });
  };
};

export const addQuickListToCart = (clean) => {
  return (dispatch, getState) => {
    clean && dispatch(cleanCart());
    const state = getState();
    const { quickList, prices } = state;
    for (let key in quickList) {
      if (quickList.hasOwnProperty(key)) {
        let current = quickList[key];
        if (current.guid && current.qty) {
          let price = prices[current.guid];
          dispatch(addToCart(current.guid, current.qty, price));
        }
      }
    }
    dispatch({
      type: 'RESET_QUICK_LIST_ITEMS'
    });
    dispatch({
      type: 'SET_CURRENT_CONTENT',
      contentName: 'checkout'
    });
  };
};


export const setFilterTextCart = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_FILTER_TEXT_CART',
      payload
    })
  }
}

export const addFilterGoodsGroupsCart = guid => ({
  type: 'ADD_GOODS_GROUPS_FILTER_CART',
  guid
});

export const removeFilterGoodsGroupsCart = guid => ({
  type: 'REMOVE_GOODS_GROUPS_FILTER_CART',
  guid
});

export const resetFiltersGoodsGroupsCart = () => ({
  type: 'RESET_GOODS_GROUPS_FILTERS_CART'
});


export const setTextFilterGoodsGroups = payload => ({
  type: 'SET_TEXT_FILTER_GOODS_GROUPS',
  payload
})
