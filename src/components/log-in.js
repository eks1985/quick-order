import React from 'react';
import { connect } from 'react-redux';
import * as modalActions from './../lib/modal/actions/modal';
import * as authActions from './../actions/auth';

const Login = ({
  auth,
  //actions
  setModal,
  openAuth,
  openAuthAnonimously
}) => {
  let inputEmail;
  let inputPwd;
  return (
    <div style={{display: 'flex', padding: '30px', border: '1px solid #bbb'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex'}}>
          <div style={{marginRight: '5px'}}>
            <div style={{height: '30px'}}>Имя</div>
            <div style={{height: '30px'}}>Пароль</div>
          </div>
          <div>
            <div style={{height: '30px'}}>
              <input
                type='text'
                defaultValue='alfa1@alfa.com'
                ref={(node) => {
                  inputEmail = node;
                }}
              />
            </div>
            <div style={{height: '30px'}}>
              <input
                type='password'
                defaultValue='123456'
                ref={(node) => {
                  inputPwd = node;
                }}
              />
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button
            onClick={
              ()=>{
                openAuth({ email: inputEmail.value, password: inputPwd.value });
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
                openAuthAnonimously();
              }
            }
          >
            Войти анонимно
          </button>
        </div>
        <p style={{height: '16px', fontSize: '14px', color: 'red'}}>
          {auth.error && auth.error}
        </p>
      </div>
    </div>
  );
};

export default connect(
  state => ({ auth: state.auth }),
  { ...modalActions, ...authActions }
)(Login);
