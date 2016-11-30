import React from 'react';
import { connect } from 'react-redux';
import * as currentContentActions from './../../../../actions/current-content';
import * as modalActions from './../../../../lib/modal/actions/modal';
import FlatButton from 'material-ui/FlatButton';
import Auth from './../../../auth';

const Nav = ({
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
          hoverColor="transparent"
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
          hoverColor="transparent"
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
          hoverColor="transparent"
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
          hoverColor="transparent"
          labelStyle={currentContent === 'profile' ? {color: 'white'} : {color: 'black'}}
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
          backgroundColor={currentContent === 'help' ? '#aaa' : '#eee'}
          hoverColor="transparent"
          labelStyle={currentContent === 'help' ? {color: 'white'} : {color: 'black'}}
          onClick={
            () => {
              setCurrentContent('help');
              setModal({ content: 'help', fullScreen: true, style: {display: 'initial'} });
            }
          }
        >
        </FlatButton>
      </div>
      <div style={{display: 'flex', flex: '0 1 50%', justifyContent: 'flex-end'}}>
        <Auth />
      </div>
    </div>
  );
};

export default connect(
  state => ({ currentContent: state.currentContent }),
  { ...currentContentActions, ...modalActions }
)(Nav);
