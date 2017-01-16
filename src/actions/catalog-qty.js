export const addCatalogQty = (guid, qty) => {
  return {
    type: 'ADD_CATALOG_QTY',
    guid,
    qty
  };
};

export const removeCatalogQty = guid => {
  return {
    type: 'REMOVE_CATALOG_QTY',
    guid
  };
};

export const resetCatalogQty = () => {
  return {
    type: 'RESET_CATALOG_QTY',
  };
};

export const increaseCatalogQty = guid => {
  return (dispatch, getState) => {
    const current = getState().catalogQty[guid];
    if (current) {
      dispatch({
        type: 'ADD_CATALOG_QTY',
        guid,
        qty: current + 1
      });
    }
  };
};

export const decreaseCatalogQty = guid => {
  return (dispatch, getState) => {
    const current = getState().catalogQty[guid];
    if (current) {
      if (current > 1) {
        dispatch({
          type: 'ADD_CATALOG_QTY',
          guid,
          qty: current - 1
        });
      } else if (current === 1) {
        dispatch(removeCatalogQty(guid));
      }
    }
  };
};
