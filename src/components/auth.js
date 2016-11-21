import React from 'react';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';

let Auth = ({
  authStatus,
  authUid,
  //actions
  openAuth,
  logoutUser
}) => {

  const getAuthJsx = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        {
          authStatus === 'AUTH_ANONYMOUS' &&
          <button
            onClick={
              () => {
                openAuth();
              }
            }
          >Войти</button>
        }
        {
          authStatus === 'AUTH_AWAITING_RESPONSE' &&
          <label>Подключение...</label>
        }
        {
          authStatus === 'AUTH_LOGGED_IN' &&
          <span>
            <button
              onClick={
                () => {
                  logoutUser();
                }
              }
            >Выйти</button>
            {' '} Пользователь: {authUid}
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
  state => ({authStatus: state.auth.status, authUid: state.auth.uid}),
  { ...authActions }
)(Auth);
