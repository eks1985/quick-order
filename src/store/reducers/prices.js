import { pricesInitialState } from './../../utils/init';

export default (state, action) => {
  switch (action.type) {
    case 'PRICES_RECEIVE_DATA':
      return { ...state, ...action.payload};
    default:
      return state || pricesInitialState();
  }
};
