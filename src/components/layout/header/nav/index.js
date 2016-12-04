import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/current-content';
import * as modalActions from './../../../../lib/modal/actions/modal';
import FlatButton from 'material-ui/FlatButton';
import Auth from './../../../auth';

const Nav = ({
  auth,
  currentContent,
  //actions
  setCurrentContent,
  setModal
}) => {
  const style = {
    display: 'flex'
  };
  return (
    <div className='headerNav' style={style}>
      <div style={{display: 'flex', flex: '1 0 50%'}}>
        <FlatButton
          rippleColor='#eee'
          label='Каталог'
          backgroundColor={currentContent === 'goods' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'goods' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'goods' ? {color: 'white'} : {color: 'black'}}
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
          backgroundColor={currentContent === 'orders' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'orders' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'orders' ? {color: 'white'} : {color: 'black'}}
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
          backgroundColor={currentContent === 'quick-list' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'quick-list' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'quick-list' ? {color: 'white'} : {color: 'black'}}
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
          backgroundColor={currentContent === 'profile' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'profile' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'profile' ? {color: 'white'} : {color: 'black'}}
          onClick={
            () => {
              setCurrentContent('profile');
              setModal({ content: 'profile', fullScreen: true });
            }
          }
        >
        </FlatButton>
        <FlatButton
          rippleColor='#eee'
          label='Помощь'
          backgroundColor={currentContent === 'help' ? '#aaa' : '#eee'}
          hoverColor={currentContent === 'help' ? '#aaa' : '#eee'}
          labelStyle={currentContent === 'help' ? {color: 'white'} : {color: 'black'}}
          onClick={
            () => {
              setCurrentContent('help');
              setModal({ content: 'help', fullScreen: true });
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
            labelStyle={currentContent === 'settings' ? {color: 'white'} : {color: 'black'}}
            onClick={
              () => {
                setCurrentContent('settings');
              }
            }
          >
          </FlatButton>
        }
      </div>
      <div style={{display: 'flex', flex: '0 1 50%', justifyContent: 'flex-end'}}>
        <Auth />
      </div>
    </div>
  );
};

export default connect(
  state => ({ currentContent: state.currentContent, auth:  state.auth }),
  { ...currentContentActions, ...modalActions }
)(Nav);
