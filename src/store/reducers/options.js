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

// export const getColumns = state => {
//   const { catalogListColumns, catalogListSettings } = state;
//   console.log('catalogListColumns', catalogListColumns);
//   console.log('catalogListSettings', catalogListSettings);
//   const columnsKeys = Object.keys(catalogListColumns);
//   return columnsKeys.reduce((res, key) => {
//     return res.indexOf(key) === -1 && catalogListColumns[key][0] === true  ? res.concat(key) : res;
//   }, catalogListSettings);
// };

export const getColumns = state => {
  const { catalogListColumns, catalogListSettings } = state;
  const columnsKeys = Object.keys(catalogListColumns);
  return catalogListSettings.reduce((res, key) => {
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
};

export const getColumnsCheckout = state => {
  const { catalogListColumnsCheckout, catalogListSettingsCheckout } = state;
  const columnsKeys = Object.keys(catalogListColumnsCheckout);
  const columns = catalogListSettingsCheckout.reduce((res, key) => {
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
  return columnsKeys.reduce((res, key) => {
    return catalogListColumnsCheckout[key][0] === true && !columns.includes(key) ? columns.concat(key) : res;
  }, columns);
};
