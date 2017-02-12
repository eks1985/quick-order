import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { setModal } from './../../lib/modal/actions/modal';

const Order = props => {
  const { setModal } = props;
  return (
    <div className='singleOrder' style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <RaisedButton
          label='Закрыть'
          onClick={
            () => {
              setModal();
            }
          }
        />
      </div>
      <div>Content</div>
    </div>
  );
}

export default connect(
  null,
  { setModal }
)(Order);
