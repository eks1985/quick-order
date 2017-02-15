import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actionsOptions from './../../../actions/options';
import * as modalActions from './../../../lib/modal/actions/modal';

import ManageGoodsOnStockQty from './option/manage-goods-on-stock-qty';
import ShowGoodsOnStockQty from './option/show-goods-on-stock-qty';
import ManagePositionIsActiveProp from './option/manage-position-is-active-prop';
import ShowNoActivePositions from './option/show-no-active-positions';
import OrderNoActivePositions from './option/order-no-active-positions';
import PositionIsActiveDefinition from './option/position-is-active-definition';
import ManagePrices from './option/manage-prices';
import ShowPictures from './option/show-pictures';
import CategoryLineSeparator from './option/category-line-separator';
import OrdersRowsSeparator from './option/orders-rows-separator';
import PictureSource from './option/picture-source';
import AllowDraftOrders from './option/allow-draft-orders';
import AllowDeleteOrders from './option/allow-delete-orders';
import PermanentDeleteOrders from './option/permanent-delete-orders';

const OptionsLogic = props => {

  const {
    options,
    items,
    prices,
    //actions
    setOption,
    setModal
  } = props;

  const itemsKeysLength = Object.keys(items).length;

  const rowStyle = {
    display: 'flex',
    padding: '0 10px 0 10px',
  };

  const radioStyles = {
    radioButton: {
      marginBottom: 6,
    },
  };

  const toggleStyles = {
    block: {
      maxWidth: 250,
    },
    toggle: {
      marginBottom: 16,
    },
    thumbOff: {
      backgroundColor: '#ffcccc',
    },
    trackOff: {
      backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
      backgroundColor: 'red',
    },
    trackSwitched: {
      backgroundColor: '#ff9d9d',
    },
    labelStyle: {
      color: 'red',
    },
  };

  const passProps = { options, toggleStyles, radioStyles, setOption };
  const passManagePrices = { items, prices, options, setModal, setOption, radioStyles };

  return (

    <div style={{padding: '30px'}}>

      <div style={rowStyle}>
        {(itemsKeysLength === 0 || true) &&
          <div style={{fontSize: '20px', padding: '20px', backgroundColor: '#eee', borderRadius: '3px', color: '#555'}}>
            <p>
              Внимание, данные не обнаружены, рекомендуется сначала подключить приложение к базе firebase и затем выполнять настройки.
              <br/>
              В этом случае при изменении настроек будет происходить автоматическая валидация данных
            </p>
          </div>
        }
      </div>

      <div style={rowStyle}>
        <ManageGoodsOnStockQty {...passProps} />
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        <ShowGoodsOnStockQty {...passProps} />
      </div>

      <div style={rowStyle}>
        <ManagePositionIsActiveProp {...passProps} />
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        <ShowNoActivePositions {...passProps} />
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        <OrderNoActivePositions {...passProps} />
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        <PositionIsActiveDefinition {...passProps} />
      </div>

      <div style={rowStyle}>
        <ManagePrices {...passManagePrices}/>
      </div>

      <div style={rowStyle}>
        <ShowPictures {...passProps} />
      </div>

      <div style={rowStyle}>
        <CategoryLineSeparator {...passProps} />
      </div>

      <div style={rowStyle}>
        <PictureSource {...passProps} />
      </div>

      <div style={rowStyle}>
        <AllowDraftOrders {...passProps} />
      </div>

      <div style={rowStyle}>
        <AllowDeleteOrders {...passProps} />
      </div>

      <div style={rowStyle}>
        <PermanentDeleteOrders {...passProps} />
      </div>

      <div style={rowStyle}>
        <OrdersRowsSeparator {...passProps} />
      </div>

    </div>

  );
}

OptionsLogic.propTypes = {
  setOption: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
}

export default connect(
  state => ({ options: state.options, items: state.goods.itemsInitial, prices: state.prices }) ,
  { ...actionsOptions, ...modalActions }
)(OptionsLogic);


// управлять остатками

  // нет *

  // да

// показывать остатки в каталоге (если управлять остатками  = да)

  // нет *

  // да


// управлять активностью позиций

  // нет *

  // да

// способ определения активности позиций (если управлять активностью позиций = да)

  // непосредственно из данных о номенклатураной позиции - active = [да, нет]

  // остаток > 0 (если управлять остатками = да)

// показ неактивных позиций (если управлять активностью позиций = да)

  // скрывать *

  // показывать и веделять

// заказ неактивных позиций (если управлять активностью позиций И показ неактивных позиций = показывать и выделять)

  // запрещено *

  // разрешено
