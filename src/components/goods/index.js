import React from 'react';
import { connect } from 'react-redux';
import Catalog from './catalog';
import Cart from './cart';
import GoodsGroups from './goods-groups';
import Paper from 'material-ui/Paper';
import img1 from './../../image.jpg';
import * as modalActions from './../../lib/modal/actions/modal';

const Goods = props => {
  const { setModal, dispatch, options } = props;
  const style = {
    display: 'flex',
    flex: '1 0 auto',
  };
  const catalogStyle = {
    display: 'flex',
    flex: '1 0 75%',
  };
  const cartCategoriesStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 25%',
  };
  return (
    <div className='goods' style={style}>
      <div style={catalogStyle}>
        <Catalog />
      </div>
      <div style={cartCategoriesStyle}>
        <Paper rounded={false} zDepth={2}>
          <Cart />
        </Paper>
        {options.showPictures.side  &&
          <Paper
            rounded={false}
            zDepth={2}
            className='side-picture'
            style={{
              height: '200px',
              backgroundImage: `url(${img1})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer'
            }}
            onClick={
              () => {
                dispatch({
                  type: 'SET_PREVENT_CLEAN_GOODS_ROW',
                  payload: true
                }) ;
                dispatch(setModal({ content: 'goodsCard', fullScreen: true, showClose: true, style: { background: '#fff' } }));
              }
            }
          >
          </Paper>
        }
        <GoodsGroups />
      </div>
    </div>
  );
};

export default connect(
  state => ({ options: state.options }),
  dispatch => ({ ...modalActions, dispatch })
)(Goods);
