const initialState = {
  manageGoodsOnStockQty: true,
  managePositionIsActiveProp: false,
  orderNoActivePositions: false,
  positionIsActiveDefinition: '',
  showGoodsOnStockQty: false,
  showNoActivePosition: false,
  catalogListSettings: ['code', 'description', 'price', 'qty'], //production
  // catalogListSettings: ['code', 'description', 'price', 'qty', 'brand'], //test
  catalogListColumns: {} //production
  // catalogListColumns: {brand: [true,true,true] } //test
};

export default (state, action) => {
  switch (action.type) {
    case 'RECEIVE_OPTIONS':
      return { ...state, ...action.payload };
    case 'SET_OPTION':
      return { ...state, [action.option]: action.value };
    default:
      return state || initialState;
  }
};

// Selectors

export const getColumns = (state) => {
  const { catalogListColumns, catalogListSettings } = state;
  const columnsKeys = Object.keys(catalogListColumns);
  return columnsKeys.reduce((res, key) => {
    return res.indexOf(key) === -1 && catalogListColumns[key][0] === true  ? res.concat(key) : res;
  }, catalogListSettings);
};
