
export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_PRICES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
