import React from 'react';
import { connect } from 'react-redux';
import * as goodsActions from './../../../actions/goods';

const Pagination = ({
  qtyPages,
  pageNumber,
  isLastPage,
  //actions
  moveGoodsForward,
  moveGoodsBack,
  goToGoodsPage
}) => {
  return (
    <div style={{paddingBottom: '10px'}}>
      <button onClick={moveGoodsBack} disabled={pageNumber === 1}>Назад</button>
      <button onClick={moveGoodsForward} disabled={isLastPage}>Вперед</button>
      <input
        type="text"
        value={pageNumber}
        style={{width: '40px'}}
        onChange={
          (e) => {
            const page = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 1
            goToGoodsPage(page);
          }
        }
      ></input>
      <button
        onClick={
          () => {
            goToGoodsPage(1);
          }
        }
      >
        Первая
      </button>
      <button
        onClick={
          () => {
            goToGoodsPage(qtyPages);
          }
        }
      >
        Последняя
      </button>
      <span>{`${pageNumber}/${qtyPages}`}</span>
    </div>
  );
}

export default connect(
  state => ({qtyPages: state.goods.qtyPages, pageNumber: state.goods.pageNumber, isLastPage: state.goods.isLastPage}),
  goodsActions
)(Pagination);
