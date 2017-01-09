import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { getColumns }         from './../../../../store/reducers/options';
import * as cartActions       from './../../../actions/cart';
import * as goodsActions      from './../../../actions/goods';
import * as modalActions      from './../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../actions/catalog-qty';
import * as optionsActions    from './../../../actions/options';
import * as checkoutActions   from './../../../actions/checkout';

import IconButton             from 'material-ui/IconButton';
import IconSettings           from 'material-ui/svg-icons/action/settings';
import IconDone               from 'material-ui/svg-icons/action/done';

import Column                 from './column';
import styles                 from './styles';

class ListContainer extends Component {

  constructor() {
    super();
    this.state = {current: '', headerSettingsMode: false};
    this.setFocused = this.setFocused.bind(this);
    this.setHeaderSettingsMode = this.setHeaderSettingsMode.bind(this);
    this.removeHeaderSettingsMode= this.removeHeaderSettingsMode.bind(this);
  }

  // componentDidMount() {
  //   document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  // }
  //
  // handleKeyUp(e) {
  //   if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
  //     let id = parseInt(document.activeElement.id, 10);
  //     let newId = id < 9 ? id + 1 : 0;
  //     document.getElementById(newId).focus();
  //   }
  //   if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
  //     let id = parseInt(document.activeElement.id, 10);
  //     let newId = id < 9 ? id + 1 : 0;
  //     document.getElementById(newId).focus();
  //   }
  //   if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
  //     let id = parseInt(document.activeElement.id, 10);
  //     let newId = id > 0 ? id - 1 : 9;
  //     document.getElementById(newId).focus();
  //   }
  //   if (e.which === 34) {
  //     this.props.moveGoodsForward();
  //   }
  //   if (e.which === 33) {
  //     this.props.moveGoodsBack();
  //   }
  // }

  setFocused(key) {
    this.setState({current: key});
  }

  setHeaderSettingsMode() {
    this.setState({headerSettingsMode: true});
  }

  removeHeaderSettingsMode() {
    this.setState({headerSettingsMode: false});
  }

  getSettingsBtnJsx() {
    const { headerSettingsIBStyle, headerSettingsIconStyle } = styles;
    const { headerSettingsMode} = this.state;
    return (
      <div style={headerSettingsIBStyle}>
        {!headerSettingsMode &&
          <IconButton
            tabIndex={-1}
            style={headerSettingsIconStyle}
            onClick={this.setHeaderSettingsMode}
          >
            <IconSettings color='#ccc' />
          </IconButton>
        }
        {headerSettingsMode &&
          <IconButton
            tabIndex={-1}
            style={headerSettingsIconStyle}
            onClick={this.removeHeaderSettingsMode}
          >
            <IconDone />
          </IconButton>
        }
      </div>
    );
  }

  render() {
    // const columnsKeys = ['code', 'description', 'price', 'qty', 'delete'];
    const props = {
      ...this.props,
      setFocused: this.setFocused,
      headerSettingsMode: this.state.headerSettingsMode,
      setHeaderSettingsMode: this.setHeaderSettingsMode.bind(this),
      removeHeaderSettingsMode: this.removeHeaderSettingsMode.bind(this),
      currentId: this.state.current,
      columnsQty: this.props.columnsKeys.length
    };
    // const { columnsKeys } = props;
    return (
      <div style={styles.style}>
        {this.props.columnsKeys.map((key, i) => <Column {...props } key={`${key}column`}  columnKey={key} columnsKeys={this.props.columnsKeys} i={i} />)}
        {this.getSettingsBtnJsx()}
      </div>
    );

  }
}

export default connect(
  state => ({
    items: state.cart.items,
    totalItems: state.cart.totalItems,
    checkout: state.checkout,
    prices: state.prices,
    catalogQty: state.catalogQty,
    columnsKeys: ['code', 'description', 'price', 'qty', 'amount', 'delete'],
    sortDirection: state.sortDirection
  }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions, ...optionsActions, ...checkoutActions }
)(ListContainer);

// export default ListContainer;
