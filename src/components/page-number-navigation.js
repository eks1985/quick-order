import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';
import { setModal } from './../lib/modal/actions/modal';
import { goToGoodsPage } from './../actions/goods-navigation';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';
import IconSelectPage from 'material-ui/svg-icons/navigation/more-horiz';

const generatePagesListJsx = qtyPages => {
  const res = [];
  for (let i = 1; i <= qtyPages; i++) {
    res.push(<MenuItem key={i} primaryText={i} />)
  };
  return res;
}

const PageNumberNavigation = props => {
  const { dispatch, pageNumber, open, anchorEl, handleRequestClose, handleTouchTap, qtyPages } = props;
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

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={handleRequestClose}
        animation={PopoverAnimationVertical}
        // style={{marginLeft: '-60px'}}
      >
        <Menu
          // style={{width: '200px'}}
          onItemTouchTap={
            (e, target, ind) => {
              handleRequestClose();
              dispatch(setModal());
              dispatch(goToGoodsPage(parseInt(ind, 10) + 1));
            }
          }
        >
          {generatePagesListJsx(qtyPages)}
        </Menu>
      </Popover>

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
