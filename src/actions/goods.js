export const setCurentGuid = (guid) => {
  return {
    type: 'SET_CURRENT_GOODS_GUID',
    payload: guid
  };
};

export const setQtyPagesGoods = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().goods.items).length;
      dispatch({
        type: 'SET_QTY_PAGES_GOODS',
        qtyPages: keysLength % 10 === 0 ? keysLength / 10  : Math.floor(keysLength / 10) + 1
      });
  };
};

export const detectIsLastPage = () => {
  return (dispatch, getState) => {
      const { qtyPages, pageNumber } = getState().goods;
      const payload = qtyPages === pageNumber;
      dispatch({
        type: 'SET_IS_LAST_PAGE_GOODS',
        payload: payload
      });
  };
};

export const moveGoodsForward = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'INCREASE_PAGE_NUMBER_GOODS'
    });
    dispatch(detectIsLastPage());
  };
};

export const moveGoodsBack = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'DECREASE_PAGE_NUMBER_GOODS'
    });
    dispatch(detectIsLastPage());
  };
};

export const goToGoodsPage = (pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_PAGE_NUMBER_GOODS',
      pageNumber: pageNumber
    });
    dispatch(detectIsLastPage());
  };
};

export const search = (text) => {
  return (dispatch, getState) => {
    const state = getState().goods;
    const { codes, descriptions } = state;
    const codesKeys = Object.keys(codes);
    const descriptionsKeys = Object.keys(descriptions);
    //search by code
    let result  = codesKeys.reduce((result, key) => {
      return key.includes(text) ? [ ...result, ...codes[key] ] : result
    }, []);
    // search by description
    result  = descriptionsKeys.reduce((result, key) => {
      // if (key.includes(text)) {
      //   console.log(key);
      // }
      return key.includes(text) ? [ ...result, ...descriptions[key] ] : result
    }, result);

    const obj = result.reduce((result, elem) => {
      result[elem] = true;
      return result;
    }, {})

    console.log('seach result', Object.keys(obj));
    console.log("search end", new Date());
    //return Object.keys(obj);
  }
}
