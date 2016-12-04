import React from 'react';
import { connect } from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import * as actionsOptions from './../../actions/options';

const Options = ({
  options,
  //actions
  setOption
}) => {
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
              manageGoodsOnStockQty.state.switched && setOption("showGoodsOnStockQty", false);
              manageGoodsOnStockQty.state.switched && setOption("positionIsActiveDefinition", "positionData");
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

  const positionIsActiveDefinition = () => {
    console.log(options);
    return (
      <div style={{flex: '1'}}>
        <Subheader>
          Определение активных/не активных позиций
        </Subheader>
        <RadioButtonGroup
          name="positionIsActiveDefinition"
          defaultSelected={options.positionIsActiveDefinition}
          onChange={
            (e, value)=>{
              setOption("positionIsActiveDefinition", value);
            }
          }
        >
          <RadioButton
            value='positionData'
            label='Непосредственно из данных от 1с'
            style={radioStyles.radioButton}
          />
          <RadioButton
            disabled={options.manageGoodsOnStockQty}
            value='stock'
            label='Позиция активна если остаток на складе > 0'
            style={radioStyles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  };

  return (
    <Paper style={{display: 'flex', flexDirection: 'column', padding: '10px', flex: '1 0 auto'}}>

      <div style={rowStyle}>
        {manageGoodsOnStockQty()}
      </div>

      <div style={{ ...rowStyle, ...{marginLeft: '50px'} }}>
        {showGoodsOnStockQty()}
      </div>

      <div style={rowStyle}>
        {managePositionIsActiveProp()}
      </div>

      <div style={rowStyle}>
        {positionIsActiveDefinition()}
      </div>

    </Paper>
  );
};

export default connect(
  state => ({ options: state.options }) ,
  actionsOptions
)(Options);

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
