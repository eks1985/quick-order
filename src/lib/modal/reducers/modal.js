const style = {
  position: 'absolute',
  left: 0,
  top: 0,
  background: '#eee',
  border: '1px solid #bbb',
  padding: '10px',
  zIndex: 1000,
  content: 'login'
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center'
};
const initialState = {x: 0, y: 0, fullScreen: true, center: false, content: '', data: {}, style: style, showClose: true };
export default (state , action) => {
  switch (action.type) {
    case 'SET_MODAL':
      let newStyle = {};
      if (Object.keys(action.style).length > 0) {
        newStyle = { ...style, ...action.style };
      } else {
        newStyle = style;
      }
      return {...state, ...action, style: newStyle};
    default:
      return state || initialState;
  }
};
