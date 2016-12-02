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
    return (
      <div style={toggleStyles.block}>
        <Toggle
          defaultToggled={true}
          label="Label on the right"
          labelPosition="right"
          style={toggleStyles.toggle}
        />
      </div>
    );
  };
  
  // const manageGoodsOnStockQty = () => {
  //   return (
  //     <div style={{flex: '1'}}>
  //       <Subheader>
  //         Учитывать складские остатки
  //       </Subheader>
  //       <RadioButtonGroup 
  //         name="manageGoodsOnStockQty" 
  //         defaultSelected={false}
  //         onChange={
  //           (e, value)=>{
  //             // console.log(value);
  //             setOption("manageGoodsOnStockQty", value);
  //           }
  //         }
  //       >
  //         <RadioButton
  //           value={false}
  //           label="Нет"
  //           style={radioStyles.radioButton}
  //         />
  //         <RadioButton
  //           value={true}
  //           label="Да"
  //           style={radioStyles.radioButton}
  //         />
  //       </RadioButtonGroup>
  //     </div>
  //   );
  // };
  
  const showGoodsOnStockQty = () => {
    return (
      <div style={{flex: '1'}}>
        <Subheader>
          Показывать остатки в каталоге
        </Subheader>
        <RadioButtonGroup name="showGoodsOnStockQty" defaultSelected={false}>
          <RadioButton
            disabled={!options.manageGoodsOnStockQty}
            value={false}
            label="Нет"
            style={radioStyles.radioButton}
          />
          <RadioButton
            disabled={!options.manageGoodsOnStockQty}
            value={true}
            label="Да"
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
      
      <div style={rowStyle}>
        {showGoodsOnStockQty()}
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
  
 