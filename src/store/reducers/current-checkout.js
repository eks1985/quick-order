export default (state = '', action) => {
  switch (action.type) {
    case 'SET_FOCUSED_CHECKOUT':
      return action.payload;
    case 'RESET_FOCUSED_CHECKOUT':
      return '';
    default:
      return state;
  }
};
