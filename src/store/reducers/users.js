export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return action.payload
    default:
      return state;
  }
};

// Selectors

export const getUsersAdmins = (users) => {
  const keys = Object.keys(users);
  return keys.reduce((res, key) => {
    return users[key].admin ? { ...res, [key]: users[key] } : res;
  }, {});
};

export const getUsersNoAdmins = (users) => {
  const keys = Object.keys(users);
  return keys.reduce((res, key) => {
    return !users[key].admin ? { ...res, [key]: users[key] } : res;
  }, {});
};
