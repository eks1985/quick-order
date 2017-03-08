import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGoodsVisibleIds } from './../../../../store/reducers/goods';
import { getColumns }         from './../../../../store/reducers/options';
import * as cartActions       from './../../../../actions/cart';
import * as goodsActions      from './../../../../actions/goods';
import * as modalActions      from './../../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../../actions/catalog-qty';
import * as optionsActions    from './../../../../actions/options';
import * as currentActions    from './../../../../actions/current';

import IconButton             from 'material-ui/IconButton';
import IconSettings           from 'material-ui/svg-icons/action/settings';
import IconDone               from 'material-ui/svg-icons/action/done';

import Column                 from './column';
import styles                 from './styles';

class ListContainer extends Component {

  constructor() {
    super();
    this.state = {current: '', headerSettingsMode: false};
    this.setHeaderSettingsMode = this.setHeaderSettingsMode.bind(this);
    this.removeHeaderSettingsMode = this.removeHeaderSettingsMode.bind(this);
  }

  setHeaderSettingsMode() {
    this.setState({headerSettingsMode: true});
  }

  removeHeaderSettingsMode() {
    this.setState({headerSettingsMode: false});
  }

  componentDidUpdate = () => {
    this.props.current === 0 && document.getElementById(0).focus();
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
      currentId: this.props.current,
      headerSettingsMode: this.state.headerSettingsMode,
      setHeaderSettingsMode: this.setHeaderSettingsMode,
      removeHeaderSettingsMode: this.removeHeaderSettingsMode,
      columnsQty: this.props.columnsKeys.length
    };
    const { columnsKeys } = props;
    return (
      <div style={styles.style} className='catalogListContainer'>
        {columnsKeys.map((key, i) => <Column {...props } key={`${key}column`}  columnKey={key} i={i} />)}
        {this.getSettingsBtnJsx()}
      </div>
    );

  }
}

export default connect(
  state => ({
    items: state.goods.items,
    itemsIds: getGoodsVisibleIds(state.goods),
    cartItems: state.cart.items,
    prices: state.prices,
    catalogQty: state.catalogQty,
    catalogListSettings: state.options.catalogListSettings,
    catalogListColumns: state.options.catalogListColumns,
    columnsKeys: getColumns(state.options),
    sortDirection: state.sortDirection,
    current: state.current,
    options: state.options,
    filtersApplied: state.filtersApplied
  }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions, ...optionsActions, ...currentActions }
)(ListContainer);
