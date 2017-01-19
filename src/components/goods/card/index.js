import React from 'react';
import { connect } from 'react-redux';
import { pictData } from './../../../utils/init-pict';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

const Card = ({
  goods,
  goodsGroups,
  prices,
  options
}) => {
  const { currentGuid, items } = goods;
  const style = {
    display: 'flex',
  }
  return (
    <div style={style}>
      <Paper className='goodsProps' style={{display: 'flex', flexDirection: 'column' , flex: '0 0 50%'}}>
          <List>
            <ListItem
              primaryText={items[currentGuid].code}
              secondaryText='Код'
            >
            </ListItem>
          </List>

          <List>
            <ListItem
              primaryText={items[currentGuid].description}
              secondaryText='Наименование'
            >
            </ListItem>
          </List>

          <List>
            <ListItem
              primaryText={prices[currentGuid]}
              secondaryText='Цена'
            >
            </ListItem>
          </List>

          <List>
            <ListItem
              primaryText={goodsGroups.items[items[currentGuid].groupRef]}
              secondaryText='Категория'
            >
            </ListItem>
          </List>
      </Paper>

      {options.showPictures.dialog &&
        <div className='picture' style={{flexDirection: 'column', flex: '0 1 50%'}}>
            <img style={{width: '100%', padding: '10px'}} src={pictData().base64data} alt=''></img>
        </div>
      }
    </div>
  );
};

export default connect(
  state => ({goods: state.goods, goodsGroups: state.goodsGroups, prices: state.prices, options: state.options})
)(Card);
