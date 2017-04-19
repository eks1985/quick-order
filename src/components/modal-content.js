import React from 'react';
import { connect } from 'react-redux';
import Help from './help';
import Profile from './profile';
import GoodsCard from './goods/card';
import Login from './log-in';
import ColumnSettings from './column-settings';
import ColumnSettingsCheckout from './column-settings-checkout';
import FirebaseConfig from './firebase-config';
import PricesValidation from './options/validations/prices';
import PageNumberNavigation from './page-number-navigation';
import CartRowQtyEdit from './checkout/cart-row-qty-edit';
import Order from './orders/order';
// import OrderPrint from './orders/order-print';
import PagesList from './goods/catalog/pages-list';

const ModalContent = ({
  modal
}) => {
  return (
    <div>
      {modal.content === 'profile' && <Profile />}
      {modal.content === 'help' && <Help />}
      {modal.content === 'goodsCard' && <GoodsCard />}
      {modal.content === 'login' && <Login />}
      {modal.content === 'firebase-config' && <FirebaseConfig />}
      {modal.content === 'column-settings' && <ColumnSettings />}
      {modal.content === 'column-settings-checkout' && <ColumnSettingsCheckout />}
      {modal.content === 'prices-validation' && <PricesValidation />}
      {modal.content === 'page-number-navigation' && <PageNumberNavigation />}
      {modal.content === 'cart-row-qty-edit' && <CartRowQtyEdit />}
      {modal.content === 'order' && <Order />}
      {/* {modal.content === 'order-print' && <OrderPrint />} */}
      {modal.content === 'catalog-pages-list' && <PagesList />}
    </div>
  );
};

export default connect(
  state => ({ modal: state.modal})
)(ModalContent);
