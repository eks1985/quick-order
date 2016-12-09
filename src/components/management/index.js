import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import * as authActions from './../../actions/auth';

const Management = ({
  //actions
  createUser
}) => {
  let name, password;
  return (
    <Paper style={{display: 'flex', flexDirection: 'column', padding: '20px', flex: '1', alignItems: 'flex-start'}}>
      <TextField 
        id='userName'
        placeholder='email пользователя'
        ref={
          node => {
            name = node;
          }
        }
      /> 
      <TextField 
        id='userPwd'
        placeholder='пароль пользователя'
        ref={
          node => {
            password = node;
          }
        }
      /> 
      <RaisedButton 
        label='Создать пользователя'
        onClick={
          () => {
            createUser(name.input.value.trim(), password.input.value.trim())}
          }
      />
    </Paper>
  );
};

export default connect(
  null,
  authActions
)(Management);