export default (state = {}, action ) => {
  switch (action.type) {
    case 'ADD_CATALOG_QTY':
      return { ...state, [action.guid]: action.qty };
    case 'RESET_CATALOG_QTY':
      return {};
    case 'REMOVE_CATALOG_QTY':
      const stateCopy = { ...state };
      delete stateCopy[action.guid];
      return stateCopy;
    default:
      return state;
  } 
};