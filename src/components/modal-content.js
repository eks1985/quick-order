import React from 'react';
import { connect } from 'react-redux';
import Help from './help';
import Profile from './profile';
import GoodsCard from './goods/card';
import Login from './log-in';
import ColumnSettings from './column-settings';
import FirebaseConfig from './firebase-config';

const ModalContent = ({
  modal
}) => {
  return (
    <div>
      {modal.content === 'profile' && <Profile />}
      {modal.content === 'help' && <Help />}
      {modal.content === 'goodsCard' && <GoodsCard />}
      {modal.content === 'login' && <Login />}
      {modal.content === 'firebase-config' && <FirebaseConfig />}
      {modal.content === 'column-settings' && <ColumnSettings />}
    </div>
  );
};

export default connect(
  state => ({ modal: state.modal})
)(ModalContent);
