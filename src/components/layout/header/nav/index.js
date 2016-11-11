import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/currentContent';
import * as modalActions from './../../../../lib/modal/actions/modal';
const Nav = ({
  //actions
  setCurrentContent,
  setModal
}) => {
  const style = {
    display: 'flex'
  }
  return (
    <div className='headerNav' style={style}>
      <button
        onClick={
          () => {
            setCurrentContent('goods');
          }
        }
      >
        Каталог
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('orders');
          }
        }
      >
        Заказы
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('checkout');
          }
        }
      >
        Оформить
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('profile');
            setModal({ content: 'profile', fullScreen: true});
          }
        }
      >
        Профиль
      </button>
      <button
        onClick={
          () => {
            setCurrentContent('help');
            setModal({ content: 'help', fullScreen: true});
          }
        }
      >
        Помощь
      </button>
    </div>
  );
};

export default connect(
  null,
  { ...currentContentActions, ...modalActions }
)(Nav);
