import React from 'react';
import { connect } from 'react-redux';

const Profile = ({
  customer
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  };
  const propTytleStyle = {
    fontStyle: 'italic',
    background: '#ccc'
  }
  return (
    <div className='profile' style={style}>
      <div style={propTytleStyle}>
        Код клиента
      </div>
      <div>
        <p>
          {customer.guid}
        </p>
      </div>
      <div style={propTytleStyle}>
        Наименование
      </div>
      <div>
        <p>
          {customer.description}
        </p>
      </div>
      <div style={propTytleStyle}>
        Адрес доставки
      </div>
      <div>
        <p>
          {customer.address}
        </p>
      </div>
      <div style={propTytleStyle}>
        Тип цен
      </div>
      <div>
        <p>
          {customer.priceType}
        </p>
      </div>
    </div>
  );
};

export default connect(
  state => ({customer: state.customer})
)(Profile);
