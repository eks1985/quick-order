import React from 'react';
import {connect} from 'react-redux';

const Pagination = ({qtyPages, pageNumber, isLastPage}) => {
    return (
        <div>
            <button>Назад</button>
            <button>Вперед</button>
            <input type="text" style={{
                width: '40px'
            }}></input>
            <button>Первая</button>
            <button>Последняя</button>
        </div>
    );
}

export default connect(state => ({qtyPages: state.orders.qtyPages, pageNumber: state.orders.pageNumber, isLastPage: state.orders.isLastPage}))(Pagination);
