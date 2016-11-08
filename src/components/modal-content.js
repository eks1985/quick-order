import React from 'react';
import { connect } from 'react-redux';
import Help from './help';
import Profile from './profile';
const ModalContent = ({
  modal
}) => {
  return (
    <div>
      {modal.content === 'profile' && <Profile />}
      {modal.content === 'help' && <Help />}
    </div>
  );
};

export default connect(
  state => ({ modal: state.modal})
)(ModalContent);
