import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';
import { setModal } from './../lib/modal/actions/modal';
import { goToGoodsPage } from './../actions/goods-navigation';

import IconButton from 'material-ui/IconButton';
import IconSelectPage from 'material-ui/svg-icons/navigation/more-horiz';

const PageNumberNavigation = props => {
  const { dispatch, pageNumber, handleTouchTap} = props;
  let input;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TextField
        defaultValue={pageNumber}
        id='pageNumderCatalog'
        style={{width: '40px'}}
        inputStyle={{textAlign: 'center'}}
        ref={
          node => {
            input = node;
          }
        }
      />

      <IconButton
        onTouchTap={handleTouchTap}
      >
        <IconSelectPage />
      </IconButton>

      <RaisedButton
        style={{marginLeft: '5px'}}
        label='Перейти'
        onClick={
          () => {
            const page = parseInt(input.input.value, 10) ? parseInt(input.input.value, 10) : 1;
            dispatch(goToGoodsPage(page));
            dispatch(setModal());
          }
        }
      >
      </RaisedButton>
    </div>
  );
}

class PageNumberNavigationContainer extends Component {
  constructor(){
    super();

    this.state = {
      open: false
    };
  }

  handleTouchTap = e => {
    event.preventDefault();
    this.props.dispatch(setModal({ content: 'catalog-pages-list', fullScreen: true, style: {background: '#eee'} }));
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    })
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return <PageNumberNavigation {...this.props} anchorEl={this.state.anchorEl} handleRequestClose={this.handleRequestClose} handleTouchTap={this.handleTouchTap} open={this.state.open} />
  }
}

export default connect(
  state => {
    return { pageNumber: state.goods.pageNumber, qtyPages: state.goods.qtyPages }
  }
)(PageNumberNavigationContainer);
