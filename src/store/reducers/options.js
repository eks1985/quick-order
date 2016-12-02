const initialState = {
  manageGoodsOnStockQty: false,
  managePositionIsActiveProp: false,
  orderNoActivePositions: false, 
  positionIsActiveDefinition: 'positionData',
  showGoodsOnStockQty: false,
  showNoActivePosition: false
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_OPTION':
      return { ...state, [action.option]: action.value };
    default:
      return state || initialState;
  }
};