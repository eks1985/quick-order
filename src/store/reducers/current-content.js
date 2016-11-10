export default (state = 'goods', action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONTENT':
      return action.contentName;
    default:
      return state;
  }
};
