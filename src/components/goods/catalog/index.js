import React from 'react';
import { connect } from 'react-redux';
import Pagination from './pagination';
import GoodsList from './list/index';
import Search from './search';
import Paper from 'material-ui/Paper';
import { setModal } from './../../../lib/modal/actions/modal';
import img1 from './../../../image.jpg';
import {List, ListItem} from 'material-ui/List';

const CatalogIndex = props => {
  const { options, dispatch, goods, goodsGroups, prices } = props;
  const { items, currentGuid } = goods;
  const { pictureHeight } = props.ui;
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    padding: '10px'
  };
  return (
    <Paper className='catalog' style={style} zDepth={2}>
      <div style={{display: 'flex', justifyContent: 'space-between', height: '65px'}}>
        <Search />
        <Pagination />
      </div>
      <GoodsList />
      {options.showPictures.side  && currentGuid &&
        <div style={{display: 'flex'}}>
          <Paper
            rounded={false}
            zDepth={0}
            className='side-picture'
            style={{
              flex: '0 0 50%',
              height: `${pictureHeight}px`,
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
          <List style={{flex: '0 0 50%'}}>
            <ListItem
              primaryText={items[currentGuid].code}
              secondaryText='Код'
              innerDivStyle={{padding: '5px'}}
            >
            </ListItem>
            <ListItem
              primaryText={items[currentGuid].description}
              secondaryText='Наименование'
              innerDivStyle={{padding: '5px'}}
            >
            </ListItem>
            <ListItem
              primaryText={prices[currentGuid]}
              secondaryText='Цена'
              innerDivStyle={{padding: '5px'}}
            >
            </ListItem>
            <ListItem
              primaryText={goodsGroups.items[items[currentGuid].groupRef]}
              secondaryText='Категория'
              innerDivStyle={{padding: '5px'}}
            >
            </ListItem>
          </List>
        </div>
      }
    </Paper>
  );
};


export default connect (
  state => ({ options: state.options, goods: state.goods, goodsGroups: state.goodsGroups, prices: state.prices, ui: state.ui })
)(CatalogIndex);
