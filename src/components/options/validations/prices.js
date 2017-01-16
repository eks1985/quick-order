import React from 'react';
import { connect } from 'react-redux';

const PricesValidation = props => {

  // const { modal, prices } = props;

  return (
    <div>
      <div>
        {'prices: //узел в общем дереве'}
      </div>
      <div style={{paddingLeft: '20px'}}>
        {'  guid: //строка'}
      </div>
    </div>
  );
}

export default connect(
  state => {
    const { modal, prices } = state;
    return { modal, prices}
  }
)(PricesValidation);
