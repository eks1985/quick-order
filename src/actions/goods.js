import { filterByGroupGuids } from './goods-groups';

//{Search index

export const generateCodes = () => {
  return (dispatch, getState) => {
    const goods = getState().goods.items;
    const goodsKeys = Object.keys(goods);
    const codes = goodsKeys.reduce((result, key) => {
      const code = goods[key].code;
      result[code.toLowerCase()] = [key];
      return result;
    }, {});
    dispatch({
      type: 'RECEIVE_CODES',
      payload: codes
    });
  };
};

const generateDescrGuids = (goods, descr) => {
  const goodsKeys = Object.keys(goods);
  return goodsKeys.reduce((res, key) => {
    return goods[key].description === descr ? res.concat(key) : res;
  }, []);
};

export const generateDescriptions = () => {
  return (dispatch, getState) => {
    const goods = getState().goods.items;
    const goodsKeys = Object.keys(goods);
    const descrArr = goodsKeys.reduce((res, key) => {
      res.push(goods[key].description);
      return res;
    }, []);
    const descriptions =  descrArr.reduce((res, descr) => {
      const guids = generateDescrGuids(goods, descr);
      res[descr.toLowerCase()] = guids;
      return res;
    }, {});
    dispatch({
      type: 'RECEIVE_DESCRIPTIONS',
      payload: descriptions
    });
  };
};

//Search index }

//{Order index

export const generateOrderIndexCodes = () => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const index = keys.map( key => items[key].code );
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_CODES',
      payload: index.sort()
    });
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_CODES_REVERSE',
      payload: [ ...index ].reverse()
    });
  };
};

export const generateOrderIndexDescriptions = () => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const index = keys.map( key => items[key].description );
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_DESCRIPTIONS',
      payload: index.sort()
    });
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_DESCRIPTIONS_REVERSE',
      payload: [ ...index ].reverse()
    });
  };
};

export const generateOrderIndexProp = (propName) => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial;
    const keys = Object.keys(items);
    const index = keys.map( key => items[key][propName] );
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_' + propName.toUpperCase(),
      payload: index.sort()
    });
    dispatch({
      type: 'RECEIVE_GOODS_ORDER_INDEX_' + propName.toUpperCase() + '_REVERSE',
      payload: [ ...index ].reverse()
    });
  };
};

//Order index}

export const setCurentGuid = (guid) => {
  return {
    type: 'SET_CURRENT_GOODS_GUID',
    payload: guid
  };
};

export const setQtyPagesGoods = () => {
  return (dispatch, getState) => {
      const keysLength = Object.keys(getState().goods.items).length;
      const qtyPages = keysLength % 10 === 0 ? keysLength / 10  : Math.floor(keysLength / 10) + 1;
      dispatch({
        type: 'SET_QTY_PAGES_GOODS',
        qtyPages: qtyPages || 1
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
    const isLastPage = getState().goods.isLastPage;
    if (!isLastPage) {
      dispatch({
        type: 'INCREASE_PAGE_NUMBER_GOODS'
      });
      dispatch(detectIsLastPage());
    }
  };
};

export const moveGoodsBack = () => {
  return (dispatch, getState) => {
    const isFirstPage = getState().goods.pageNumber === 1;
    if (!isFirstPage) {
      dispatch({
        type: 'DECREASE_PAGE_NUMBER_GOODS'
      });
      dispatch(detectIsLastPage());
    }
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

const searchByDescription = (descriptions, keys, text) => {
  return keys.reduce((result, key) => {
    return key.includes(text) ? [ ...result, ...descriptions[key] ] : result;
  }, []);
};

// TODO 
const searchByProps = (words, getState) => {
  return {};
};

export const search = () => {
  return (dispatch, getState) => {
    const state = getState().goods;
    const { codes, descriptions, itemsInitial, searchText } = state;
    const codesKeys = Object.keys(codes);
    const descriptionsKeys = Object.keys(descriptions);
    let text = searchText.toLowerCase();
    let result;
    if (text.trim() === '') {
      result = itemsInitial;
    } else {
      //search by code
      result  = codesKeys.reduce((result, key) => {
        return key.includes(text) ? [ ...result, ...codes[key] ] : result;
      }, []);
      const words = text.split(' ');
      result = words.reduce( (res, word) => {
        return [ ...result, ...searchByDescription(descriptions, descriptionsKeys, word.trim()) ];
      }, result);
      result = [ ...result, ...searchByProps(words, getState) ];
      result = result.reduce((res, elem) => {
        res[elem] = itemsInitial[elem];
        return res;
      }, {});
    }
    
    const goodsGroupsFiltersIds = getState().goodsGroups.filtersIds;
    if (goodsGroupsFiltersIds.length > 0) {
      result = filterByGroupGuids(goodsGroupsFiltersIds, result);
    }

    dispatch({
      type: 'SET_GOODS_LIST',
      payload: result,
    });
    dispatch(setQtyPagesGoods());
    dispatch(goToGoodsPage(1));
  };
};

export const resetPagination = () => {

};

export const setSearchText = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_SEARCH_TEXT',
      payload
    });
    dispatch(search());
  };
};

// Sort

const buildListByProp = (index, prop, items) => {
  const keys = index[prop.toLowerCase()];
  return keys.reduce((res, key) => {
    return { [key]: items[key] };
  }, {});
};

const buildListByOrderIndex = (orderIndex, items, index, columnKey) => {
  
  console.log('orderIndex', orderIndex);
  console.log('items', items);
  console.log('index', index);
  console.log('columnKey', columnKey);
  
  const itemsKeys = Object.keys(items);
  const itemsProps = itemsKeys.reduce((res, key) => [ ...res, items[key][columnKey] ], []);
  return orderIndex.reduce((res, key) => {
    return itemsProps.indexOf(key) > -1 ? { ...res, ...buildListByProp(index, key, items) } : res;
  }, {});
};

export const sortGoods = (columnKey) => {
  return (dispatch, getState) => {
    const directionAll = getState().sortDirection;
    const directionColumn = directionAll[columnKey];
    const directionColumnNew = directionColumn  === 'forward' ? 'reverse': 'forward';
    const items = getState().goods.items;
    const index = (columnKey === 'code' || columnKey === 'description') ? getState().goods[columnKey + 's'] : getState()['__index__' + columnKey].index;
    let orderIndex;
    if (columnKey === 'code' || columnKey === 'description') {
      if (directionColumnNew === 'forward') {
        orderIndex = getState().goods[ columnKey + 'OrderIndex'];
      } else {
        orderIndex = getState().goods[ columnKey + 'OrderIndexReverse'];
      }
    } else {
      if (directionColumnNew === 'forward') {
        orderIndex = getState()['__index__' + columnKey].indexSort;
      } else {
        orderIndex = getState()['__index__' + columnKey].indexSortReverse;
      }
    }
    const directionAllKeys = Object.keys(directionAll);
    const directionAllNew = directionAllKeys.reduce((res, key) => ({ ...res, [key]: ''}), {});
    directionAllNew[columnKey] = directionColumnNew; 
    dispatch({
      type: 'RECEIVE_SORT_DIRECTION',
      payload: directionAllNew
    }); 
    dispatch({
      type: 'SET_GOODS_LIST',
      payload: buildListByOrderIndex(orderIndex, items, index, columnKey) 
    });
  };
};
