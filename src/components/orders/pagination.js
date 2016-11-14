import React from 'react';
import {connect} from 'react-redux';
import * as ordersActions from './../../actions/orders';

const Pagination = ({
  qtyPages,
  pageNumber,
  isLastPage,
  //actions
  moveOrdersForward,
  moveOrdersBack,
  goToOrdersPage
}) => {
  return (
    <div style={{paddingBottom: '10px'}}>
      <button onClick={moveOrdersBack} disabled={pageNumber === 1}>Назад</button>
      <button onClick={moveOrdersForward} disabled={isLastPage}>Вперед</button>
      <input
        type="text"
        value={pageNumber}
        style={{width: '40px'}}
        onChange={
          (e) => {
            const page = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 1
            goToOrdersPage(page);
          }
        }
      ></input>
      <button
        onClick={
          () => {
            goToOrdersPage(1);
          }
        }
      >
        Первая
      </button>
      <button
        onClick={
          () => {
            goToOrdersPage(qtyPages);
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
