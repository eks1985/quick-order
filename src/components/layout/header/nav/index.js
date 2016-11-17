import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/current-content';
import * as modalActions from './../../../../lib/modal/actions/modal';
const Nav = ({
  currentContent,
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
        style={currentContent === 'goods' ? {background: 'yellow'} : {}}
        onClick={
          () => {
            setCurrentContent('goods');
          }
        }
      >
        Каталог
      </button>
      <button
        style={currentContent === 'orders' ? {background: 'yellow'} : {}}
        onClick={
          () => {
            setCurrentContent('orders');
          }
        }
      >
        Заказы
      </button>
      <button
        style={currentContent === 'quick-list' ? {background: 'yellow'} : {}}
        onClick={
          () => {
            setCurrentContent('quick-list');
          }
        }
      >
        Быстрый заказ
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
  state => ({ currentContent: state.currentContent }),
  { ...currentContentActions, ...modalActions }
)(Nav);
