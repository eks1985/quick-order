export const setCustomer = (guid, description, address, phone, email, inn, priceType) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'RECEIVE_CUSTOMER',
      guid,
      description,
      address,
      phone,
      email,
      inn,
      priceType
    });
  };
};

export const receiveCustomers = payload => {
  return {
    type: 'RECEIVE_CUSTOMERS',
    payload
  };
};
