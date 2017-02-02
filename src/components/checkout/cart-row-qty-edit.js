import React from 'react';
import { connect } from 'react-redux';
import { setModal } from './../../lib/modal/actions/modal';
import FlatButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { removeFromCart, addToCart } from './../../actions/cart';
import { removeCatalogQty, addCatalogQty } from './../../actions/catalog-qty';

const CartRowQtyEdit = props => {
  const { setModal, removeFromCart, removeCatalogQty, addToCart, addCatalogQty, prices } = props;
  const { keyProp } = props.modal.data;
  let input;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TextField
        id='editQtyRowCheckout'
        style={{width: '50px'}}
        inputStyle={{textAlign: 'center'}}
        ref={
          node => {
            input = node;
          }
        }
      />
      <FlatButton
        label='ОК'
        style={{marginLeft: '10px'}}
        onClick={
          () => {
            const val = parseInt(input.input.value, 10) || input.input.value;
            if (val === '' || val === 0) {
              removeFromCart(keyProp);
              removeCatalogQty(keyProp);
              setModal();
            }
            if (parseInt(val, 10) === val) {
              console.log('val', val);
              addCatalogQty(keyProp, val);
              addToCart(keyProp, val, prices[keyProp]);
              setModal();
            } else {
              // console.log('not valid');
            }
          }
        }
      />
      <div style={{marginLeft: '10px', color: 'red', fontSize: '10px', width: '160px'}}>Если оставить количество пустым строка будет удалена</div>
    </div>
  );
}

// class CartRowQtyEditContainer extends Component {
//   constructor() {
//     super();
//     this.state = '';
//   }
//
//   handleQtyChange(val) {
//     console.log(123);
//   }
//
// }

export default connect(
  state => ({ modal: state.modal, prices: state.prices }),
  { setModal, removeFromCart, removeCatalogQty , addToCart, addCatalogQty }
)(CartRowQtyEdit);
