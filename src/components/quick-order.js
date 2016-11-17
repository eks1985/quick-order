import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../actions/cart';

const QuickOrder = ({
  parseQuickOrder
}) => {
  let textArea;
  return (
    <div>
      <div>
      <p>
        Скопируте данные для заказа из буфера и вставьте в поле
      </p>
      <p>
        Вначале строки должен быть артикул, а в конце количество
      </p>
      </div>
      <div>
        <textarea
        style={{width: '600px', height: '200px'}}
        ref={
          (node) => {
            textArea = node;
          }
        }
        >
        </textarea>
      </div>
      <div>
        <button
        onClick={
          () => {
            parseQuickOrder(textArea.value)
          }
        }
        >Обработать</button>
      </div>
    </div>
  );
};

export default connect(
  state => ({quckList: state.quickList}),
  cartActions
)(QuickOrder);
