import { setQtyPagesGoods, detectIsLastPage } from './goods-navigation';

export const setRowsPerPage = () => {
  return (dispatch, getState) => {
    const state = getState();
    const showPictureSide = state.options.showPictures.side;
    const { bodyHeight, pictureHeight, rowHeight } = state.ui;
    let rowsSpace;
    // console.log('showPictureSide', showPictureSide);
    if (showPictureSide) {
      rowsSpace = bodyHeight - pictureHeight - 270;
    } else {
      rowsSpace = bodyHeight - 270;
    }
    dispatch({
      type: 'SET_GOODS_ROWS_PER_PAGE',
      payload: parseInt(rowsSpace/rowHeight, 10)
    });
    dispatch(setQtyPagesGoods());
    dispatch(detectIsLastPage());
  }
}

export const setUi = bodyHeight => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_UI_ELEMENTS_SIZE',
      payload: { bodyHeight: bodyHeight, pictureHeight: parseInt(bodyHeight/4, 10) }
    });
    dispatch(setRowsPerPage());
  };
};
