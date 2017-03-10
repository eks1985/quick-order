const  initialState = {
  guid: '',
  description: '',
  address: '',
  phone: '',
  email: '',
  inn: '',
  priceType: ''
};

export default (state, action) => {
  switch (action.type) {
    case 'RECEIVE_CUSTOMER':
      return { ...state, ...action };
    case 'RESET_CUSTOMER':
      return initialState;
    default:
      return state || initialState;
  }
};
