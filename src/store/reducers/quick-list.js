export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_QUICK_LIST_ITEMS':
      return action.payload;
    case 'RESET_QUICK_LIST_ITEMS':
      return {};
    default:
      return state;
  }
};
