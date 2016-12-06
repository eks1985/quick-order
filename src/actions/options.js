import { setCustomerOptionFirebase } from './options-firebase';

export const setOption = (option, value) => {
  return dispatch => {
    dispatch({
      type: 'SET_OPTION',
      option,
      value
    });
    if (option  === 'manageGoodsOnStockQty' && value === false) {
      dispatch({
        type: 'SET_OPTION',
        option: 'showGoodsOnStockQty',
        value: false
      });
      dispatch({
        type: 'SET_OPTION',
        option: 'positionIsActiveDefinition',
        value: 'positionData'
      });
    } 
    if (option  === 'managePositionIsActiveProp' && value === false) {
      dispatch({
        type: 'SET_OPTION',
        option: 'showNoActivePosition',
        value: false
      });
      dispatch({
        type: 'SET_OPTION',
        option: 'orderNoActivePositions',
        value: false
      });
      dispatch({
        type: 'SET_OPTION',
        option: 'positionIsActiveDefinition',
        value: ''
      });
    }
    if (option  === 'managePositionIsActiveProp' && value === true) {
      dispatch({
        type: 'SET_OPTION',
        option: 'positionIsActiveDefinition',
        value: 'positionData'
      });
    }
  };
};

export const moveHeaderColumn = (name, direction) => {
  return (dispatch, getState) => {
    const opt = getState().options.catalogListSettings;
    
    const pos = opt.indexOf(name);
    const newOpt =  direction === 'forward' 
      ? [ ...opt.slice(0, pos), opt[pos + 1], opt[pos], ...opt.slice(pos + 2) ]
      : [ ...opt.slice(0, pos - 1), opt[pos], opt[pos - 1], ...opt.slice(pos + 1) ];
    
    dispatch({
      type: 'SET_OPTION',
      option: 'catalogListSettings',
      value: newOpt
    });
    
    dispatch(setCustomerOptionFirebase('catalogListSettings', newOpt));
  };
};