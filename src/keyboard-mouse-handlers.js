export const keyboardKeyUpHandler = (e, rowsPerPage, prices, dispatch, moveGoodsForward, moveGoodsBack, search, setSearchText, setFilterTextCart, filterCartItems, addToCart, removeFromCart, addCatalogQty, removeCatalogQty, setModal)  => {
  if (e.key === '/' || e.which === 111) {
    document.querySelector('#search').focus();
  }
  if (e.which === 13 && document.activeElement.id === 'search') {
    const text = document.querySelector('#search').value;
    dispatch(search(text));
    dispatch(setSearchText(text));
  }
  if (e.which === 13 && document.activeElement.id === 'editQtyRowCheckout') {
    //Press Enter while inside edit cart row qty modal dialog
    const rawVal = document.getElementById('editQtyRowCheckout').value;
    const guid = this.props.modal.data.keyProp;
    const val = parseInt(rawVal, 10) || rawVal;
    if (val === '' || val === 0) {
      dispatch(removeFromCart(guid));
      dispatch(removeCatalogQty(guid));
      dispatch(setModal());
    }
    if (parseInt(val, 10) === val) {
      dispatch(addCatalogQty(guid, val));
      dispatch(addToCart(guid, val, prices[guid]));
      dispatch(setModal());
    } else {
    }
  }
  if (e.which === 13 && document.activeElement.id === 'searchCart') {
    const text = document.querySelector('#searchCart').value;
    dispatch(setFilterTextCart(text));
    dispatch(filterCartItems());
  }

  if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
    let id = parseInt(document.activeElement.id, 10);
    let newId = id < rowsPerPage - 1 ? id + 1 : 0;
    document.getElementById(newId).focus();
  }
  // down
  if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
    let id = parseInt(document.activeElement.id, 10);
    let newId = id < rowsPerPage - 1 ? id + 1 : 0;
    document.getElementById(newId).focus();
  }
  // up
  if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
    let id = parseInt(document.activeElement.id, 10);
    let newId = id > 0 ? id - 1 : rowsPerPage - 1;
    document.getElementById(newId).focus();
  }
  if (e.which === 34) {
    dispatch(moveGoodsForward());
    document.getElementById(0).focus();
  }
  if (e.which === 33) {
    dispatch(moveGoodsBack());
    document.getElementById(0).focus();
  }

}

export const clickHandler = (e, dispatch, current, currentCheckout, currentContent) => {
  let className = '';
  try {
    className = e.target.className;
  } catch (e) {}
  if (currentContent === 'goods') {
    className = typeof className === 'string' ? className : '';
    className !== 'catalogQtyInput' &&
    !className.includes('row-cell') &&
    !className.includes('pagination') &&
    !className.includes('side-picture') &&
    !className.includes('modal-close') &&
    e.srcElement.tagName !== 'path' &&
    e.srcElement.tagName !== 'svg' &&
    dispatch({ type: 'RESET_FOCUSED' });
    try {
      // console.log('className', className);
      current !== '' && e.target.nodeName !== 'INPUT' && className !== 'catalogQtyInput' && document.getElementById(current).focus();
    } catch (e) {}
    current !== '' && e.target.nodeName !== 'INPUT' && dispatch({ type: 'SET_FOCUSED', payload: current});
  } else if (currentContent === 'checkout') {
    className = typeof className === 'string' ? className : '';
    className !== 'catalogQtyInput' &&
    !className.includes('row-cell') &&
    !className.includes('pagination') &&
    !className.includes('side-picture') &&
    !className.includes('modal-close') &&
    e.srcElement.tagName !== 'path' &&
    e.srcElement.tagName !== 'svg' &&
    dispatch({ type: 'RESET_FOCUSED_CHECKOUT' });
    try {
      currentCheckout !== '' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA' && document.getElementById(currentCheckout).focus();
    } catch (e) {}
    currentCheckout !== '' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA' && dispatch({ type: 'SET_FOCUSED_CHECKOUT', payload: currentCheckout});
  }
}
