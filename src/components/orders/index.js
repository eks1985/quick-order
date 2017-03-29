import React, { Component} from 'react';
import { connect } from 'react-redux';
import List from './list';
import Pagination from './pagination';
import Filters from './filters';
import { setOrdersListHeight } from './../../actions/orders';

const Orders = props => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto'
  };
  return (
    <div className='orders' style={style}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Filters />
        <Pagination />
      </div>
      <List />
    </div>
  );
};

class OrdersContainer extends Component {

  componentDidMount() {
    this.props.setOrdersListHeight();
  }

  render() {
    return <Orders />
  }

}

export default connect(
  null,
  { setOrdersListHeight }
)(OrdersContainer);
