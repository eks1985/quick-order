export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CUSTOMERS':
      return action.payload;
    default:
      return state;
  }
};
