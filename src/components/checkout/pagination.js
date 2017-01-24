import React from 'react';
import { connect } from 'react-redux';
import * as goodsActions from './.././../actions/goods';
import * as currentActions from './.././../actions/current-checkout';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconFirstPage from 'material-ui/svg-icons/navigation/first-page';
import IconLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import IconForward from 'material-ui/svg-icons/navigation/chevron-right';
import IconFunctions from 'material-ui/svg-icons/content/content-copy';

const Pagination = props => {
  const {
    qtyPagesCheckout,
    pageNumberCheckout,
    isLastPageCheckout,
    //actions
    moveGoodsForwardCheckout,
    moveGoodsBackCheckout,
    goToGoodsPageCheckout,
    setFocusedCheckout
  } = props;
  const iconStyle = {width: 24, height: 24};
  const iconButtonStyle = {padding: '3px', width: '32px', height: '32px'};
  return (
    <div style={{display: 'flex', alignItems: 'center', paddingRight: '20px'}} tabIndex="-1">
      <IconButton
        className='pagination'
        tabIndex={-1}
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            setFocusedCheckout(0);
            goToGoodsPageCheckout(1);
          }
        }
      >
        <IconFirstPage />
      </IconButton>
      <IconButton
        tabIndex={-1}
        disabled={pageNumberCheckout === 1}
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            setFocusedCheckout(0);
            moveGoodsBackCheckout();
          }
        }
      >
        <IconBack />
      </IconButton>
      <TextField
        className='pagination'
        tabIndex="-1"
        id='page'
        value={pageNumberCheckout}
        style={{width: '26px', fontSize: '14px'}}
        inputStyle={{ textAlign: 'center'}}
        onChange={
          (e) => {
            const page = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 1;
            setFocusedCheckout(0);
            goToGoodsPageCheckout(page);
          }
        }
      ></TextField>
      <IconButton
        tabIndex={-1}
        disabled={isLastPageCheckout}
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            setFocusedCheckout(0);
            moveGoodsForwardCheckout();
          }
        }
      >
        <IconForward />
      </IconButton>
      <IconButton
        className='pagination'
        tabIndex={-1}
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            setFocusedCheckout(0);
            goToGoodsPageCheckout(qtyPagesCheckout);
          }
        }
      >
        <IconLastPage />
      </IconButton>
      <IconFunctions  tabIndex={-1} style={{display: "inline-block", color: "rgba(0, 0, 0, 0.870588)", fill: "black", height: "16px", width: "16px"}} />
      <div style={{fontSize: '14px'}}>{`${qtyPagesCheckout}`}</div>
    </div>
  );
};

export default connect(
  state => {
    const { qtyPagesCheckout, pageNumberCheckout, isLastPageCheckout } = state.goods;
    return { qtyPagesCheckout, pageNumberCheckout, isLastPageCheckout };
  },
  { ...goodsActions, ...currentActions }
)(Pagination);
