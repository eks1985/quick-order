import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actionsOptions from './../../../actions/options';
import * as modalActions from './../../../lib/modal/actions/modal';

import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import IconOk from 'material-ui/svg-icons/action/done';
import IconError from 'material-ui/svg-icons/alert/error-outline';

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

  const dataValidation = itemsKeysLength > 0;

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

  const manageGoodsOnStockQty = () => {
    let manageGoodsOnStockQty;
    return (
      <div style={{flex: '1'}}>
        <Subheader>
          Складские остатки
        </Subheader>
        <Toggle
          defaultToggled={options.manageGoodsOnStockQty}
          label="Учитывать складские остатки"
          labelPosition="right"
          style={toggleStyles.toggle}
          ref={
            (node) => {
              manageGoodsOnStockQty = node;
            }
          }
          onToggle={
            () => {
              setOption("manageGoodsOnStockQty", !manageGoodsOnStockQty.state.switched);
            }
          }
        />
      </div>
    );
  };

  const showGoodsOnStockQty = () => {
    let showGoodsOnStockQty;
    return (
      <div style={{flex: '1'}}>
        <Toggle
          disabled={!options.manageGoodsOnStockQty}
          defaultToggled={options.showGoodsOnStockQty}
          label="Показывать остатки в каталоге"
          labelPosition="right"
          style={toggleStyles.toggle}
          ref={
            (node) => {
              showGoodsOnStockQty = node;
            }
          }
          onToggle={
            () => {
              setOption("showGoodsOnStockQty", !showGoodsOnStockQty.state.switched);
            }
          }
        />
      </div>
    );
  };

  const managePositionIsActiveProp = () => {
    let managePositionIsActiveProp;
    return (
      <div style={{flex: '1'}}>
        <Subheader>
          Управление активностью позиций
        </Subheader>
        <Toggle
          defaultToggled={options.managePositionIsActiveProp}
          label="Разделять номенклатурные позиции на активные и нет"
          labelPosition="right"
          style={toggleStyles.toggle}
          ref={
            (node) => {
              managePositionIsActiveProp = node;
            }
          }
          onToggle={
            () => {
              setOption("managePositionIsActiveProp", !managePositionIsActiveProp.state.switched);
            }
          }
        />
      </div>
    );
  };

  const showNoActivePosition = () => {
    let showNoActivePosition;
    return (
      <div style={{flex: '1'}}>
        <Toggle
          disabled={!options.managePositionIsActiveProp}
          defaultToggled={options.showNoActivePosition}
          label="Показывать Не активные позиции"
          labelPosition="right"
          style={toggleStyles.toggle}
          ref={
            (node) => {
              showNoActivePosition = node;
            }
          }
          onToggle={
            () => {
              setOption("showNoActivePosition", !showNoActivePosition.state.switched);
            }
          }
        />
      </div>
    );
  };

  const orderNoActivePositions = () => {
    let orderNoActivePositions;
    return (
      <div style={{flex: '1'}}>
        <Toggle
          disabled={!options.managePositionIsActiveProp}
          defaultToggled={options.orderNoActivePositions}
          label="Разрешать заказывать Не активные позиции"
          labelPosition="right"
          style={toggleStyles.toggle}
          ref={
            (node) => {
              orderNoActivePositions = node;
            }
          }
          onToggle={
            () => {
              setOption("orderNoActivePositions", !orderNoActivePositions.state.switched);
            }
          }
        />
      </div>
    );
  };

  const positionIsActiveDefinition = () => {
    return (
      <div style={{flex: '1', marginBottom: '20px'}}>
        <Subheader>
          Определение активных/не активных позиций
        </Subheader>
        <RadioButtonGroup
          name="positionIsActiveDefinition"
          defaultSelected={options.positionIsActiveDefinition}
          valueSelected={options.positionIsActiveDefinition}
          selected={options.positionIsActiveDefinition}
          onChange={
            (e, value)=>{
              setOption("positionIsActiveDefinition", value);
            }
          }
        >
          <RadioButton
            disabled={!options.managePositionIsActiveProp}
            value='positionData'
            label='Непосредственно из данных от 1с'
            style={radioStyles.radioButton}
          />
          <RadioButton
            disabled={!options.manageGoodsOnStockQty || !options.managePositionIsActiveProp}
            value='stock'
            label={<span><span>Позиция активна если остаток на складе > 0 </span><span style={{color: 'goldenrod', marginLeft: '3px'}}>(опция доступна при Учитывать складские остатки = Да)</span></span>}
            style={radioStyles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  };

  const showPictures = () => {
    return (
      <div style={{flex: '1', marginBottom: '20px'}}>
        <Subheader>
          Отображать картинки
        </Subheader>
        <RadioButtonGroup
          name="showPictures"
          valueSelected={options.showPictures}
          onChange={
            (e, value)=>{
              setOption("showPictures", value);
            }
          }
        >
          <RadioButton
            value='no'
            label='Нет'
            style={radioStyles.radioButton}
          />
          <RadioButton
            value='row'
            label='В строке'
            style={radioStyles.radioButton}
          />
          <RadioButton
            value='side'
            label='На боковой панели'
            style={radioStyles.radioButton}
          />
          <RadioButton
            value='dialog'
            label='В окне'
            style={radioStyles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }

  const managePrices = () => {

    let priceKeys = Object.keys(prices);
    let priceObj = priceKeys.length > 0 ? prices[priceKeys[0]] : undefined;
    console.log('priceObj', priceObj);
    const Validation = () => {
      switch (options.managePrices) {
        case 'dontUse':
          return (
            <IconButton
              iconStyle={{fill: 'green'}}
            >
              <IconOk />
            </IconButton>
          );
        case 'common':
          if (typeof priceObj === 'number') {
            return (
              <IconButton
                iconStyle={{fill: 'green'}}
                onClick={
                  () => {
                    setModal({ content: 'prices-validation', center: true, showClose: true, x: '50%', y: '50%', style: {flexDirection: 'column'} });
                  }
                }
              >
                <IconError />
              </IconButton>
            );
          } else {
            return (
              <IconButton
                iconStyle={{fill: 'red'}}
              >
                <IconError />
              </IconButton>
            );
          }
        case 'byCustomers':
            if (priceObj === undefined) {
              return (
                <IconButton
                  iconStyle={{fill: 'red'}}
                >
                  <IconError />
                </IconButton>
              );
            } else {

              if (typeof priceObj !== 'object') {
                return (
                  <IconButton
                    iconStyle={{fill: 'red'}}
                  >
                    <IconError />
                  </IconButton>
                );
              } else {
                return (
                  <IconButton
                    iconStyle={{fill: 'green'}}
                  >
                    <IconOk />
                  </IconButton>
                );
              }
            }
        default:
          return null;
      }
    }

    return (
      <div style={{flex: '1', marginBottom: '20px'}}>
        <div style={{display: 'flex'}}>
          <Subheader style={{width: 'initial'}}>
            <div>
              Ведение цен
            </div>
          </Subheader>
          {dataValidation && <Validation />}
        </div>
        <RadioButtonGroup
          name="positionIsActiveDefinition"
          valueSelected={options.managePrices}
          onChange={
            (e, value)=>{
              setOption("managePrices", value);
            }
          }
        >
          <RadioButton
            value='common'
            label='Общие цены для всех клиентов'
            style={radioStyles.radioButton}
          />
          <RadioButton
            value='byCustomers'
            label='Свои цены для каждого клиента'
            style={radioStyles.radioButton}
          />
          <RadioButton
            value='dontUse'
            label='Не использовать'
            style={radioStyles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  };

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
        {manageGoodsOnStockQty()}
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        {showGoodsOnStockQty()}
      </div>

      <div style={rowStyle}>
        {managePositionIsActiveProp()}
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        {showNoActivePosition()}
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        {orderNoActivePositions()}
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        {positionIsActiveDefinition()}
      </div>

      <div style={rowStyle}>
        {managePrices()}
      </div>

      <div style={rowStyle}>
        {showPictures()}
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
