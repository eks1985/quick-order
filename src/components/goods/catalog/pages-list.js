import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { setModal } from './../../../lib/modal/actions/modal';
import { goToGoodsPage } from './../../../actions/goods-navigation';

const PagesList = props => {
  const { qtyPages, pageNumber, setModal, goToGoodsPage } = props;

  const prepareCurrentPageStyle = (style, pageIndex) => {
    return pageIndex === pageNumber ? { ...style, color: 'blue', fontWeight: 'bold', border: '2px solid #ccc' } : style;
  }

  const style = {
    display: 'flex',
    flex: '0 0 5%',
    height: '40px',
    justifyContent: 'center',
    cursor: 'pointer',
    alignItems: 'center',
    fontSize: '20px'
  }

  const generatePagesListJsx = qtyPages => {
    const res = [];
    for (let i = 1; i <= qtyPages; i++) {
      const elem = <div
        key={i}
        style={prepareCurrentPageStyle( style, i)}
        onClick={
          () => {
            setModal();
            goToGoodsPage(parseInt(i, 10));
          }
        }
      >{i}</div>
      res.push(elem)
    };
    return res;
  }

  return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <RaisedButton
            onClick={
              () => {
                setModal();
              }
            }
            label='Отмена'
          />
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {generatePagesListJsx(qtyPages)}
        </div>
      </div>
  );
}

export default connect(
  state => ({ qtyPages: state.goods.qtyPages, pageNumber: state.goods.pageNumber }),
  { setModal, goToGoodsPage }
)(PagesList);
