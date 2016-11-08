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
      <div>
        {
          authStatus === 'AUTH_ANONYMOUS' &&
          <button
            onClick={
              () => {
                openAuth();
              }
            }
          >Log in</button>
        }
        {
          authStatus === 'AUTH_AWAITING_RESPONSE' &&
          <label>Logging in...</label>
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
            >Log out</button>
            {' '} Logged as: {authUid}
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