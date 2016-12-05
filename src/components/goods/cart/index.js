import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../../actions/cart';
import * as currentContentActions from './../../../actions/current-content';
// import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import IconRemoveCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import IconRowing from 'material-ui/svg-icons/action/rowing';
// import IconCart from 'material-ui/svg-icons/action/shopping-basket';
import IconShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { format1 } from './../../../utils/format';

const Cart = ({
  cart,
  //actions
  cleanCart,
  setCurrentContent
}) => {
  const { totalItems, totalAmount } = cart;
  const style = {
    // height: '130px',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: '3px',
    paddingBottom: '18px',
    background: '#eee'
  };
  const hasItems = cart.totalItems > 0;

  const getCartStyledJsx = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {/* <div style={{display: 'flex', flexDirection: 'column', height: '73px'}}>
          <Subheader style={{display: 'flex', alignItems: 'center', lineHeight: '40px'}}>
            Корзина
          </Subheader>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {`Позиций `}<span style={{paddingLeft: '3px', paddingRight: '3px', fontWeight: 'bold'}}>{totalItems}</span>{` на сумму: `}<span style={{paddingLeft: '3px', paddingRight: '3px', fontWeight: 'bold'}}>{format1(totalAmount, 'руб.')}</span>
          </div>
        </div> */}
        
        <div 
          style={{display: 'flex', height: '73px', alignItems: 'center', paddingLeft: '10px', cursor: 'pointer'}}
          onClick={
            () => {
              setCurrentContent('checkout');
            }
          }
        >
          <div>
            <IconShoppingCart style={{width: 42, height: 42}} />
          </div>
          {hasItems &&
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '10px'}}>
              <div style={{fontSize: '16px', fontWeight: 'bold'}}>
                {format1(totalAmount, 'руб.')}  
              </div>
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

  // const getCartJsx = () => {
  //   return (
  //     <div style={{display: 'flex'}}>
  //         <div style={{flex: '0 0 70%'}}>
  //           <div>
  //             {`Всего позиций: ${totalItems}`}
  //           </div>
  //           <div>
  //             {`На сумму: ${totalAmount}`}
  //           </div>
  //         </div>
  //         {hasItems &&
  //           <div style={{flex: '0 0 30%'}}>
  //             <button onClick={cleanCart}>
  //               Очистить
  //             </button>
  //             <button
  //               onClick={
  //                 () => {
  //                   setCurrentContent('checkout');
  //                 }
  //               }
  //             >
  //               Оформить
  //             </button>
  //           </div>
  //         }
  //     </div>
  //   );
  // }

  return (
    <div className='cart' style={style}>
      {/* {getCartJsx()} */}
      {getCartStyledJsx()}
    </div>
  );
};

export default connect(
  state => ({cart: state.cart}),
  { ...cartActions, ...currentContentActions }
)(Cart);
