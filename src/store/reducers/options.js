const initialState = {
  manageGoodsOnStockQty: true,
  managePositionIsActiveProp: false,
  orderNoActivePositions: false,
  positionIsActiveDefinition: '',
  showGoodsOnStockQty: false,
  showNoActivePosition: false,
  managePrices: 'common', //common, byCustomers, dontUse
  catalogListSettings: ['code', 'description', 'price', 'qty'], //production
  catalogListSettingsCheckout: ['code', 'description', 'price', 'qty', 'amount', 'delete'],
  catalogListColumns: {}, //production,
  catalogListColumnsCheckout: {}, //production,
  showPictures: {row: false, side: false, dialog: false},
  categoryLineSeparator: false,
  pictureSource: 'url', //ukr, firebase,
  allowDraftOrders: false,
  allowDeleteOrders: false,
  permanentDeleteOrders: false,
  ordersRowsSeparator: false
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

export const getColumns = state => {
  const { catalogListColumns, catalogListSettings, managePrices } = state;
  const columnsKeys = Object.keys(catalogListColumns);
  let columns = catalogListSettings.reduce((res, key) => {
    if (!columnsKeys.includes(key)) {
      return res.concat(key);
    } else {
      if  (catalogListColumns[key][0] === true) {
        return res.concat(key);
      } else {
        return res;
      }
    }
  }, []);
  columns.includes('price') && managePrices === 'dontUse' && columns.splice(columns.indexOf('price'), 1) ;
  return columns;
};

export const getColumnsCheckout = state => {
  const { catalogListColumnsCheckout, catalogListSettingsCheckout, managePrices } = state;
  const columnsKeys = Object.keys(catalogListColumnsCheckout);
  let columns = catalogListSettingsCheckout.reduce((res, key) => {
    if (!columnsKeys.includes(key)) {
      return res.concat(key);
    } else {
      if  (catalogListColumnsCheckout[key][0] === true) {
        return res.concat(key);
      } else {
        return res;
      }
    }
  }, []);
  columns = columnsKeys.reduce((res, key) => {
    return catalogListColumnsCheckout[key][0] === true && !columns.includes(key) ? columns.concat(key) : res;
  }, columns);
  columns.includes('price') && managePrices === 'dontUse' && columns.splice(columns.indexOf('price'), 1) ;
  return columns;
};
