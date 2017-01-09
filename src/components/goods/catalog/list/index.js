import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGoodsVisibleIds } from './../../../../store/reducers/goods';
import { getColumns }         from './../../../../store/reducers/options';
import * as cartActions       from './../../../../actions/cart';
import * as goodsActions      from './../../../../actions/goods';
import * as modalActions      from './../../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../../actions/catalog-qty';
import * as optionsActions    from './../../../../actions/options';

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
    this.removeHeaderSettingsMode = this.removeHeaderSettingsMode.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp, false);
  }

  componentWillUnmount() {
    // console.log('component will unmount');
    document.removeEventListener('keyup', this.handleKeyUp, false);
  }

  handleKeyUp(e) {
    console.log('key code', e.which);
    console.log('id', parseInt(document.activeElement.id, 10));
    if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id < 9 ? id + 1 : 0;
      console.log('new id', newId);
      document.getElementById(newId).focus();
      this.setFocused(newId);
    }
    if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id < 9 ? id + 1 : 0;
      console.log('document.activeElement', document.activeElement);
      console.log('new id', newId);
      document.getElementById(newId).focus();
      this.setFocused(newId);
    }
    if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
      let id = parseInt(document.activeElement.id, 10);
      let newId = id > 0 ? id - 1 : 9;
      console.log('new id', newId);
      document.getElementById(newId).focus();
      this.setFocused(newId);
    }
    if (e.which === 34) {
      this.props.moveGoodsForward();
      document.getElementById(0).focus();
    }
    if (e.which === 33) {
      this.props.moveGoodsBack();
      document.getElementById(0).focus();
    }
  }

  setFocused(id) {
    this.setState({current: id});
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
      setFocused: this.setFocused,
      currentId: this.state.current,
      headerSettingsMode: this.state.headerSettingsMode,
      setHeaderSettingsMode: this.setHeaderSettingsMode.bind(this),
      removeHeaderSettingsMode: this.removeHeaderSettingsMode.bind(this),
      columnsQty: this.props.columnsKeys.length
    };
    const { columnsKeys } = props;
    return (
      <div style={styles.style}>
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
    sortDirection: state.sortDirection
  }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions, ...optionsActions }
)(ListContainer);
