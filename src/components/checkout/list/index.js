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

import { getGoodsVisibleIdsCheckout } from './../../../store/reducers/cart';

class ListContainer extends Component {

  constructor() {
    super();
    this.state = {current: '', headerSettingsMode: false};
    this.setFocused = this.setFocused.bind(this);
    this.setHeaderSettingsMode = this.setHeaderSettingsMode.bind(this);
    this.removeHeaderSettingsMode= this.removeHeaderSettingsMode.bind(this);
  }

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
        {false && this.getSettingsBtnJsx()}
      </div>
    );

  }
}

export default connect(
  state => ({
    items: state.cart.itemsFiltered,
    visibleItemsIds: getGoodsVisibleIdsCheckout(state),
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
