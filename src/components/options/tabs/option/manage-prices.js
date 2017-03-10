import React from 'react';
import { connect } from 'react-redux';

import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconOk from 'material-ui/svg-icons/action/done';
import IconError from 'material-ui/svg-icons/alert/error-outline';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { listenToPrices } from './../../../../actions/prices-firebase';

const OptionManagePrices = props => {

  const { items, prices, options, setModal, setOption, radioStyles, listenToPrices } = props;

  const itemsKeysLength = Object.keys(items).length;

  let dataValidation = itemsKeysLength > 0;
  dataValidation = false;

  let priceKeys = Object.keys(prices);
  let priceObj = priceKeys.length > 0 ? prices[priceKeys[0]] : undefined;
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
              <IconOk />
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
      case 'byPriceTypes':
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
            setOption('managePrices', value);
            listenToPrices();
          }
        }
      >
        <RadioButton
          value='common'
          label='Общие цены для всех клиентов'
          style={radioStyles.radioButton}
        />
        <RadioButton
          value='byPriceTypes'
          label='Цены в разрезе типов цен'
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
}

export default connect(null, { listenToPrices })(OptionManagePrices);
