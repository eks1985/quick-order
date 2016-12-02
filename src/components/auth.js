import React from 'react';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import RaisedButton from 'material-ui/RaisedButton';

let Auth = ({
  authStatus,
  authUid,
  authEmail,
  //actions
  openAuth,
  logoutUser
}) => {

  const getAuthJsx = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        {
          authStatus === 'AUTH_ANONYMOUS' &&
          <RaisedButton
            label='Войти'
            onClick={
              () => {
                openAuth();
              }
            }
          ></RaisedButton>
        }
        {
          authStatus === 'AUTH_AWAITING_RESPONSE' &&
          <label>Подключение...</label>
        }
        {
          authStatus === 'AUTH_LOGGED_IN' &&
          <span>
            <span style={{marginRight: '8px'}}>{authEmail}</span>
            <RaisedButton
              onClick={
                () => {
                  logoutUser();
                }
              }
            >Выйти</RaisedButton>
            
          </span>

        }
      </div>
    );
  };

  return (
    <div>
      {getAuthJsx()}
    </div>
  );

};

export default connect(
  state => ({ authStatus: state.auth.status, authUid: state.auth.uid, authEmail: state.auth.email }),
  { ...authActions }
)(Auth);
