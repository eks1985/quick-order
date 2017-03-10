import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../../actions/cart';
import * as currentContentActions from './../../../actions/current-content';
import RaisedButton from 'material-ui/RaisedButton';
import IconRemoveCart from 'material-ui/svg-icons/content/clear';
import IconRowing from 'material-ui/svg-icons/action/rowing';
import IconShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { format1 } from './../../../utils/format';

const Cart = ({
  cart,
  managePrices,
  //actions
  cleanCart,
  setCurrentContent
}) => {
  const { totalItems, totalAmount } = cart;
  const style = {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: '3px',
    paddingBottom: '18px',
    background: '#eee'
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    const style = { display: 'flex', height: '73px', alignItems: 'center', paddingLeft: '10px' };

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div
          style={hasItems ? { ...style, cursor: 'pointer' } : style }
          onClick={
            () => {
              hasItems && setCurrentContent('checkout');
            }
          }
        >
          <div>
            <IconShoppingCart style={{width: 42, height: 42}} />
          </div>
          {hasItems &&
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '10px'}}>
              { managePrices !== 'dontUse' &&
                <div style={{fontSize: '16px', fontWeight: 'bold'}}>
                  {format1(totalAmount, 'руб.')}
                </div>
              }
              <div style={{fontSize: '12px'}}>
                {`${totalItems} позиций`}
              </div>
            </div>
          }
          {!hasItems &&
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '10px', fontSize: '20px'}}>
              Корзина пуста
            </div>
          }
        </div>

        {hasItems &&
          <div style={{display: 'flex', flex: '1 0 100%', justifyContent: 'center'}}>
            <div style={{marginRight: '3px'}}>
              <RaisedButton
                icon={<IconRowing />}
                label='Заказать'
                labelStyle={{fontWeight: 'normal'}}
                onClick={
                  () => {
                    setCurrentContent('checkout');
                  }
                }
              />
            </div>
            <div style={{marginLeft: '3px'}}>
              <RaisedButton
                icon={<IconRemoveCart />}
                label='Очистить'
                labelStyle={{fontWeight: 'normal'}}
                onClick={
                  () => {
                    const yes = confirm("Уверены? Будут очищены все введеные значения количеств на страницах списка товаров");
                    if (yes) {
                      cleanCart();
                    }
                  }
                }
              />
            </div>
          </div>
        }
      </div>

    );
  };

  return (
    <div className='cart' style={style}>
      {getCartStyledJsx()}
    </div>
  );
};

export default connect(
  state => {
    const { cart, options: { managePrices} } = state;
    return { cart, managePrices};
  },
  { ...cartActions, ...currentContentActions }
)(Cart);
