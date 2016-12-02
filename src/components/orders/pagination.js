import React from 'react';
import {connect} from 'react-redux';
import * as ordersActions from './../../actions/orders';
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
  moveOrdersForward,
  moveOrdersBack,
  goToOrdersPage
}) => {
  const iconStyle = {width: 24, height: 24};
  const iconButtonStyle = {padding: '5px', width: 32};
  return (
    <div style={{display: 'flex', alignItems: 'center', paddingRight: '20px'}}>
      <IconButton
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            goToOrdersPage(1);
          }
        }
      >
        <IconFirstPage />
      </IconButton>
      <IconButton onClick={moveOrdersBack} disabled={pageNumber === 1} iconStyle={iconStyle} style={iconButtonStyle}><IconBack /></IconButton>
      <TextField
        // type="text"
        id='page'
        value={pageNumber}
        style={{width: '20px', fontSize: '14px'}}
        inputStyle={{ textAlign: 'center'}}
        onChange={
          (e) => {
            const page = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 1;
            goToOrdersPage(page);
          }
        }
      ></TextField>
      <IconButton onClick={moveOrdersForward} disabled={isLastPage} iconStyle={iconStyle} style={iconButtonStyle}><IconForward /></IconButton>
      <IconButton
        iconStyle={iconStyle}
        style={iconButtonStyle}
        onClick={
          () => {
            goToOrdersPage(qtyPages);
          }
        }
      >
        <IconLastPage />
      </IconButton>
      <IconFunctions style={{display: "inline-block", color: "rgba(0, 0, 0, 0.870588)", fill: "black", height: "16px", width: "16px"}} />
      <div style={{fontSize: '14px'}}>{`${qtyPages}`}</div>
    </div>
  );
};

export default connect(
  state => ({qtyPages: state.orders.qtyPages, pageNumber: state.orders.pageNumber, isLastPage: state.orders.isLastPage}),
  ordersActions
)(Pagination);
