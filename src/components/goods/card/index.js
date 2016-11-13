import React from 'react';
import { connect } from 'react-redux';
import { pictData } from './../../../utils/init-pict';

const Card = ({
  goods,
  goodsGroups,
  prices
}) => {
  const { currentGuid, items } = goods;
  const style = {
    display: 'flex',
    // flexDirection: 'column'
  }
  const propTytleStyle = {
    fontStyle: 'italic',
    background: '#ccc'
  }
  return (
    <div style={style}>
      <div className='goodsProps' style={{display: 'flex', flexDirection: 'column' , flex: '0 0 50%'}}>
          <div style={propTytleStyle}>
            Код
          </div>
          <div>
            <p>
              {items[currentGuid].code}
            </p>
          </div>
          <div style={propTytleStyle}>
            Наименование
          </div>
          <div>
            <p>
              {items[currentGuid].description}
            </p>
          </div>
          <div style={propTytleStyle}>
            Цена
          </div>
          <div>
            <p>
              {prices[currentGuid]}
            </p>
          </div>
          <div style={propTytleStyle}>
            Категория
          </div>
          <div>
            <p>
              {goodsGroups[items[currentGuid].group_guid]}
            </p>
          </div>

      </div>
      <div className='picture' style={{flexDirection: 'column', flex: '0 0 50%'}}>
          <img style={{width: '100%', padding: '10px'}} src={pictData().base64data} alt=''></img>
      </div>
    </div>
  );
};

export default connect(
  state => ({goods: state.goods, goodsGroups: state.goodsGroups, prices: state.prices})
)(Card);
