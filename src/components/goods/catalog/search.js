import React from 'react';
import { connect } from 'react-redux';
import * as goodsActions from './../../../actions/goods';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconClear from 'material-ui/svg-icons/content/clear';

let Search = ({
  search,
}) => {
  let input;
  const iconButtonStyle = {
    padding: '0px',
    height: '36px',
    width: '36px'
  }
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TextField
        placeholder='для перехода нажмите /'
        id='search'
        autoFocus
        type="text"
        ref={(node) => {
          input = node;
        }}
      >
      </TextField>
      {'  '}
      <IconButton
        style={iconButtonStyle}
        onClick={
          () => {
            search(input.input.value);
          }
        }
      >
        <IconSearch />
      </IconButton>
      {'  '}
      <IconButton
        style={iconButtonStyle}
        onClick={
          () => {
            search('');
            input.input.value = '';
        }
      }>
        <IconClear />
      </IconButton>
    </div>
  );
};

export default connect(
  null,
  goodsActions
)(Search);
