import React from 'react';
import { connect } from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import * as actionsOptions from './../../actions/options';
import * as actionsOptionsFirebase from './../../actions/options-firebase';
import * as firebaseConfigActions from './../../actions/firebase-config';
import * as indexesActions  from './../../actions/indexes';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility';
import Search from 'material-ui/svg-icons/action/search';
import SearchOff from 'material-ui/svg-icons/action/search';
import Sort from 'material-ui/svg-icons/action/swap-vert';
import SortOff from 'material-ui/svg-icons/action/swap-vert';
import {Tabs, Tab} from 'material-ui/Tabs';

const Options = ({
  options,
  items,
  //actions
  setOption,
  resetFirebaseConfig,
  setCommonOptionCatalogListColumnsFirebase,
  buildIndex
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
  
  const getItemJsx = (item) => {
    const itemKeys = Object.keys(item);
    let i;
    i = itemKeys.indexOf('code');
    if (i > -1) {
      itemKeys.splice(i, 1);
    }
    i = itemKeys.indexOf('description');
    if (i > -1) {
      itemKeys.splice(i, 1);
    }
    i = itemKeys.indexOf('groupRef');
    if (i > -1) {
      itemKeys.splice(i, 1);
    }
    return itemKeys.map(key => {
      return (
        <div key={key} style={{display: 'flex'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Checkbox
              style={{width: '60px', padding: '6px', border: '1px solid #eee', textAlign: 'center'}}
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              checked={options.catalogListColumns[key] ? options.catalogListColumns[key][0] : false }
              onCheck={
                (e, isInputChecked) => {
                  setCommonOptionCatalogListColumnsFirebase(key, 0, isInputChecked);
                }
              }
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Checkbox
              style={{width: '60px', padding: '6px', border: '1px solid #eee', textAlign: 'center'}}
              checkedIcon={<Search />}
              uncheckedIcon={<SearchOff />}
              checked={options.catalogListColumns[key] ? options.catalogListColumns[key][1] : false }
              onCheck={
                (e, isInputChecked) => {
                  setCommonOptionCatalogListColumnsFirebase(key, 1, isInputChecked);
                }
              }
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Checkbox
              style={{width: '60px', padding: '6px', border: '1px solid #eee', textAlign: 'center'}}
              checkedIcon={<Sort />}
              uncheckedIcon={<SortOff />}
              checked={options.catalogListColumns[key] ? options.catalogListColumns[key][2] : false }
              onCheck={
                (e, isInputChecked) => {
                  setCommonOptionCatalogListColumnsFirebase(key, 2, isInputChecked);
                }
              }
            />
          </div>
          <div style={{width: '150px', padding: '6px', border: '1px solid #eee'}}>{key}</div>
          <div style={{width: '350px', padding: '6px', border: '1px solid #eee', overflow: 'hidden', height: '38px'}}>{item[key]}</div>
          <div style={{width: '250px', padding: '6px', border: '1px solid #eee', overflow: 'hidden', height: '38px'}}>Ок</div>
        </div>
      );
    });
  };
  
  const getRequiredPropJsx = (item, propKey) => {
    let visible, search, sort;
    if (propKey === 'code') {
      visible = true;
      search = true;
      sort = true;
    }
    if (propKey === 'description') {
      visible = true;
      search = true;
      sort = true;
    }
    if (propKey === 'groupRef') {
      visible = false;
      search = false;
      sort = false;
    }
    return (
    <div key={propKey} style={{display: 'flex'}}>
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#eee'}}>
          <Checkbox
            style={{width: '60px', padding: '6px', border: '1px solid #eee', textAlign: 'center'}}
            checkedIcon={<Visibility />}
            uncheckedIcon={<VisibilityOff />}
            checked={visible}
            onCheck={
              (e) => {
                alert('Запрещено менять настройки стандартных колонок');
                e.preventDefault();
              }
            }
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#eee'}}>
          <Checkbox
            style={{width: '60px', padding: '6px', border: '1px solid #eee', textAlign: 'center'}}
            checkedIcon={<Search />}
            uncheckedIcon={<SearchOff />}
            checked={search}
            onCheck={
              (e) => {
                alert('Запрещено менять настройки стандартных колонок');
                e.preventDefault();
              }
            }
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#eee'}}>
          <Checkbox
            style={{width: '60px', padding: '6px', border: '1px solid #eee', textAlign: 'center'}}
            checkedIcon={<Sort />}
            uncheckedIcon={<SortOff />}
            checked={sort}
            onCheck={
              (e) => {
                alert('Запрещено менять настройки стандартных колонок');
                e.preventDefault();
              }
            }
          />
        </div>
        <div style={{width: '150px', padding: '6px', border: '1px solid #eee', backgroundColor: '#eee'}}>{propKey}</div>
        <div style={{width: '350px', padding: '6px', border: '1px solid #eee', overflow: 'hidden', height: '38px', backgroundColor: '#eee'}}>{item[propKey]}</div>
        <div style={{width: '250px', padding: '6px', border: '1px solid #eee', overflow: 'hidden', height: '38px', backgroundColor: '#eee'}}>{item[propKey] ? 'Ок' : 'Отсутствуют необходимые данные'}</div>
      </div>
    );
  };
  
  const getItemsJsx = () => {
    const itemsKeys = Object.keys(items);
    return itemsKeys.length > 0 && 
      <div style={{display: 'flex', flexDirection: 'column'}}>{getItemJsx(items[itemsKeys[0]])}</div>;
  };
  
  const getRequiredPropsJsx = () => {
    const requiredProps = ['code', 'description', 'groupRef'];
    const itemsKeys = Object.keys(items);
    return itemsKeys.length > 0 && (
      <div 
        style={{display: 'flex', flexDirection: 'column'}}
        className='requredProps'
      >
        {
          requiredProps.map(
            key => { 
              return getRequiredPropJsx(items[itemsKeys[0]], key); 
            }
          )
        }
      </div>
    );
  };
  
  return (
    <Paper style={{display: 'flex', flexDirection: 'column', padding: '10px', flex: '1 0 auto'}}>

      <Tabs>
      
        <Tab label="Структура данных" >
        
          <Subheader>
            Товары
          </Subheader>
          
          <div style={{marginTop: '10px'}}>
            {getRequiredPropsJsx()}
            {getItemsJsx()}
          </div>
          
          <Subheader>
            Категории
          </Subheader>
          
          <Subheader>
            Цены
          </Subheader>
          
          <Subheader>
            Контрагенты
          </Subheader>
          
        </Tab>
      
        <Tab label="Бизнес логика" >

          <div style={{paddingTop: '20px'}}>

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
          
          </div>
        
        </Tab>  
       
        <Tab label="Интерфейс" >
        
        </Tab>
        
      </Tabs>
      
    </Paper>
  );
};

export default connect(
  state => ({ options: state.options, items: state.goods.itemsInitial }) ,
  { ...actionsOptions, ...firebaseConfigActions, ...actionsOptionsFirebase, ...indexesActions }
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
