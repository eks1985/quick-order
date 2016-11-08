import React from 'react';
import * as modalActions from '../actions/modal';
import { connect } from 'react-redux';

let Modal = ({
  children,
  modal,
  //actions
  setModal
}) => {
  const { x, y, fullScreen, content } = modal;
  const style = {
    position: "absolute",
    left: x,
    top: y,
    background: "#ddd",
    border: "1px solid #bbb",
    padding: "10px",
    zIndex: 1000
  };
  if (fullScreen) {
    style.left   = "0px";
    style.right  = "0px";
    style.top    = "0px";
    style.bottom = "0px";
  }

  if (!content) {
    return null;  
  }

  return (
    <div style={style}>
      <div>
        {children}
      </div>
      <button
        onClick={
          () => {
            setModal({dataSource: ''});
          }
        }
      >сlose</button>
    </div>
  );
};

export default connect(
  state => ({modal: state.modal}),
  modalActions
)(Modal);
