const initialState = {
  manageGoodsOnStockQty: true,
  managePositionIsActiveProp: false,
  orderNoActivePositions: false,
  positionIsActiveDefinition: 'positionData',
  showGoodsOnStockQty: false,
  showNoActivePosition: false,
  catalogListSettings: ['code', 'description', 'qty', 'price']
};

export default (state, action) => {
  switch (action.type) {
    case 'SET_OPTION':
      return { ...state, [action.option]: action.value };
    default: 
      return initialState;
  }
};
