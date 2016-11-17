import React from 'react';
import { connect } from 'react-redux';
import * as goodsActions from './../../../actions/goods';

let Search = ({
  search,
}) => {
  let input;
  return (
    <div style={{display: 'flex'}}>
      <input
        type="text"
        ref={(node) => {
          input = node;
        }}
      >
      </input>
      <button onClick={
        () => {
          search(input.value);
        }
      }>
        Найти
      </button>
      <button onClick={
        () => {
          search('');
        }
      }>
        Очистить
      </button>
    </div>
  );
};

export default connect(
  null,
  goodsActions
)(Search);
