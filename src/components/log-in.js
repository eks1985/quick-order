import React from 'react';
import { connect } from 'react-redux';
import * as modalActions from './../lib/modal/actions/modal';

const Login = ({
  //actions
  setModal
}) => {
  return (
    <div style={{display: 'flex', padding: '30px', border: '1px solid #bbb'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex'}}>
          <div style={{marginRight: '5px'}}>
            <div style={{height: '30px'}}>Имя</div>
            <div style={{height: '30px'}}>Пароль</div>
          </div>
          <div>
            <div style={{height: '30px'}}><input type='text' /></div>
            <div style={{height: '30px'}}><input type='password' /></div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button
            onClick={
              () => {
                setModal({ content: ''});
              }
            }
          >
            Войти
          </button>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          или
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button
            onClick={
              () => {
                setModal({ content: ''});
              }
            }
          >
            Анонимный вход
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(
  null,
  modalActions
)(Login);
