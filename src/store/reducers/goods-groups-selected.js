export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_GOODS_GROUPS_SELECTED':
      return action.payload;
    default:
      return state;
  }
};
