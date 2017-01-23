import React from 'react';
import { connect } from 'react-redux';
import Pagination from './pagination';
import GoodsList from './list/index';
import Search from './search';
import Paper from 'material-ui/Paper';
import { setModal } from './../../../lib/modal/actions/modal';
// import img1 from './../../../image.jpg';
import {List, ListItem} from 'material-ui/List';

// import img1 from './../../../images/178261540_8e2cd0d4e0_o.jpg';
// import img2 from './../../../images/2381371105_ee7ed440b5_o.jpg';
// import img3 from './../../../images/2398557289_2f7a6b311a_z.jpg';
// import img4 from './../../../images/5047875348_6b5e643b3f_z.jpg';
// import img5 from './../../../images/5822468112_1d29aa1088_z.jpg';
// import img8 from './../../../images/5873149343_3a15fc199e_z.jpg';
// import img6 from './../../../images/6739532325_a5521f83ee_z.jpg';
// import img7 from './../../../images/7308703522_389381bbcf_z.jpg';
// import img9 from './../../../images/8324712083_c7feeb2318_z.jpg';
// import img10 from './../../../images/8922827265_af56de2203_z.jpg';
// import img11 from './../../../images/13086218003_c39edd349e_z.jpg';
// import img12 from './../../../images/13957648459_dc3aee8b8c_z.jpg';
// import img13 from './../../../images/14690349697_22e243679e_z.jpg';
// import img14 from './../../../images/15263695669_1a3b3ea2f7_z.jpg';
// import img15 from './../../../images/15590414733_2bd4428b49_o.jpg';

const img1 = 'https://raw.githubusercontent.com/crazy-loop/quick-order/master/src/images/stackCover.jpg';
const img2 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F13957648459_dc3aee8b8c_z.jpg?alt=media&token=84fc3f08-95c0-4422-bdf7-e6300ec7e41e';
const img3 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F14690349697_22e243679e_z.jpg?alt=media&token=38f2c24f-0b34-4035-8e26-9a410731850a';
const img4 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F15263695669_1a3b3ea2f7_z.jpg?alt=media&token=7d525240-2133-40e5-9b49-e3c2765aa789';
const img5 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F15590414733_2bd4428b49_o.jpg?alt=media&token=e9d9d05e-d9f8-4f81-887e-96fd5c11231c';
const img6 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F178261540_8e2cd0d4e0_o.jpg?alt=media&token=62162a8c-34ce-46a3-8295-cfd3794a2e53';
const img7 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F5047875348_6b5e643b3f_z.jpg?alt=media&token=4a895bc6-0132-4882-ac55-922ea12f13fe';
const img8 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F5822468112_1d29aa1088_z.jpg?alt=media&token=92b733fa-b232-495c-afdd-0d64d7a2752d';
const img9 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F5873149343_3a15fc199e_z.jpg?alt=media&token=f97c6eb6-3902-4acf-9886-c70bf85ad8bf';
const img10 = 'https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/images-goods%2F2398557289_2f7a6b311a_z.jpg?alt=media&token=dbe07cee-c91d-4108-80bc-b681c717809c';
const arr = [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10 ];

// const arr = [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15 ];

const CatalogIndex = props => {
  const { options, dispatch, goods, goodsGroups, prices, current, cart } = props;
  const { itemsInitial: items, currentGuid } = goods;
  const { items: cartItems } = cart;
  const { pictureHeight } = props.ui;
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    padding: '10px'
  };
  let pictContainerStyle = {display: 'flex', padding: '8px', marginTop: '6px'};
  pictContainerStyle = cartItems[currentGuid] ? { ...pictContainerStyle, border: '2px solid goldenrod'} : pictContainerStyle
  const url1 = arr[parseInt(Math.random()* 10, 10) ];
  return (
    <Paper className='catalog' style={style} zDepth={2}>
      <div style={{display: 'flex', justifyContent: 'space-between', height: '65px'}}>
        <Search />
        <Pagination />
      </div>
      <GoodsList />
      {options.showPictures.side  && currentGuid && current !== '' &&
        <div style={pictContainerStyle}>
          <Paper
            rounded={false}
            zDepth={0}
            className='side-picture'
            style={{
              flex: '0 0 50%',
              height: `${pictureHeight}px`,
              // backgroundImage: `url(${img1})`,
              backgroundImage: `url(${url1})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer'
            }}
            onDoubleClick={
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
          <List style={{flex: '0 0 50%', paddingLeft: '10px', paddingTop: '0px', paddingBottom: '0px'}} className='itemProps'>
            <ListItem
              primaryText={items[currentGuid].code}
              secondaryText='Код'
              innerDivStyle={{padding: '3px'}}
              style={{fontSize: '14px'}}
            />
            <ListItem
              primaryText={items[currentGuid].description}
              secondaryText='Наименование'
              innerDivStyle={{padding: '3px'}}
              style={{fontSize: '14px'}}
            />
            <ListItem
              primaryText={prices[currentGuid]}
              secondaryText='Цена'
              innerDivStyle={{padding: '3px'}}
              style={{fontSize: '14px'}}
            />
            <ListItem
              primaryText={goodsGroups.items[items[currentGuid].groupRef]}
              secondaryText='Категория'
              innerDivStyle={{padding: '3px'}}
              style={{fontSize: '14px'}}
            />
            { cartItems[currentGuid] &&
              <ListItem
                primaryText={`${cartItems[currentGuid].qty} ед. х ${cartItems[currentGuid].price} руб. = ${cartItems[currentGuid].amount} руб.`}
                innerDivStyle={{padding: '3px'}}
                style={{fontSize: '14px', fontWeight: 'bold'}}
              />
            }
          </List>
        </div>
      }
    </Paper>
  );
};


export default connect (
  state => {
    const { options, goods, goodsGroups, prices, ui, current, cart } = state;
    return { options, goods, goodsGroups, prices, ui, current, cart };
  }
)(CatalogIndex);
