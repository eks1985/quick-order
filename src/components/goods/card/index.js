import React from 'react';
import { connect } from 'react-redux';
import { pictData } from './../../../utils/init-pict';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { setModal } from './../../../lib/modal/actions/modal';

const Card = ({
  goods,
  goodsGroups,
  prices,
  options,
  currentGuid,
  //actions
  setModal
}) => {
  const { items } = goods;
  const style = {
    display: 'flex',
    marginTop: '10px'
  }
  return (
    <div>
      <RaisedButton
        label='Закрыть'
        onClick={
          () => {
            setModal();
          }
        }
      />
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
    </div>
  );
};

export default connect(
  state => {
    const { goods, goodsGroups, prices, options, modal, cart } = state;
    const currentGuid = modal.data.source === 'catalog' ? goods.currentGuid : cart.currentGuid;
    return  { goods, goodsGroups, prices, options, modal, cart, currentGuid };
  },
  { setModal }
  // state => ({goods: state.goods, goodsGroups: state.goodsGroups, prices: state.prices, options: state.options})
)(Card);
