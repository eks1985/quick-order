import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as cartActions       from './../../../actions/cart';
import * as goodsActions      from './../../../actions/goods';
import * as modalActions      from './../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../actions/catalog-qty';
import * as optionsActions    from './../../../actions/options';
import * as checkoutActions   from './../../../actions/checkout';

import { getColumnsCheckout } from './../../../store/reducers/options';

import IconButton             from 'material-ui/IconButton';
import IconSettings           from 'material-ui/svg-icons/action/settings';
import IconDone               from 'material-ui/svg-icons/action/done';

import Column                 from './column';
import styles                 from './styles';

import { getGoodsVisibleIdsCheckout, getGoodsItemsByCartGoodsIds } from './../../../store/reducers/cart';

class ListContainer extends Component {

  constructor() {
    super();
    this.state = {current: '', headerSettingsMode: false};
    this.setFocusedCheckout = this.setFocusedCheckout.bind(this);
    this.setHeaderSettingsMode = this.setHeaderSettingsMode.bind(this);
    this.removeHeaderSettingsMode= this.removeHeaderSettingsMode.bind(this);
  }

  setFocusedCheckout(key) {
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
    const props = {
      ...this.props,
      headerSettingsMode: this.state.headerSettingsMode,
      setHeaderSettingsMode: this.setHeaderSettingsMode.bind(this),
      removeHeaderSettingsMode: this.removeHeaderSettingsMode.bind(this),
      currentId: this.state.current,
      columnsQty: this.props.columnsKeys.length
    };
    return (
      <div style={styles.style}>
        {this.props.columnsKeys.map((key, i) => <Column {...props } key={`${key}column`}  columnKey={key} columnsKeys={this.props.columnsKeys} i={i} />)}
        {this.getSettingsBtnJsx()}
      </div>
    );

  }
}

export default connect(
  state => {
    const visibleItemsIds = getGoodsVisibleIdsCheckout(state);
    return {
      items: state.cart.itemsFiltered,
      visibleItemsIds,
      goodsItems: getGoodsItemsByCartGoodsIds(state.goods.itemsInitial, visibleItemsIds),
      totalItems: state.cart.totalItems,
      checkout: state.checkout,
      prices: state.prices,
      catalogQty: state.catalogQty,
      // columnsKeys: state.options.catalogListSettingsCheckout,
      columnsKeys: getColumnsCheckout(state.options),
      sortDirection: state.ui.sortDirectionCheckout,
      currentCheckout: state.currentCheckout,
      catalogListColumns: state.options.catalogListColumnsCheckout
    }
  },
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions, ...optionsActions, ...checkoutActions }
)(ListContainer);
