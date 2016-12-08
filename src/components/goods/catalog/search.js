import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as goodsActions from './../../../actions/goods';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconClear from 'material-ui/svg-icons/content/clear';

let Search = ({
  search,
  //action
  setSearchText
}) => {
  let input;
  const iconButtonStyle = {
    padding: '0px',
    height: '36px',
    width: '36px'
  };
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TextField
        className='search'
        placeholder='для перехода нажмите /'
        id='search'
        ref={
          (node) => {
            input = node;
          }
        }
        autoFocus
        type="text"
      >
      </TextField>
      {'  '}
      <IconButton
        tabIndex={-1}
        style={iconButtonStyle}
        onClick={
          () => {
            setSearchText(input.input.value);
          }
        }
      >
        <IconSearch />
      </IconButton>
      {'  '}
      <IconButton
        tabIndex={-1}
        style={iconButtonStyle}
        onClick={
          () => {
            setSearchText('');
            input.input.value = '';
        }
      }>
        <IconClear />
      </IconButton>
    </div>
  );
};

class SearchContainer extends Component {
  render () {
    return <Search {...this.props} />;
  }
}

export default connect(
  null,
  goodsActions
)(SearchContainer);
