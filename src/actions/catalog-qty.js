export const addCatalogQty = (guid, qty) => {
  return {
    type: 'ADD_CATALOG_QTY',
    guid, 
    qty
  };  
};  

export const removeCatalogQty = (guid) => {
  return {
    type: 'REMOVE_CATALOG_QTY',
    guid 
  };  
};  

export const changeCatalogQty = () => {
  return {
    type: 'RESET_CATALOG_QTY',
  };  
};  