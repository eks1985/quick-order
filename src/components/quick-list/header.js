import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './../../actions/cart';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Header = ({
  parseQuickList
}) => {
  let textToParse = '';
  return (
    <div>
      <div>
      <p>
        Скопируйте данные для заказа из Excel файла и вставьте в поле
      </p>
      <p>
        Вначале строки должен быть артикул, а в конце количество
      </p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <TextField
          // hintText="Вначале строки должен быть артикул, а в конце количество"
          id='quckListArea'
          multiLine={true}
          rows={10}
          style={{width: '100%', background: 'rgba(238, 238, 238, 0.7)'}}
          onChange={
            (e) => {
              textToParse = e.target.value.trim();
            }
          }
        />
        
      </div>
      <div style={{marginTop: '10px'}}>
        <RaisedButton
          label='Обработать'
          onClick={
            () => {
              textToParse !== '' && parseQuickList(textToParse);
            }
          }
        ></RaisedButton>
      </div>
    </div>
  );
};

export default connect(
  state => ({quckList: state.quickList}),
  cartActions
)(Header);
