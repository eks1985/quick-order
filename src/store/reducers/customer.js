import { customerInitialState } from './../../utils/init';

export default (state, action) => {
  switch (action.type) {
    case 'RECEIVE_CUSTOMER_DATA':
      return action.payload;
    default:
      return state || customerInitialState();
  }
}
