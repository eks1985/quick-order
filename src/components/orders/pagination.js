import React from 'react';
import {connect} from 'react-redux';
import * as ordersActions from './../../actions/orders';

const Pagination = ({
  qtyPages,
  pageNumber,
  isLastPage,
  //actions
  moveordersForward,
  moveordersBack,
  goToordersPage
}) => {
  return (
    <div>
      <button onClick={moveordersBack} disabled={pageNumber === 1}>Назад</button>
      <button onClick={moveordersForward} disabled={isLastPage}>Вперед</button>
      <input
        type="text"
        value={pageNumber}
        style={{width: '40px'}}
        onChange={
          (e) => {
            const page = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 1
            goToordersPage(page);
          }
        }
      ></input>
      <button
        onClick={
          () => {
            goToordersPage(1);
          }
        }
      >
        Первая
      </button>
      <button
        onClick={
          () => {
            goToordersPage(qtyPages);
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
  state => ({qtyPages: state.orders.qtyPages, pageNumber: state.orders.pageNumber, isLastPage: state.orders.isLastPage}),
  ordersActions
)(Pagination);
