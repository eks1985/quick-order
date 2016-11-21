const style = {
  position: 'absolute',
  left: 0,
  top: 0,
  background: '#ddd',
  border: '1px solid #bbb',
  padding: '10px',
  zIndex: 1000,
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center'
}
const initialState = {x: 0, y: 0, fullScreen: true, content: '', data: {}, style: style, showClose:  true };
export default (state , action) => {
  switch (action.type) {
    case 'SET_MODAL':
      const newStyle = { ...state.style, ...action.style };
      return {...state, ...action, style: newStyle};
    default:
      return state || initialState;
  }
};
