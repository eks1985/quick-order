import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/current-content';
import * as modalActions from './../../../../lib/modal/actions/modal';
import FlatButton from 'material-ui/FlatButton'

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
      <FlatButton
        rippleColor='#eee'
        label='Каталог'
        // style={currentContent === 'goods' ? {background: 'yellow'} : {}}
        backgroundColor={currentContent === 'goods' ? '#ddd' : '#eee'}
        onClick={
          () => {
            setCurrentContent('goods');
          }
        }
      >
      </FlatButton>
      <FlatButton
        rippleColor='#eee'
        label='Заказы'
        // style={currentContent === 'orders' ? {background: 'yellow'} : {}}
        backgroundColor={currentContent === 'orders' ? '#ddd' : '#eee'}
        onClick={
          () => {
            setCurrentContent('orders');
          }
        }
      >
      </FlatButton>
      <FlatButton
        rippleColor='#eee'
        label='Быстрый заказ'
        // style={currentContent === 'quick-list' ? {background: 'yellow'} : {}}
        backgroundColor={currentContent === 'quick-list' ? '#ddd' : '#eee'}
        onClick={
          () => {
            setCurrentContent('quick-list');
          }
        }
      >
      </FlatButton>
      <FlatButton
        rippleColor='#eee'
        label='Профиль'
        backgroundColor={currentContent === 'profile' ? '#ddd' : '#eee'}
        onClick={
          () => {
            setCurrentContent('profile');
            setModal({ content: 'profile', fullScreen: true, style: {display: 'initial'} });
          }
        }
      >
      </FlatButton>
      <FlatButton
        rippleColor='#eee'
        label='Помощь'
        backgroundColor={currentContent === 'help' ? '#ddd' : '#eee'}
        onClick={
          () => {
            setCurrentContent('help');
            setModal({ content: 'help', fullScreen: true, style: {display: 'initial'} });
          }
        }
      >
      </FlatButton>
    </div>
  );
};

export default connect(
  state => ({ currentContent: state.currentContent }),
  { ...currentContentActions, ...modalActions }
)(Nav);
