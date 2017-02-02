import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';
import { setModal } from './../lib/modal/actions/modal';
import { goToGoodsPage } from './../actions/goods-navigation';

const PageNumberNavigation = props => {
  const { dispatch, pageNumber } = props;
  let input;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TextField
        defaultValue={pageNumber}
        id='pageNumderCatalog'
        style={{width: '40px'}}
        inputStyle={{textAlign: 'center'}}
        ref={
          node => {
            input = node;
          }
        }
      />
      <RaisedButton
        style={{marginLeft: '5px'}}
        label='Перейти'
        onClick={
          () => {
            const page = parseInt(input.input.value, 10) ? parseInt(input.input.value, 10) : 1;
            dispatch(goToGoodsPage(page));
            dispatch(setModal());
          }
        }
      >
      </RaisedButton>
    </div>
  );
}

export default connect(
  state => {
    return { pageNumber: state.goods.pageNumber }
  }
)(PageNumberNavigation);
