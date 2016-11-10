import React from 'react';
import { connect } from 'react-redux';

const Pagination = ({
  qtyPages,
  pageNumber,
  isLastPage
}) => {
  return (
    <div>
      <button>Назад</button>
      <button>Вперед</button>
      <input type="text"></input>
      <button>Обнулить</button>
    </div>
  );
}

export default connect(
  state => ({qtyPages: state.orders.qtyPages, pageNumber: state.orders.pageNumber, isLastPage: state.orders.isLastPage})
)(Pagination);
