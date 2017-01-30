export default (state = '', action) => {
  switch (action.type) {
    case 'SET_FOCUSED':
      return action.payload;
    case 'RESET_FOCUSED':
      return '';
    default:
      return state;
  }
};
