import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/current-content';
import * as modalActions from './../../../../lib/modal/actions/modal';
import FlatButton from 'material-ui/FlatButton';
import Auth from './../../../auth';

const Nav = ({
  auth,
  currentContent,
  cartTotalItems,
  //actions
  setCurrentContent,
  setModal
}) => {
  const style = {
    display: 'flex',
    justifyContent: 'space-between'
  };
  return (
    <div className='headerNav' style={style}>
      <div style={{display: 'flex'}}>
        <FlatButton
          rippleColor='#eee'
          label='Каталог'
          backgroundColor={currentContent === 'goods' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'goods' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'goods' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
          onClick={
            () => {
              setModal();
              setCurrentContent('goods');
            }
          }
        >
        </FlatButton>
        {cartTotalItems > 0 &&
          <FlatButton
            rippleColor='#eee'
            label='Корзина'
            backgroundColor={currentContent === 'checkout' ? '#aaa' : '#eee'}
            hoverColor={currentContent === 'checkout' ? '#aaa' : '#eee'}
            labelStyle={currentContent === 'checkout' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
            onClick={
              () => {
                setModal();
                setCurrentContent('checkout');
              }
            }
          >
          </FlatButton>
        }
        <FlatButton
          rippleColor='#eee'
          label='Заказы'
          backgroundColor={currentContent === 'orders' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'orders' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'orders' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
          onClick={
            () => {
              setModal();
              setCurrentContent('orders');
            }
          }
        >
        </FlatButton>
        <FlatButton
          rippleColor='#eee'
          label='Быстрый заказ'
          backgroundColor={currentContent === 'quick-list' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'quick-list' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'quick-list' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
          onClick={
            () => {
              setModal();
              setCurrentContent('quick-list');
            }
          }
        >
        </FlatButton>
        <FlatButton
          rippleColor='#eee'
          label='Профиль'
          backgroundColor={currentContent === 'profile' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'profile' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'profile' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
          onClick={
            () => {
              setModal();
              setCurrentContent('profile');
              setModal({ content: 'profile', fullScreen: true, showClose: true });
            }
          }
        >
        </FlatButton>
        <FlatButton
          rippleColor='#eee'
          label='Помощь'
          backgroundColor={currentContent === 'help' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'help' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'help' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
          onClick={
            () => {
              setModal();
              setCurrentContent('help');
              setModal({ content: 'help', fullScreen: true, showClose: true });
            }
          }
        >
        </FlatButton>
        <FlatButton
          rippleColor='#eee'
          label='Управление'
          backgroundColor={currentContent === 'management' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'management' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'management' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
          onClick={
            () => {
              setModal();
              setCurrentContent('management');
            }
          }
        >
        </FlatButton>
        {auth.email === 'alfa1@alfa.com' &&
          <FlatButton
            rippleColor='#eee'
            label='Настройки'
            backgroundColor={currentContent === 'settings' ? '#aaa' : '#eee'}
            hoverColor={currentContent === 'settings' ? '#aaa' : '#eee'}
            labelStyle={currentContent === 'settings' ? {color: 'white', fontWeight: 'normal'} : {color: 'black', fontWeight: 'normal'}}
            onClick={
              () => {
                setModal();
                setCurrentContent('settings');
              }
            }
          >
          </FlatButton>
        }
      </div>
      <div style={{display: 'flex', flex: '0 1 auto', justifyContent: 'flex-end'}}>
        <Auth />
      </div>
    </div>
  );
};

export default connect(
  state => ({ currentContent: state.ui.currentContent, auth:  state.auth, cartTotalItems: state.cart.totalItems }),
  { ...currentContentActions, ...modalActions }
)(Nav);
