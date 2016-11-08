const initialState = {x: 0, y: 0, fullScreen: false, content: '', data: {} };
export default (state , action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {...state, ...action};
    default:
      return state || initialState;
  }
};
