export default (state = {'code': '', 'description': ''}, action) => {
  switch (action.type) {
    case 'RECEIVE_SORT_DIRECTION':
      return action.payload;
    default:
      return state;
  }
};