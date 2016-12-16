export const setCustomer = (guid, description, address, phone, email, inn) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'RECEIVE_CUSTOMER',
      guid, 
      description,
      address,
      phone,
      email,
      inn
    });
  };
};

export const receiveCustomers = (payload) => {
  return {
    type: 'RECEIVE_CUSTOMERS',
    payload
  };
};

