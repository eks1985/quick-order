import { setCustomerOptionFirebase } from './options-firebase';

export const setOption = (option, value) => {
  return dispatch => {
    dispatch({
      type: 'SET_OPTION',
      option,
      value
    });
    // setOptionFirebase(option, value);  
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