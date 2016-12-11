import React from 'react';
import { connect } from 'react-redux';
import * as modalActions from './../lib/modal/actions/modal';
import * as authActions from './../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const Login = ({
  auth,
  //actions
  createUser,
  openAuth
}) => {
  let inputEmail;
  let inputPwd;
  const { firstAccess, usersCheckComplete } = auth;
  
  const getUserNameJsx = () => {
    return (
      <TextField
        style={{minWidth: '100%', marginBottom: '6px'}}
        inputStyle={{paddingLeft: '6px'}}
        placeholder='Email'
        id='loginName'
        ref={(node) => {
          inputEmail = node;
        }}
      />
    );
  };
  
  const getPasswordJsx = () => {
    return (
      <TextField
        style={{minWidth: '100%'}}
        inputStyle={{paddingLeft: '6px'}}
        type='password'
        placeholder='Пароль'
        id='loginPassword'
        ref={(node) => {
          inputPwd = node;
        }}
      />
    );
  };
  
  const getErrorMsgJsx = () => {
    return (
      <p style={{height: '16px', fontSize: '14px', color: 'red'}}>
        {auth.error && auth.error}
      </p>
    );
  };
  
  const getLoginButtonJsx = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <RaisedButton
          style={{marginTop: '10px', minWidth: '120px', border: '1px solid #ddd'}}
          backgroundColor='#eee'
          onClick={
            ()=>{
              openAuth({ email: inputEmail.input.value.trim(), password: inputPwd.input.value.trim() });
            }
          }
        >
          Войти
        </RaisedButton>
      </div>  
    );
  };
  
  const getFirstAccessTitle = () => {
    return (
      <div>
        <p>
          Приложение не содержит пользователей
        </p>
        <p>
          Необходимо создать администратора
        </p>
        <p>
          Администратор может создавать новых пользователей
        </p>
      </div>
    );
  };
  
  const getCreateUserButtonJsx = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <RaisedButton
          style={{marginTop: '10px', minWidth: '120px', border: '1px solid #ddd'}}
          backgroundColor='#eee'
          onClick={
            ()=>{
              createUser(inputEmail.input.value.trim(), inputPwd.input.value.trim(), true);
            }
          }
        >
          Создать
        </RaisedButton>
      </div>  
    );
  };
  
   const style = {
    container: {
      position: 'relative',
      marginLeft: '16px'
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
  };
  
  const getLoadingIndicatorJsx = () => (
    <div style={style.container}>
      <RefreshIndicator
        size={40}
        left={0}
        top={0}
        status="loading"
        style={style.refresh}
      />
    </div>
  );
  
  const getLoadingScreenJsx = () => {
    return (
      <div style={{display: 'flex', alignItems: 'center', padding: '10px'}}>
        <div>Загрузка приложения</div>
        {getLoadingIndicatorJsx()}
      </div>
    );
  };
  
  return (
    <Paper style={{display: 'flex', padding: '50px', flexDirection: 'column'}} zDepth={4}>
        {usersCheckComplete && firstAccess && getFirstAccessTitle()}
        {usersCheckComplete && getUserNameJsx()}
        {usersCheckComplete && getPasswordJsx()}
        {usersCheckComplete && !firstAccess && getLoginButtonJsx()}
        {usersCheckComplete && firstAccess && getCreateUserButtonJsx()}
        {usersCheckComplete && getErrorMsgJsx()}
        {!usersCheckComplete && getLoadingScreenJsx()}
    </Paper>
  );
};

export default connect(
  state => ({ auth: state.auth }),
  { ...modalActions, ...authActions }
)(Login);
