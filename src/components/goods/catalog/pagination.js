import React from 'react';
import { connect } from 'react-redux';
import * as goodsActions from './../../../actions/goods';
import * as currentActions from './../../../actions/current';
import * as modalActions from './../../../lib/modal/actions/modal';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconFirstPage from 'material-ui/svg-icons/navigation/first-page';
import IconLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import IconForward from 'material-ui/svg-icons/navigation/chevron-right';
import IconFunctions from 'material-ui/svg-icons/content/content-copy';

const Pagination = ({
  qtyPages,
  pageNumber,
  isLastPage,
  //actions
  setModal,
  moveGoodsForward,
  moveGoodsBack,
  goToGoodsPage,
  setFocused
}) => {
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
            setFocused(0);
            goToGoodsPage(1);
          }
        }
      >
        <IconFirstPage />
      </IconButton>
      <IconButton
        tabIndex={-1}
        disabled={pageNumber === 1}
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            setFocused(0);
            moveGoodsBack();
          }
        }
      >
        <IconBack />
      </IconButton>
      <TextField
        className='pagination'
        tabIndex="-1"
        id='page'
        value={pageNumber}
        style={{width: '26px', fontSize: '14px', cursor: 'pointer'}}
        inputStyle={{ textAlign: 'center'}}
        onClick={
          (e) => {
            setModal({
              content: 'page-number-navigation',
              x: e.pageX - 80,
              y: e.pageY - 30,
              style: { background: '#fff'}
            })
          }
        }
        onChange={
          (e) => {
            const page = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 1;
            setFocused(0);
            goToGoodsPage(page);
          }
        }
      ></TextField>
      <IconButton
        tabIndex={-1}
        disabled={isLastPage}
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            setFocused(0);
            moveGoodsForward();
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
            setFocused(0);
            goToGoodsPage(qtyPages);
          }
        }
      >
        <IconLastPage />
      </IconButton>
      <IconFunctions  tabIndex={-1} style={{display: "inline-block", color: "rgba(0, 0, 0, 0.870588)", fill: "black", height: "16px", width: "16px"}} />
      <div style={{fontSize: '14px'}}>{`${qtyPages}`}</div>
    </div>
  );
};

export default connect(
  state => ({qtyPages: state.goods.qtyPages, pageNumber: state.goods.pageNumber, isLastPage: state.goods.isLastPage}),
  { ...goodsActions, ...currentActions, ...modalActions }
)(Pagination);
