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
  state => ({qtyPages: state.goods.qtyPages, pageNumber: state.goods.pageNumber, isLastPage: state.goods.isLastPage})
)(Pagination);
