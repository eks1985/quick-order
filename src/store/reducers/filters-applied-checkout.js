export default (state = {}, action) => {
  switch (action.type) {
    case 'APPLY_FILTER_BY_PROP_CHECKOUT':
      const { propName, keys } = action;
      return { ...state, [propName]: keys };
    case 'CLEAR_FILTER_BY_PROP_CHECKOUT':
      const { propName: propNameToReset } = action;
      const stateCopy = { ...state };
      stateCopy[propNameToReset] = [];
      return stateCopy;
    default:
      return state;
  }
};
