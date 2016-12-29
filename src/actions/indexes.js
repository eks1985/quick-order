
const generateGuids = (propName, items, keys, val) => {
  return keys.reduce((res, key) => (items[key][propName] === val) || (items[key][propName] === undefined && val === '') ? res.concat(key) : res, []);
};

const generateIndexex = (propName, items, keys) => {
  const indexSort = keys.reduce((res, key) => {
    const val = items[key][propName];
    if (val && !res.includes(val)) {
      res.push(items[key][propName]);
    }
    return res;
  }, ['']);
  const index =  indexSort.reduce((res, val) => {
    const guids = generateGuids(propName, items, keys, val);
    res[val.toLowerCase()] = guids;
    return res;
  }, {});
  return { index, indexSort: indexSort.sort() };
};

export const buildIndex = (propName) => {
  return (dispatch, getState) => {
    const items = getState().goods.itemsInitial; 
    const keys = Object.keys(items);
    const { index, indexSort } = generateIndexex(propName, items, keys); 
    const indexSortReverse = [ ...indexSort].reverse();
    dispatch({
      type: 'RECEIVE_INDEX_' + propName.toUpperCase(),
      payload: index
    });
    
    dispatch({
      type: 'RECEIVE_INDEX_SORT_' + propName.toUpperCase(),
      payload: indexSort
    });
    
    dispatch({
      type: 'RECEIVE_INDEX_SORT_REVERSE_' + propName.toUpperCase(),
      payload: indexSortReverse
    });
    
  };
};